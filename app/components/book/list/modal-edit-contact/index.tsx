import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from '@apollo/react-hooks';
import { useQuery } from '@apollo/client';
import * as yup from "yup";

import BookListModalEditContactView from "./BookListModalEditContactView";
import { setSpaceToDash } from "helpers/mixins";
import { GET_LIST_BOOKS, PUT_BOOK } from "queries/book/queries";
import { isEmpty } from "lodash";

type Props = {
  onFinish: (payload: any) => void
  sortBy?: string,
  payload: PayloadProps,
  onClose: () => void
};

type Payload = {
  field: {
    fullName: string,
    phoneNumber: string
    email: string
  }
}
type PayloadProps = {
  userUuid: string,
  fullName: string,
  slug: string,
  uuid: string,
  phoneNumber: string
  email: string
}
const BookListModalEditContainer = (props: Props) => {
  const {
    sortBy = 'createdDate',
    onFinish,
    payload,
    onClose
  } = props
  const [slug, setSlug] = useState<string>('');
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isFirst, setFirst] = useState(false);

  const { loading, error, data } = useQuery(GET_LIST_BOOKS, {
    fetchPolicy: "no-cache",
    variables: {
      sortBy,
      slug
    },
  }) 
  const books = data && data.getListBooks ? data.getListBooks : []
  const [editBook] = useMutation(PUT_BOOK, {
    fetchPolicy: "no-cache",
    refetchQueries: [
      GET_LIST_BOOKS, // DocumentNode object parsed with gql
      'getListBooks' // Query fullName
    ],
  });
  let defaultValues = {
    field: {
      fullName: '',
      email: '',
      phoneNumber: ''
    }
  };
  useEffect(() => {
    if (payload?.slug) {
      setSlug(payload.slug)
      setValue('field', payload)

    }
    return () => {
      setLoadingSubmit(false);
      setFirst(false)
      setErrorMessage('')
    }
  }, [])
  useEffect(() => {
    if (!isFirst) {
      setFirst(true)
      if (!books || books.length === 0) {
        setErrorMessage('Contact not found')
      }
    } else if (books && books.length > 0 && errorMessage) {
      setErrorMessage('')
      setFirst(false)
    }
  }, [books])
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
    const uuid: any = payload.uuid
    const email: any = val?.field?.email
    const phoneNumber: any = val?.field?.phoneNumber
    console.log('kenapa', loadingSubmit)
    if (loadingSubmit) {
      return
    }
    console.log('woke')
    setLoadingSubmit(true);
    setSlug(fullName)
    if (isEmpty(val?.field)) {
      setError('field.fullName',  { type: "focus", message: 'Field is required'});
      console.log('err 0', bool)
      bool = false
    } else if (books && books.indexOf((el: any) => (el?.fullName && 
        setSpaceToDash(el.fullName) === fullName && el.uuid !== uuid)) > -1) {
      setError('field.fullName',  { type: "focus", message: 'Full name already exists'});
      bool = false
    } else if (books && books.indexOf((el: any) => (el?.email && 
      setSpaceToDash(el.email) === email && el.uuid !== uuid)) > -1) {
        console.log('err 2', bool)
      setError('field.email',  { type: "focus", message: 'Email already exists'});
      bool = false
    } else if (books && books.indexOf((el: any) => (el?.phoneNumber && 
      setSpaceToDash(el.phoneNumber) === phoneNumber && el.uuid !== uuid)) > -1) {
      console.log('err 3', bool)
      setError('field.phoneNumber',  { type: "focus", message: 'Phone number already exists'});
      bool = false
    }
    console.log('bool', bool)
    if (bool) {
      const variables =  {
        userUuid: payload.userUuid,
        uuid: payload.uuid,
        fullName: val.field.fullName,
        phoneNumber: val.field.phoneNumber,
        email: val.field.email,
        slug: setSpaceToDash(val.field.fullName)
      }
      editBook({
        variables 
      }).then(() => {
        onFinish(variables)
        reset()
      });
    }
    setLoadingSubmit(false);
  }
  const handleCloseModal = () => {
    onClose()
  }
  const {
    setError,
    setValue,
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
    handleCloseModal,
    isDirty,
    errors,
    loading,
    isDisabled: false,
    loadingSubmit,
    error,
    control,
    errorMessage,
    books
  };
  return <BookListModalEditContactView {...obj} />;
};

export default BookListModalEditContainer;
