import React, { useContext } from "react";
import { useQuery } from '@apollo/client';
import BookDetailView from "./BookDetailView";
import BookDetailSidebarView from "./BookDetailSidebarView";
import BookDetailModal from "./modal";
import BookDetailModalCreateCollection from "./modal-create-collection";
import { useModal, ModalPopupDispatchContext } from "hoc/withModal";
import { useRouter } from "next/router";
import { Grid } from "@mui/material";
import { debounce } from "lodash";
import { GET_BOOK } from "queries/book/queries";

type BookProps = {};
const BookDetailContainer: React.FC<BookProps> = () => {
  const router = useRouter();
  const {
    query: {
      slug
    }
  }: any = router
  const { openModal } = useModal();
  const { closeModal, onSubmitModal } = useContext(ModalPopupDispatchContext);
  const { loading, error, data } = useQuery(GET_BOOK, {
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: 'cache-first',
    variables: {
      slug
    },
  }) 
  const handleRemoveCollection = (slug: number) => {
    console.log('handleRemoveCollection', slug)
  }
  const openModalAddCollection = debounce(() => {
    const onFinish = () => {
      onSubmitModal();
    };
    const onSwitch = () => {
      closeModal();
      openModalCreateCollection()
    }
    openModal({
      title: "Add to Collection",
      hideClose: false,
      component: () => (
        <BookDetailModal
          onFinish={onFinish}
          onSwitch={onSwitch}
          field={{...data.getBook}}
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
    const onSwitch = () => {
      closeModal();
      openModalCreateContact()
    }
    openModal({
      title: "Add to Contact",
      hideClose: false,
      component: () => (
        <BookDetailModal
          onFinish={onFinish}
          onSwitch={onSwitch}
          field={{...data.getBook}}
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
        <BookDetailModalCreateCollection
          onFinish={onFinish}
          onSwitch={onSwitch}
        />
      ),
      onClose: () => {
        closeModal();
      },
    });
  }, 1000);
  const openModalCreateContact = debounce(() => {
    const onFinish = () => {
      onSubmitModal();
      openModalAddContact()
    };
    const onSwitch = () => {
      closeModal();
      openModalAddContact()
    }
    openModal({
      title: "Create Contact",
      hideClose: false,
      component: () => (
        <BookDetailModalCreateCollection
          onFinish={onFinish}
          onSwitch={onSwitch}
        />
      ),
      onClose: () => {
        closeModal();
      },
    });
  }, 1000);
  const handleAddCollection = (e: React.FormEvent<HTMLFormElement>) => {
    if (data?.getBook) {
      openModalAddCollection()
    }
  }
  const handleAddContact = (e: React.FormEvent<HTMLFormElement>) => {
    if (data?.getBook) {
      openModalAddContact()
    }
  }
  const handlerList = {
    error,
    loading,
    data
  }

  const handlerCollection = {
    handleRemoveCollection,
    handleAddCollection,
    handleAddContact,
    error,
    loading,
    data
  }

  return (
    <Grid 
        container 
        rowSpacing={3} 
        columnSpacing={{ xs: 2, sm: 2, md: 2, lg: 2 }}
        justifyContent="start"
        alignItems="start"
      >
      <Grid item lg={3} xl={3} xs={12} sm={12} md={3}>
        <BookDetailSidebarView {...handlerCollection} />
      </Grid>
      <Grid item lg={9} xl={9} xs={12} sm={12} md={9}>
        <BookDetailView {...handlerList} />
      </Grid>
    </Grid>
  );
}

export default BookDetailContainer