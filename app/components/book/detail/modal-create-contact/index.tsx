import React, { useEffect, useState } from "react";
import { useMutation } from '@apollo/react-hooks';
import { useQuery } from '@apollo/client';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { v4 } from 'uuid';
import * as yup from "yup";

import BookDetailModalCreateContactView from "./BookDetailModalCreateContactView";
import { setSpaceToDash } from "helpers/mixins";
import { GET_LIST_COLLECTIONS, POST_CREATE_COLLECTION } from "queries/collection/queries";
import { isEmpty } from "lodash";

type Props = {
  onFinish: () => void
  orderBy?: string,
  onSwitch: () => void
};

type Payload = {
  field: {
    fullName: string,
    phoneNumber: string
    email: string
  }
}
const BookDetailModalCreateContainer = (props: Props) => {
  const {
    orderBy = 'createdDate',
    onFinish,
    onSwitch
  } = props
  const { loading, error, data } = useQuery(GET_LIST_COLLECTIONS, {
    fetchPolicy: "no-cache",
    variables: {
      orderBy,
      slug: ''
    },
  }) 
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const books = data && data.getListBooks ? data.getListBooks : []
  const [postCreateCollection] = useMutation(POST_CREATE_COLLECTION, {
    fetchPolicy: "no-cache",
    refetchQueries: [
      GET_LIST_COLLECTIONS, // DocumentNode object parsed with gql
      'getListBooks' // Query fullName
    ],
  });
  useEffect(() => {
    return () => {
      setLoadingSubmit(false);
    }
  }, [])
  let defaultValues = {
    field: {
      fullName: '',
      email: '',
      phoneNumber: ''
    }
  };
  const schema = yup
    .object({
      field: yup.object({
        fullName: yup.string()
          .required('Full name is required')
          .matches(/^'?\p{L}+(?:[' ]\p{L}+)*'?$/u, 'doesn’t have special Char'),
        email: yup.string().required('Email is required'),
        phoneNumber: yup.string().required('Phone number is required')
      }),
    })
    .required();
  const handleSave = (val: Payload) => {
    let bool = true
    const fullName: any = setSpaceToDash(val?.field?.fullName)
    const email: any = val?.field?.email
    const phoneNumber: any = val?.field?.phoneNumber
    if (loadingSubmit) {
      return
    }
    setLoadingSubmit(true);
    if (isEmpty(val?.field)) {
      setError('field.fullName',  { type: "focus", message: 'Field is required'});
      bool = false
    } else if (books && books.indexOf((el: any) => (el?.fullName && 
        setSpaceToDash(el.fullName) === fullName)) > -1) {
      setError('field.fullName',  { type: "focus", message: 'Full name already exists'});
      bool = false
    } else if (books && books.indexOf((el: any) => (el?.email && 
      setSpaceToDash(el.email) === email)) > -1) {
      setError('field.email',  { type: "focus", message: 'Email already exists'});
      bool = false
    } else if (books && books.indexOf((el: any) => (el?.phoneNumber && 
      setSpaceToDash(el.phoneNumber) === phoneNumber)) > -1) {
      setError('field.phoneNumber',  { type: "focus", message: 'Phone number already exists'});
      bool = false
    }
    if (bool) {
      postCreateCollection({
        variables: {
            ...val.field,
            id: v4(),
            type: 'friend',
            isActive: true,
            slug: setSpaceToDash(val.field.fullName)
          } 
        },
      ).then(() => {
        onFinish()
        reset()
      });
    }
  }
  const handleSwitchModal = () => {
    onSwitch()
  }
  const {
    setError,
    control,
    handleSubmit,
    formState,
    reset
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { errors, isDirty } = formState;
  const obj = {
    handleSubmit,
    handleSave,
    handleSwitchModal,
    isDirty,
    errors,
    loading,
    loadingSubmit,
    error,
    control,
    books
  };
  return <BookDetailModalCreateContactView {...obj} />;
};

export default BookDetailModalCreateContainer;
