import React from "react";

function LoadingView() {
  return (
    <div className="preloader" id="preloader">
      <p className="text-secondary" role="status">
        Loading...
      </p>
    </div>
  );
}

export default LoadingView;
