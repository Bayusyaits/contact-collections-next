/* eslint-disable react/display-name */
import { useRouter } from "next/router";
import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";
import { Immutable } from "immer";

export type HistoyBackState = {
  history: string[];
  setHistory(data: string[]): void;
  back(): void;
};

type OpenHeaderArgs = Omit<HistoyBackState, "back">;

export type HistoyBackDispatch = {
  openHeader: (args: OpenHeaderArgs) => void;
  closeHeader: () => void;
  onSubmitHeader: () => void;
};

export type HistoyBackContext = {
  state: Immutable<HistoyBackState>;
};

interface UseHeader
  extends Pick<HistoyBackState, "back">,
    Omit<HistoyBackDispatch, "onSubmitHeader"> {}

// Initial state modal popup
const initialState: HistoyBackState = {
  history: [],
  setHistory: () => {},
  back: () => {},
};

// Create context for state & dispatch modal popup
export const HistoyBackStateContext: React.Context<Immutable<HistoyBackState>> =
  createContext(initialState as Immutable<HistoyBackState>);

export const HistoyBackDispatchContext = createContext<HistoyBackDispatch>({
  openHeader: () => {
    /* */
  },
  closeHeader: () => {
    /* */
  },
  onSubmitHeader: () => {
    /* */
  },
});
// Custom hooks method modal popup
function useHistoyBack(): HistoyBackContext {
  const { asPath, push, pathname } = useRouter();
  const [history, setHistory] = useState<string[]>([]);

  function back() {
    if (history.length === 0) {
      push("/");
    }
    for (let i = history.length - 2; i >= 0; i--) {
      const route = history[i];
      if (!route.includes("#") && route !== pathname) {
        const newHistory = history.slice(0, i);
        setHistory(newHistory);
        push(route);
        break;
      } else {
        const newHistory = history.slice(0, i);
        setHistory(newHistory);
        push("/");
        break;
      }
    }
  }

  useEffect(() => {
    setHistory((previous) => [...previous, asPath]);
  }, [asPath]);
  return useMemo(
    () => ({
      state: {
        back,
        history,
        setHistory,
      },
    }),
    [back, history, setHistory]
  );
}

// Custom hooks for use in other components
export function useHistory(): UseHeader {
  const { back } = useContext(HistoyBackStateContext);
  const { onSubmitHeader, ...dispatch } = useContext(HistoyBackDispatchContext);
  return { back, ...dispatch };
}

// HOC to wrap context modal popup
const withHeader =
  <P extends Record<string, unknown> = Record<string, unknown>>(
    Component: React.ComponentType<P>
  ) =>
  (props: P) => {
    const { state } = useHistoyBack();
    return (
      <HistoyBackStateContext.Provider value={state}>
        <Component {...props} />
      </HistoyBackStateContext.Provider>
    );
  };

export default withHeader;
