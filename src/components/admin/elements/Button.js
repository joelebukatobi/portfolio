export default function Button({ children, className, onClick }) {
  return (
    <button type="submit" onClick={onClick} className={`${className}`}>
      {children}
    </button>
  );
}
