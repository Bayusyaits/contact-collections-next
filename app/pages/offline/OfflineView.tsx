function OfflineView() {
  return (
    <div className="container offline-page">
      <div className="offline-area-wrapper py-3 d-flex align-items-center justify-content-center">
        <div className="offline-text text-center">
          <h5>No Internet Connection!</h5>
          <p>
            Seems like you re offline, please check your internet connection.
            This page doesnt support when you offline!
          </p>
        </div>
      </div>
    </div>
  );
}

export default OfflineView;
