import React from "react";
import s from "./styles.module.scss";

const Search = ({ value, onChange }) => {
  return (
    <form className={s.search} onSubmit={e => { e.preventDefault(); }}>
      <span>
        <svg
          width="16"
          height="17"
          viewBox="0 0 16 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.33333 13.1667C10.2789 13.1667 12.6667 10.7789 12.6667 7.83333C12.6667 4.88781 10.2789 2.5 7.33333 2.5C4.38781 2.5 2 4.88781 2 7.83333C2 10.7789 4.38781 13.1667 7.33333 13.1667Z"
            stroke="#223034"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14.0001 14.5L11.1001 11.6"
            stroke="#223034"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <input
        placeholder="Search..."
        type="text"
        value={value}
        onChange={onChange}
      />
    </form>
  );
};

export default Search;
