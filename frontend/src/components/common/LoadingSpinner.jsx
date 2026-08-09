const LoadingSpinner = ({
  text = "Loading...",
  fullScreen = false,
}) => {
  return (
    <div
      className={`flex items-center justify-center ${
        fullScreen
          ? "min-h-screen"
          : "min-h-40"
      }`}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-blue-500" />

        {text && (
          <p className="text-sm text-slate-400">
            {text}
          </p>
        )}
      </div>
    </div>
  );
};

export default LoadingSpinner;