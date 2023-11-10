import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from '@apollo/client';
import * as yup from "yup";

import BookModalView from "./BookModalView";
import { Props } from '../list/interfaces';
import { GET_LIST_COLLECTIONS } from "queries/collection/queries";

const BookModalContainer = (props: Props) => {
  const {
    orderBy = 'createdDate',
    onFinish,
    onSwitch
  } = props
  const [list, setList] = useState([])
  const { loading, error, data } = useQuery(GET_LIST_COLLECTIONS, {
    variables: {
      orderBy,
      slug: ''
    },
  }) 
  let defaultValues = {
    field: {
      collections: []
    }
  };
  const schema = yup
    .object({
      field: yup.object({
        collections: yup.array().of(
          yup.string()
        )
      }),
    })
    .required();
  const handleSave = (val: any) => {
    reset()
    onFinish(val.field)
  }
  const handleSwitchModal = () => {
    onSwitch()
  }
  useEffect(() => {
    if (data?.getListCollection) {
      setList(data.getListCollection);
    }
  }, [data]);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState,
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { errors, isDirty } = formState;
  const obj = {
    register,
    control,
    handleSubmit,
    handleSave,
    isDirty,
    errors,
    loading,
    error,
    handleSwitchModal,
    collections: data && data.getListCollection ? data.getListCollection : []
  };
  return <BookModalView {...obj} />;
};

export default BookModalContainer;
