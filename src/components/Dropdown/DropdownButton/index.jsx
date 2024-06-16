/* eslint-disable react/display-name */
import { forwardRef } from "react";

const DropdownButton = forwardRef((props, ref) => {
  const { children, toggle, open } = props;

  return (
    <div
      onClick={toggle}
      className={`dropdown-btn ${open ? "button-open" : null}`}
      ref={ref}
    >
      {children}
      <span className="toggle-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="17"
          viewBox="0 0 16 17"
          fill="none"
          style={{
            transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
            transition: 'transform 300ms ease-in-out'
          }}
        >
          <path
            d="M8 3.5L8 13.5"
            stroke="#223034"
            strokeWidth="1.3"
            strokeLinecap="square"
            strokeLinejoin="round"
          />
          <path
            d="M1 8.5L15 8.5"
            stroke="#223034"
            strokeWidth="1.3"
            strokeLinecap="square"
            strokeLinejoin="round"
          />
        </svg>
        {/* {open ? <FaChevronUp /> : <FaChevronDown />} */}
      </span>
    </div>
  );
});

export default DropdownButton;
