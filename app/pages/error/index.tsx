/* eslint-disable react/prefer-stateless-function */
import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import Component from "./ErrorView";

function ErrorContainer(props: any) {
  const { statusCode } = props;
  const router = useRouter();
  const handleRedirect = (e: any) => {
    e.preventDefault();
    router.push("/");
  };
  const message =
    statusCode === 404
      ? "Oops, halaman tidak ditemukan"
      : "Maaf, kami sedang dalam perbaikan";
  const obj = {
    ...props,
    message,
    handleRedirect,
  };
  return (
    <>
      <Head>
        <title>{`${message} | App`}</title>
      </Head>
      <Component {...obj} />
    </>
  );
}

export default ErrorContainer;
