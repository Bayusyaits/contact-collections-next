import React, { useEffect, useState } from "react";
import { useMutation } from '@apollo/react-hooks';
import { useQuery } from '@apollo/client';

import BookDetailModalDeleteContactView from "./BookDetailModalDeleteContactView";
import { GET_LIST_BOOKS, GET_BOOKS, DELETE_BOOK } from "queries/book/queries";

type Props = {
  onFinish: (payload: any) => void
  orderBy?: string,
  payload: Payload,
  onClose: () => void
};

type Payload = {
  fullName: string,
  phoneNumber: string
  slug: string
  uuid: string
}
const BookDetailModalDeleteContainer = (props: Props) => {
  const {
    orderBy = 'createdDate',
    payload,
    onFinish,
    onClose
  } = props
  const [slug, setSlug] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isFirst, setFirst] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const { loading, error, data } = useQuery(GET_LIST_BOOKS, {
    fetchPolicy: "no-cache",
    variables: {
      orderBy,
      slug
    },
  }) 
  const books = data && data.getListBooks ? data.getListBooks : []
  const [deleteBook] = useMutation(DELETE_BOOK, {
    fetchPolicy: "no-cache",
    refetchQueries: [
      GET_BOOKS, // DocumentNode object parsed with gql
      'getBooks' // Query fullName
    ],
  });
  useEffect(() => {
    if (payload?.slug) {
      setSlug(payload.slug)
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
  const handleSave = () => {
    let bool = true
    setSlug(payload.slug)
    if (loadingSubmit || !payload.uuid || errorMessage) {
      return
    }
    if (!books || books.length === 0) {
      console.log('data not found')
      return
    }
    setLoadingSubmit(true);
    
    if (bool) {
      const variables =  {
        uuid: payload.uuid
      }
      deleteBook({
        variables 
      }).then(() => {
        onFinish(variables)
      });
    }
    setLoadingSubmit(false);
  }
  const handleCloseModal = () => {
    onClose()
  }
  const obj = {
    handleSave,
    handleCloseModal,
    loading,
    error,
    payload,
    errorMessage,
    isDisabled: false,
    loadingSubmit,
  };
  return <BookDetailModalDeleteContactView {...obj} />;
};

export default BookDetailModalDeleteContainer;
