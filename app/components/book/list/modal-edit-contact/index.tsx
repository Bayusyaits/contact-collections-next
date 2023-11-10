import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from '@apollo/react-hooks';
import { useQuery } from '@apollo/client';
import * as yup from "yup";

import BookListModalEditContactView from "./BookListModalEditContactView";
import { setSpaceToDash } from "helpers/mixins";
import { GET_LIST_BOOKS, GET_BOOKS, PUT_BOOK } from "queries/book/queries";
import { debounce, isEmpty, uniqBy } from "lodash";

type Props = {
  onFinish: (payload: any) => void
  orderBy?: string,
  payload: PayloadProps,
  onClose: () => void
};

type Payload = {
  field: {
    fullName: string,
    phoneNumbers: string[]
    email: string
  }
}
type PhoneNumbers = {
  uuid: string,
  phoneNumber: string
}
type PayloadProps = {
  userUuid: string,
  fullName: string,
  slug: string,
  uuid: string,
  phoneNumbers: PhoneNumbers[]
  email: string
}
const BookListModalEditContainer = (props: Props) => {
  const {
    orderBy = 'createdDate',
    onFinish,
    payload,
    onClose
  } = props
  const [isDisabled, setDisabled] = useState<boolean>(false)
  const [total, setTotal] = useState<number>(1)
  const [slug, setSlug] = useState<string | null | undefined>('');
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isFirst, setFirst] = useState(false);

  const { loading, error, data } = useQuery(GET_LIST_BOOKS, {
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: 'cache-first',
    variables: {
      orderBy,
      slug
    },
  }) 
  const books = data && data.getListBooks ? data.getListBooks : []
  const [editBook] = useMutation(PUT_BOOK, {
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
      phoneNumbers: [{
        uuid: '',
        phoneNumber: ''
      }]
    }
  };
  useEffect(() => {
    if (payload?.slug && payload?.phoneNumbers) {
      setSlug(payload.slug)
      setValue('field', payload)
    }
    return () => {
      setLoadingSubmit(false);
      setFirst(false)
      setErrorMessage('')
      setDisabled(false)
    }
  }, [])
  useEffect(() => {
    setDisabled(false)
    if (books && books.length && 
      books.findIndex((el: PayloadProps) => (el.uuid !== payload.uuid)) > -1) {
      setError('field.fullName',  { type: "focus", message: 'Full name already exists'});
      setDisabled(true)
    }
  }, [books])
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
          .matches(/^[a-zA-Z ]{2,30}$/, 'Name is invalid'),
        email: yup.string()
          .matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/, 'Email is invalid'),
        phoneNumbers: yup.array().of(
          yup.object({
            uuid: yup.string(),
            phoneNumber: yup.string()
            .required('Phone number is required')
            .matches(/^(?:\+62|62|0)[2-9]\d{7,11}$/, 'Phone number is invalid')
          })
        )
      }),
    })
    .required();
  const {
    watch,
    setValue,
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
  const handleSave = (val: Payload) => {
    let bool = true
    const fullName = val?.field?.fullName || ''
    const uuid: any = payload.uuid
    const email: any = val?.field?.email
    if (loadingSubmit) {
      return
    }
    setLoadingSubmit(true);
    if (isEmpty(val?.field)) {
      setError('field.fullName',  { type: "focus", message: 'Field is required'});
      setDisabled(true)
    } else if (books && books.length && Array.isArray(books) &&
      books.indexOf((el: any) => (el?.fullName && 
        setSpaceToDash(el.fullName) === fullName && el.uuid !== uuid)) > -1) {
      setError('field.fullName',  { type: "focus", message: 'Full name already exists'});
      setDisabled(true)
    } else if (books && books.length && Array.isArray(books) &&
      books.indexOf((el: any) => (el?.email && 
      setSpaceToDash(el.email) === email && el.uuid !== uuid)) > -1) {
      setError('field.email',  { type: "focus", message: 'Email already exists'});
      setDisabled(true)
    }
    const userUuid = payload.userUuid
    let payloadPhoneNumber: any = uniqBy(val.field.phoneNumbers, 'phoneNumber')
    if (payloadPhoneNumber && payloadPhoneNumber.length) {
      payloadPhoneNumber = payloadPhoneNumber.map((el: any) => ({
        phoneNumber: el.phoneNumber,
        userUuid,
        uuid: el.uuid
      }))
    }
    if (bool) {
      const variables =  {
        uuid: payload.uuid,
        userUuid,
        fullName: val.field.fullName,
        phoneNumbers: payloadPhoneNumber,
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
  const { errors, isDirty } = formState;
  const obj = {
    handleSubmit,
    handleSave,
    handleCloseModal,
    isDirty,
    errors,
    loading,
    isDisabled,
    loadingSubmit,
    error,
    control,
    total,
    setTotal,
    errorMessage,
    books
  };
  return <BookListModalEditContactView {...obj} />;
};

export default BookListModalEditContainer;
