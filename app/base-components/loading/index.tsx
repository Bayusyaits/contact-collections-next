import LoadingView from "./LoadingView";
import Head from "next/head";

const LoadingContainer = () => {
  return (
    <>
      <Head>
        <title>Loading | Contact list</title>
        <meta name="description" content="Loading Contact list" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LoadingView />
    </>
  );
};

export default LoadingContainer;
