import React from "react";
function ErrorView({ statusCode, message, handleRedirect }: any) {
  return (
    <div className="page-content-wrapper">
      <div className="container">
        <div className="offline-area-wrapper py-3 d-flex align-items-center justify-content-center">
          <div className="offline-text text-center">
            <h5>{statusCode || "5XX"}</h5>
            <p>{message}</p>
            <button
              className="btn btn-primary"
              onClick={(e) => handleRedirect(e)}
            >
              Kembali ke Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

ErrorView.propTypes = {
  statusCode: 200,
  message: "",
};

export default ErrorView;
