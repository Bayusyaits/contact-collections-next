import React from "react";
import type { PropsWithChildren } from "react";
import { useRouter } from "next/router";

import { useHistory } from "hoc/withHistory";
// import Header from "base-components/header";
// import HeaderArrow from "base-components/header-arrow";
// import Footer from "base-components/footer";
// const Snackbar = dynamic(() => import("components/snackbar"), { ssr: false });
export interface ViewProps {
  handleSnackbarClose: (el: string) => void;
}

export default function LayoutView({
  children,
  isLayout,
  productRoutes,
  isProducts,
  authRoutes,
  ...props
}: PropsWithChildren<any>) {
  const router = useRouter();
  const { route } = router;
  const { back } = useHistory();
  const { handleSnackbarClose, isAuth } = props;
  // const snackbar = <Snackbar onClose={handleSnackbarClose} />;
  const handler = {
    ...props,
    back,
  };
  return (
    <>
       {/* <Header {...handler} /> */}
      <main
        id="infinite-list"
        className={`page-content-wrapper`} >
        {children}
      </main>
      {/* {(isLayout || isProducts) && !authRoutes.includes(route) && <Footer />} */}
      {/* {snackbar} */}
      {props.isSidebar && (
        <div
          onClick={(e) => props.handleSidebar(e, false)}
          className="offcanvas-backdrop fade show"
        ></div>
      )}
    </>
  );
}
