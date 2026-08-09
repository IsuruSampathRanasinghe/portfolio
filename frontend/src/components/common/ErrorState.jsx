import {
  FiAlertCircle,
  FiRefreshCw,
} from "react-icons/fi";

const ErrorState = ({
  title = "Something went wrong",
  message = "Unable to load this content.",
  onRetry,
}) => {
  return (
    <div className="rounded-3xl border border-red-500/20 bg-red-500/5 px-6 py-10 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-2xl text-red-400">
        <FiAlertCircle />
      </div>

      <h3 className="mt-5 font-[Poppins] text-lg font-semibold text-white">
        {title}
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
        {message}
      </p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-6 inline-flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-sm font-semibold text-red-300 transition hover:bg-red-500/15"
        >
          <FiRefreshCw />
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorState;