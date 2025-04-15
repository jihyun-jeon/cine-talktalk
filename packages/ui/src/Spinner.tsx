import ReactDOM from "react-dom";

const Spinner = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90  z-50">
    <div className="w-16 h-16 border-4 border-t-4 border-t-blue-500 border-white-200 rounded-full animate-spin"></div>
  </div>
);

const SpinnerPortal = () =>
  ReactDOM.createPortal(
    <Spinner />,
    document.getElementById("spinner-portal")!
  );

export default SpinnerPortal;
