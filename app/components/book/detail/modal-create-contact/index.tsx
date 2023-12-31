import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from '@apollo/react-hooks';
import { useQuery } from '@apollo/client';
import * as yup from "yup";

import BookDetailModalCreateContactView from "./BookDetailModalCreateContactView";
import { setSpaceToDash } from "helpers/mixins";
import { GET_BOOKS, GET_LIST_BOOKS, POST_CREATE_BOOK } from "queries/book/queries";
import { debounce, uniq } from "lodash";

type Props = {
  onFinish: (payload: any) => void
  orderBy?: string,
  onClose: () => void
};

type PayloadProps = {
  fullName: string,
  slug: string,
  email: string
}

type Payload = {
  field: {
    fullName: string,
    phoneNumbers: [string]
    email: string
  }
}
const BooDetailModalCreateContainer = (props: Props) => {
  const {
    orderBy = 'createdDate',
    onFinish,
    onClose
  } = props
  const [isDisabled, setDisabled] = useState<boolean>(false)
  const [total, setTotal] = useState<number>(1)
  const [slug, setSlug] = useState<string | null | undefined>('');
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const { loading, error, data } = useQuery(GET_LIST_BOOKS, {
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: 'cache-first',
    variables: {
      orderBy,
      slug
    },
  }) 
  const books = data && data.getListBooks ? data.getListBooks : []
  const [addBook] = useMutation(POST_CREATE_BOOK, {
    fetchPolicy: "no-cache",
    refetchQueries: [
      GET_BOOKS, // DocumentNode object parsed with gql
      'getBooks' // Query fullName
    ],
  });
  let defaultValues = {
    field: {
      fullName: '',
      email: '',
      phoneNumbers: ['']
    }
  };
  useEffect(() => {
    setSlug('')
    return () => {
      setLoadingSubmit(false);
      setDisabled(false)
      setSlug('')
    }
  }, [])
  const schema = yup
    .object({
      field: yup.object({
        fullName: yup.string()
          .required('Full name is required')
          .matches(/^[a-zA-Z ]{2,30}$/, 'Name is invalid'),
        email: yup.string()
          .matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/, 'Email is invalid'),
        phoneNumbers: yup.array().of(
          yup.string()
          .required('Phone number is required')
          .matches(/^(?:\+62|62|0)[2-9]\d{7,11}$/, 'Phone number is invalid')
        )
      }),
    })
    .required();
  const {
    watch,
    setError,
    control,
    handleSubmit,
    formState,
    reset
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const watchAll = watch()
  const checkName = useCallback(debounce((val: string | null) => {
    if (val && val.length > 1) {
      setSlug(setSpaceToDash(val))
    }
  }, 1000), [])
  useEffect(() => {
    checkName(watchAll.field.fullName)
  }, [watchAll.field.fullName])
  useEffect(() => {
    setDisabled(false)
    setError('field.fullName',  { type: "focus", message: ''});
    if (books && books.length && slug &&
      books.findIndex((el: PayloadProps) => (el.slug === slug)) > -1) {
      setError('field.fullName',  { type: "focus", message: 'Full name already exists'});
      setDisabled(true)
    }
  }, [books])
  const handleSave = (val: Payload) => {
    let bool = true
    const fullName = val?.field?.fullName || ''
    const email: any = setSpaceToDash(val?.field?.email)
    if (loadingSubmit) {
      return
    }
    setLoadingSubmit(true);
    if (!val?.field) {
      setError('field.fullName',  { type: "focus", message: 'Field is required'});
      setDisabled(true)
    } else if (books && books.length && Array.isArray(books) && fullName && 
      books.indexOf((el: any) => el?.fullName && 
        setSpaceToDash(el.fullName) === fullName) > -1) {
      setError('field.fullName',  { type: "focus", message: 'Full name already exists'});
      setDisabled(true)
    } else if (email &&
      books && books.length && Array.isArray(books) && val?.field?.email && 
      books.indexOf((el: any) => el?.email && 
        setSpaceToDash(el.email) === email) > -1) {
      setError('field.email',  { type: "focus", message: 'Email already exists'});
      setDisabled(true)
    }
    if (bool) {
      const variables =  {
        userUuid: 'de4e31bd-393d-40f7-86ae-ce8e25d81b00',
        type: 'contact',
        status: 'online',
        fullName: val.field.fullName,
        phoneNumbers: uniq(val.field.phoneNumbers),
        email: val.field.email,
        slug: setSpaceToDash(val.field.fullName)
      }
      addBook({
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
  const { errors, isDirty } = formState;
  const obj = {
    handleSubmit,
    handleSave,
    handleCloseModal,
    isDirty,
    errors,
    loading,
    isDisabled,
    total,
    setTotal,
    loadingSubmit,
    error,
    control,
    books
  };
  return <BookDetailModalCreateContactView {...obj} />;
};

export default BooDetailModalCreateContainer;
