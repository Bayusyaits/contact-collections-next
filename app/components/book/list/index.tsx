import React, { useCallback, useContext, useState } from "react";
import { useQuery, useMutation } from '@apollo/client';
import { Grid } from "@mui/material";
import BookListSearchView from "./BookListSearch";
import BookListView from "./BookList";
import { useModal, ModalPopupDispatchContext } from "hoc/withModal";
import { debounce } from "lodash";
import BookListModal from "../modal";
import BookListModalCreateContact from "./modal-create-contact";
import BookListModalDeleteContact from "./modal-delete-contact";
import BookListModalEditContact from "./modal-edit-contact";
import BookListModalCreateCollection from "../modal-create-collection";
import BookListSidebarView from "./BookListSidebarView";
import { BookProps, Payload } from './interfaces';
import { GET_BOOKS } from "queries/book/queries";
import { POST_ADD_BULK_BOOK_COLLECTION } from "queries/book_collection/queries";
import { GET_LIST_COLLECTIONS } from "queries/collection/queries";

const BookListContainer: React.FC<BookProps> = ({
  type,
  fetchLimit = 10,
  loadMore = true,
}) => {
  const [limit, setLimit] = useState(fetchLimit);
  const [offset, setOffset] = useState(0);
  const [slug, setSlug] = useState('');
  const [orderBy, setSortBy] = useState('createdDate');
  const [values, setValues] = useState<string[]>([]);
  const { openModal } = useModal();
  const { closeModal, onSubmitModal } = useContext(ModalPopupDispatchContext);
  const handleChange = (val: string) => {
    const arr = [...values]
    if (val && arr.includes(val)) {
      arr.splice(arr.indexOf(val), 1)
    } else if (val) {
      arr.push(val)
    }
    setValues(arr)
  }
  const [addBulkBookCollection] = useMutation(POST_ADD_BULK_BOOK_COLLECTION, {
    fetchPolicy: "no-cache",
    refetchQueries: [
      GET_BOOKS, // DocumentNode object parsed with gql
      'getBooks' // Query name
    ],
  });
  const { 
    data: dataCollections 
  } = useQuery(GET_LIST_COLLECTIONS, {
    variables: {
      createdDate: 'uuid',
      slug: ''
    },
  }) 
  const { loading, error, data, fetchMore } = useQuery(GET_BOOKS, {
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: 'cache-first',
    variables: {
      offset,
      orderBy,
      slug,
      limit,
    },
  }) 
  const openModalAddCollection = debounce(() => {
    if (!values || values.length == 0) {
      return
    }
    const onFinish = (val: Payload) => {
      onSubmitModal();
      addBulkBookCollection({
        variables: {
            collections: val.collections,
            books: values,
            userUuid: '1091357a-3269-11ee-be56-0242ac120002'
          } 
        },
      ).then((val: any) => {
        if (!val?.data || val?.data.length == 0) {
          return
        }
        setValues([])
        if (data.getBooks && data.getBooks.items && 
          data.getBooks.items.length > 0) {
          for (let i = 0; i < data.getBooks.items.length; i++) {
            const el: any = document.getElementById(`field-books--${i}`)
            if (el && el.checked) {
              el.checked = false
            }
          }
        }
      }).catch((err) => {
        console.log('err', err)
      });
    };
    const onSwitch = () => {
      closeModal();
      openModalCreateCollection()
    }
    openModal({
      title: "Add to Collection",
      hideClose: false,
      component: () => (
        <BookListModal
          onFinish={onFinish}
          onSwitch={onSwitch}
        />
      ),
      onClose: () => {
        closeModal();
      },
    });
  }, 1000);
  const openModalAddContact = debounce(() => {
    const onFinish = () => {
      onSubmitModal();
    };
    const onClose = () => {
      closeModal();
    }
    openModal({
      title: "Create New Contact",
      hideClose: false,
      component: () => (
        <BookListModalCreateContact
          onFinish={onFinish}
          onClose={onClose}
        />
      ),
      onClose: () => {
        closeModal();
      },
    });
  }, 1000);
  const openModalEditContact = debounce((payload: any) => {
    const onFinish = () => {
      onSubmitModal();      
    };
    const onClose = () => {
      closeModal();
    }
    openModal({
      title: "Edit Contact",
      hideClose: false,
      component: () => (
        <BookListModalEditContact
          onFinish={onFinish}
          onClose={onClose}
          payload={payload}
        />
      ),
      onClose: () => {
        closeModal();
      },
    });
  }, 1000);
  const openModalDeleteContact = debounce((payload: any) => {
    const onFinish = () => {
      onSubmitModal();      
    };
    const onClose = () => {
      closeModal();
    }
    openModal({
      title: "Delete Contact",
      hideClose: false,
      component: () => (
        <BookListModalDeleteContact
          onFinish={onFinish}
          onClose={onClose}
          payload={payload}
        />
      ),
      onClose: () => {
        closeModal();
      },
    });
  }, 1000);
  const openModalCreateCollection = debounce(() => {
    const onFinish = () => {
      onSubmitModal();
      openModalAddCollection()
    };
    const onSwitch = () => {
      closeModal();
      openModalAddCollection()
    }
    openModal({
      title: "Create Collection",
      hideClose: false,
      component: () => (
        <BookListModalCreateCollection
          onFinish={onFinish}
          onSwitch={onSwitch}
        />
      ),
      onClose: () => {
        closeModal();
      },
    });
  }, 1000);
  const handleChangeSearch = useCallback(debounce((e: any) => {
    const {
      target: {
        value
      }
    } = e
    setSlug(value)
  }, 500), [])
  const handleChangeSortBy = (e: any) => {
    const {
      target: {
        value
      }
    } = e
    setSortBy(value)
  }
  const handlerSidebar = {
    values,
    collections: dataCollections?.getListCollections || [],
    openModalAddCollection,
    openModalAddContact
  }
  const handlePagination = (event: React.ChangeEvent<unknown>, value: number) => {
    let tmpTotal = data?.getBooks?.total || 0
    const tmpLimit = Math.abs(tmpTotal - limit)
    setLimit(tmpLimit > 10 ? limit : tmpLimit + 1)
    setOffset(value - 1)
  }
  const handlerList = {
    error,
    loading,
    data,
    type,
    limit,
    openModalDeleteContact,
    openModalEditContact,
    handlePagination,
    collections: dataCollections?.getListCollections || [],
    handleChange
  }
  const handleSearch = {
    slug,
    orderBy,
    loading,
    offset,
    handleChangeSearch,
    handleChangeSortBy
  }
  return (
    <>
      <Grid 
        container 
        rowSpacing={3} 
        columnSpacing={{ xs: 2, sm: 2, md: 2, lg: 2 }}
        justifyContent="start"
        alignItems="start"
      >
      <Grid item lg={3} xl={3} xs={12} sm={12} md={3}>
        <BookListSidebarView
          {...handlerSidebar}
        />
      </Grid>
      <Grid item lg={9} xl={9} xs={12} sm={12} md={9}>
        <BookListSearchView {...handleSearch} />
        <BookListView {...handlerList} />
      </Grid>
    </Grid>
    </>
  );
}

export default BookListContainer