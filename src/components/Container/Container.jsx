export const Container = ({ children, className = "" }) => {
  return (
    <div className={`w-full m-auto max-w-5xl ${className}`}>{children}</div>
  );
};
