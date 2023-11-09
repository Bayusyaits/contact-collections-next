import ErrorPage from "./error";

function Error(props: any) {
  return <ErrorPage {...props} />;
}

Error.getInitialProps = ({ res, err }: any) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

Error.propTypes = {
  statusCode: 200,
};

export default Error;
