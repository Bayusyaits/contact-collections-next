/* eslint-disable react/display-name */
import React, {
  createContext,
  useContext,
  useMemo,
  useReducer,
  useCallback,
} from "react";
import produce, { Immutable } from "immer";

import ModalPopup from "components/modal-popup";

export type ModalPopupState = {
  isOpen: boolean;
  hideClose?: boolean;
  title?: string;
  className?: {
    dialog?: string;
    header?: string;
    content?: string;
  };
  component: React.ComponentType;
  onSubmit?: () => void;
  onClose?: () => void;
};

type OpenModalArgs = Omit<ModalPopupState, "isOpen">;

type ModalPopupAction = {
  type: "OPEN_MODAL_POPUP" | "CLOSE_MODAL_POPUP";
  payload?: Partial<ModalPopupState>;
};

export type ModalPopupDispatch = {
  openModal: (args: OpenModalArgs) => void;
  closeModal: () => void;
  onSubmitModal: () => void;
};

export type ModalPopupContext = {
  state: Immutable<ModalPopupState>;
  dispatch: ModalPopupDispatch;
};

interface UseModal
  extends Pick<ModalPopupState, "isOpen">,
    Omit<ModalPopupDispatch, "onSubmitModal"> {}

// Initial state modal popup
const initialState: ModalPopupState = {
  title: "",
  className: {
    dialog: "",
    header: "",
    content: "",
  },
  isOpen: false,
  hideClose: false,
  component: () => <></>,
  onSubmit: () => {
    /* */
  },
  onClose: () => {
    /* */
  },
};

// Create context for state & dispatch modal popup
export const ModalPopupStateContext: React.Context<Immutable<ModalPopupState>> =
  createContext(initialState as Immutable<ModalPopupState>);

export const ModalPopupDispatchContext = createContext<ModalPopupDispatch>({
  openModal: () => {
    /* */
  },
  closeModal: () => {
    /* */
  },
  onSubmitModal: () => {
    /* */
  },
});

// Reducer for manage state modal popup
const reducer = produce((draft: ModalPopupState, action: ModalPopupAction) => {
  const { type, payload = {} } = action;
  /* eslint-disable no-param-reassign */
  switch (type) {
    case "OPEN_MODAL_POPUP":
      Object.keys(draft).forEach((objKey) => {
        const key = objKey as keyof ModalPopupState;
        (draft[key] as unknown) = payload[key] || initialState[key];
      });
      draft.isOpen = true;
      return;
    case "CLOSE_MODAL_POPUP":
      draft.isOpen = false;
      return;
    default:
      throw new Error("Unknown action type");
  }
  /* eslint-enable no-param-reassign */
});

// Custom hooks method modal popup
function useModalPopup(): ModalPopupContext {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { onClose, onSubmit, ...popupProps } = state;

  const openModal = useCallback((args: OpenModalArgs) => {
    dispatch({
      type: "OPEN_MODAL_POPUP",
      payload: { ...args },
    });
  }, []);

  const closeModal = useCallback(() => {
    if (typeof onClose === "function") onClose();
    dispatch({
      type: "CLOSE_MODAL_POPUP",
    });
  }, [onClose]);

  const onSubmitModal = useCallback(() => {
    if (typeof onSubmit === "function") onSubmit();
    closeModal();
  }, [closeModal, onSubmit]);

  return useMemo(
    () => ({
      state: popupProps,
      dispatch: {
        openModal,
        closeModal,
        onSubmitModal,
      },
    }),
    [popupProps, openModal, closeModal, onSubmitModal]
  );
}

// Custom hooks for use in other components
export function useModal(): UseModal {
  const { isOpen } = useContext(ModalPopupStateContext);
  const { onSubmitModal, ...dispatch } = useContext(ModalPopupDispatchContext);
  return { isOpen, ...dispatch };
}

// HOC to wrap context modal popup
const withModal =
  <P extends Record<string, unknown> = Record<string, unknown>>(
    Component: React.ComponentType<P>
  ) =>
  (props: P) => {
    const { state, dispatch } = useModalPopup();
    return (
      <ModalPopupDispatchContext.Provider value={dispatch}>
        <ModalPopupStateContext.Provider value={state}>
          <ModalPopup />
          <Component {...props} />
        </ModalPopupStateContext.Provider>
      </ModalPopupDispatchContext.Provider>
    );
  };

export default withModal;
