const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
}) => {
  const styles = {
    primary:
      "bg-gradient-to-r from-blue-500 via-blue-500 to-violet-500 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30",

    secondary:
      "border border-slate-700 bg-slate-900/70 text-slate-200 hover:border-blue-500/60 hover:text-blue-300",

    ghost:
      "text-slate-300 hover:bg-slate-800 hover:text-white",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold transition duration-300 hover:-translate-y-0.5 ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;