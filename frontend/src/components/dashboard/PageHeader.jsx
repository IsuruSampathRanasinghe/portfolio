const PageHeader = ({
  title,
  description,
  action,
}) => {
  return (
    <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
      <div>
        <h1 className="font-[Poppins] text-2xl font-bold text-white sm:text-3xl">
          {title}
        </h1>

        {description && (
          <p className="mt-2 text-slate-400">
            {description}
          </p>
        )}
      </div>

      {action && (
        <div>
          {action}
        </div>
      )}
    </div>
  );
};

export default PageHeader;