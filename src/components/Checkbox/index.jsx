import React from 'react'
import "./index.css";

const Checkbox = ({ id, content, onChange }) => {
  return (
    <div className="form-group">
      <input type="checkbox" id={id} onChange={onChange}/>
      <label htmlFor={id}>{content}</label>
    </div>
  )
}

export default Checkbox