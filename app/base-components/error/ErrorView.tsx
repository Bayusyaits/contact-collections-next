import React from "react";

function ErrorView() {
  return (
    <div className="container offline-page">
      <div className="offline-area-wrapper py-3 d-flex align-items-center justify-content-center">
        <div className="offline-text text-center">
          <h5>Not Found!</h5>
          <p>You search is not found!</p>
        </div>
      </div>
    </div>
  );
}

export default ErrorView;
