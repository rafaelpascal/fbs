import React from "react";
import { ClipLoader } from "react-spinners";

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
};

// LoadingOverlay component that displays a loading spinner when loading is true
const LoadingOverlay: React.FC<{ loading: boolean }> = ({ loading }) => {
  return loading ? (
    <div style={overlayStyle}>
      <ClipLoader size={60} color="#ffffff" loading={loading} />
    </div>
  ) : null;
};

export default LoadingOverlay;
