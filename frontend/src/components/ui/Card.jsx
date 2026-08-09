const Card = ({
  children,
}) => {
  return (
    <div
      style={{
        background: "#1E293B",
        padding: "30px",
        borderRadius: "16px",
      }}
    >
      {children}
    </div>
  );
};

export default Card;