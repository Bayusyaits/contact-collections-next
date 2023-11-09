import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from '@apollo/react-hooks';
import { useQuery } from '@apollo/client';
import * as yup from "yup";

import BookListModalCreateContactView from "./BookListModalCreateContactView";
import { setSpaceToDash } from "helpers/mixins";
import { GET_LIST_BOOKS, POST_CREATE_BOOK } from "queries/book/queries";

type Props = {
  onFinish: (payload: any) => void
  sortBy?: string,
  onClose: () => void
};

type Payload = {
  field: {
    fullName: string,
    phoneNumber: string
    email: string
  }
}
const BookListModalCreateContainer = (props: Props) => {
  const {
    sortBy = 'createdDate',
    onFinish,
    onClose
  } = props
  const [slug, setSlug] = useState<string>('');
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const { loading, error, data } = useQuery(GET_LIST_BOOKS, {
    fetchPolicy: "no-cache",
    variables: {
      sortBy,
      slug
    },
  }) 
  const books = data && data.getListBooks ? data.getListBooks : []
  const [addBook] = useMutation(POST_CREATE_BOOK, {
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
    return () => {
      setLoadingSubmit(false);
    }
  }, [])
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
    console.log('books', books)
    const fullName: any = setSpaceToDash(val?.field?.fullName)
    if (loadingSubmit) {
      return
    }
    setLoadingSubmit(true);
    setSlug(fullName)
    if (!val?.field) {
      setError('field.fullName',  { type: "focus", message: 'Field is required'});
      bool = false
    } else if (books && val?.field?.fullName && 
      books.indexOf((el: any) => el?.fullName && 
        setSpaceToDash(el.fullName) === fullName) > -1) {
      setError('field.fullName',  { type: "focus", message: 'Full name already exists'});
      bool = false
    }
    
    if (bool) {
      const variables =  {
        userUuid: 'de4e31bd-393d-40f7-86ae-ce8e25d81b00',
        type: 'contact',
        status: 'online',
        fullName: val.field.fullName,
        phoneNumber: val.field.phoneNumber,
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
    handleCloseModal,
    isDirty,
    errors,
    loading,
    isDisabled: false,
    loadingSubmit,
    error,
    control,
    books
  };
  return <BookListModalCreateContactView {...obj} />;
};

export default BookListModalCreateContainer;
