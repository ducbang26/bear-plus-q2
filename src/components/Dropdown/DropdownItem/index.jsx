
const DropdownItem = ({ children, className, onClick }) => {
  return (
    <div className={`dropdown-item ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};

export default DropdownItem;