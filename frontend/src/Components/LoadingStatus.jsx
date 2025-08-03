function LoadingStatus({ theme }) {
  return;
  <div className="loading-cotainer">
    <h2>Generating Your {theme} Story </h2>

    <div className="loading-animation">
      <div className="spinner"></div>
    </div>

    <p className="loading-info">Generating Story</p>
  </div>;
}

export default LoadingStatus;
