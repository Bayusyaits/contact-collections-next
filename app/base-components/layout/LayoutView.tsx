import React from "react";
import type { PropsWithChildren } from "react";
export interface ViewProps {
  handleSnackbarClose: (el: string) => void;
}

export default function LayoutView({
  children,
}: PropsWithChildren<any>) {
  return (
    <>
      <main
        id="infinite-list"
        className={`page-content-wrapper`} >
        {children}
      </main>
    </>
  );
}
