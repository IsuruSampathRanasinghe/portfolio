import {
  FiInbox,
} from "react-icons/fi";

const EmptyState = ({
  title = "Nothing here yet",
  message = "No data is available at the moment.",
  icon: Icon = FiInbox,
  action,
}) => {
  return (
    <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/30 px-6 py-14 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800 text-2xl text-slate-400">
        <Icon />
      </div>

      <h3 className="mt-5 font-[Poppins] text-lg font-semibold text-white">
        {title}
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        {message}
      </p>

      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}
    </div>
  );
};

export default EmptyState;