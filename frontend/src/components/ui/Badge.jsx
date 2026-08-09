const Badge = ({
  children,
  className = "",
}) => {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-medium text-slate-300 ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;