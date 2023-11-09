import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/react-hooks';
import * as yup from "yup";

import BookDetailModalView from "./BookDetailModalView";
import { useRouter } from "next/router";
import { PUT_BULK_BOOK_COLLECTION } from "queries/book_collection/queries";
import { GET_LIST_COLLECTIONS } from "queries/collection/queries";
import { GET_BOOK_ITEMS } from "queries/book/queries";

type Props = {
  onFinish: () => void
  field: any,
  orderBy?: string,
  onSwitch: () => void
};

const BookDetailModalContainer = (props: Props) => {
  const {
    field,
    orderBy = 'id',
    onSwitch
  } = props
  const [payload, setPayload] = useState<any>([])
  const { loading, error, data } = useQuery(GET_LIST_COLLECTIONS, {
    variables: {
      orderBy,
      slug: ''
    },
  }) 
  let defaultValues = {
    field
  };
  const schema = yup
    .object({
      field: yup.object({
        bookCollections: yup.array().of(
          yup.object({
            collectionUuid: yup.object({
              uuid: yup.string()
            })
          })
        )
      }),
    })
    .required();
    const {
      register,
      control,
      handleSubmit,
      reset,
      setValue,
      formState,
      watch,
    } = useForm({
      defaultValues,
      resolver: yupResolver(schema),
    });
  const watchAllFields = watch();
  const router = useRouter();
  const {
    query: {
      slug
    }
  }: any = router
  const [putBulkBookCollection, {}] = useMutation(PUT_BULK_BOOK_COLLECTION, {
    refetchQueries: [
      {
        query: GET_BOOK_ITEMS,
        variables: { slug },
      }
    ],
  });
  const handleChangeCollection = (val: any) => {
    const {
      field: {
        uuid,
        bookCollections
      }
    } = watchAllFields
    let value = val?.target?.value || []
    let arr = []
    let del = []
    const userUuid = 'de4e31bd-393d-40f7-86ae-ce8e25d81b00'
    if (bookCollections && bookCollections.length && value && value.length) {
      for (let i = 0; i < bookCollections.length; i++) {
        const el = bookCollections[i]
        const index = value.indexOf(el?.collectionUuid?.uuid)
        if (el?.collectionUuid?.uuid && 
          index == -1) {
          del.push({
            bookUuid: uuid,
            userUuid,
            action: 'delete',
            collectionUuid: {
              uuid: el?.collectionUuid?.uuid
            }
          })
        }
      }
    } 
    if (value && value.length) {
      arr = value.map((el: any) => ({
        bookUuid: uuid,
        action: 'add',
        userUuid,
        collectionUuid: {
          uuid: el
        }
      }))
    }
    setPayload([...arr, ...del])
    setValue('field.bookCollections', arr)
  }
  const handleSave = () => {
    putBulkBookCollection({
      variables: {
          payload,
        } 
      },
    ).then(() => {
      if (props?.onFinish && typeof props?.onFinish === 'function') {
        props?.onFinish()
      }
    });
  }
  const handleSwitchModal = () => {
    onSwitch()
  }
  const { errors, isDirty } = formState;
  const obj = {
    register,
    control,
    handleSubmit,
    handleSave,
    handleChangeCollection,
    isDirty,
    errors,
    loading,
    error,
    handleSwitchModal,
    collections: data && data.getListCollection ? data.getListCollection : []
  };
  return <BookDetailModalView {...obj} />;
};

export default BookDetailModalContainer;
