const GlassCard = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`rounded-3xl border border-slate-800/80 bg-slate-900/55 shadow-2xl shadow-black/10 backdrop-blur-xl ${className}`}
    >
      {children}
    </div>
  );
};

export default GlassCard;