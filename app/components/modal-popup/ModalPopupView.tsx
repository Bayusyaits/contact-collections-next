/* eslint-disable react/display-name */
import React, { memo, useContext } from "react";
import {
  ModalPopupStateContext,
  ModalPopupDispatchContext,
} from "../../hoc/withModal";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";

const ModalPopup = memo(() => {
  const {
    isOpen,
    title,
    component: Child,
  } = useContext(ModalPopupStateContext);
  const { closeModal } = useContext(ModalPopupDispatchContext);
  return (
    <Dialog
      open={isOpen}
      onClose={closeModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
    >
      <DialogTitle>
        {title}
      </DialogTitle>
      <DialogContent><Child/></DialogContent>
    </Dialog>
  );
});

export default ModalPopup;
