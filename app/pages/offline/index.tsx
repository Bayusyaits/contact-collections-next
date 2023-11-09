/* eslint-disable react/prefer-stateless-function */
import React from "react";
import Head from "next/head";

import Component from "./OfflineView";

export default function OfflineContainer() {
  return (
    <>
      <Head>
        <title>Offline Mode | Contact list</title>
      </Head>
      <Component />
    </>
  );
}
