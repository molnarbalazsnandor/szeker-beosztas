import React, { useState } from "react";

const AddEmployeeForm = ({ onAddEmployee }) => {
  const [employee, setEmployee] = useState("");

  const handleInputChange = (e) => {
    setEmployee(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (employee.trim() !== "") {
      onAddEmployee(employee);
      setEmployee("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Add Employee:
        <input type="text" value={employee} onChange={handleInputChange} />
      </label>
      <button type="submit">Add</button>
    </form>
  );
};

export default AddEmployeeForm;
