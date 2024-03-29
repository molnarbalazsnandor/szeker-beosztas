// App.js
import React, { useState, useEffect } from "react";
import ScheduleTable from "./components/ScheduleTable";
import AddEmployeeForm from "./components/AddEmployeeForm";
import {
  sortEmployeesIntoSchedule,
  createInitialSchedule,
} from "./components/scheduleUtils";

const App = () => {
  const [schedule, setSchedule] = useState(createInitialSchedule());
  const [employeesList, setEmployeesList] = useState([]);

  const handleAddEmployee = (employee) => {
    setEmployeesList([...employeesList, employee]);
  };

  const handleAssignEmployee = (wagon, day, shiftType, employee) => {
    setSchedule((prevSchedule) => {
      const newSchedule = { ...prevSchedule };

      // Ensure the wagon and day are initialized
      if (!newSchedule[wagon]) {
        newSchedule[wagon] = {};
      }
      if (!newSchedule[wagon][day]) {
        newSchedule[wagon][day] = { morning: "", afternoon: "" };
      }

      // Update the employee for the specified shift
      newSchedule[wagon][day][shiftType] = employee;

      console.log("App.js Updated Schedule:", newSchedule); // Log the updated schedule
      return newSchedule;
    });
  };

  const handleSortEmployees = () => {
    // Reset the schedule before sorting
    const initialSchedule = createInitialSchedule();
    setSchedule(initialSchedule);

    // Sort employees into the updated schedule
    const updatedSchedule = sortEmployeesIntoSchedule(
      { ...initialSchedule },
      employeesList
    );

    console.log("Sorted Schedule:", updatedSchedule);
    // You may want to update the state or perform any other actions based on the sorted schedule
    setSchedule(updatedSchedule); // Update the main schedule with the updated schedule
  };

  // Function to delete an employee
  const handleDeleteEmployee = (employeeName) => {
    const updatedList = employeesList.filter(
      (employee) => employee.name !== employeeName
    );
    setEmployeesList(updatedList);
  };

  return (
    <div>
      <h1>Könyvmentők beosztás</h1>
      <div style={{ display: "flex" }}>
        <AddEmployeeForm
          schedule={schedule}
          employeesList={employeesList}
          onAddEmployee={handleAddEmployee}
          onDeleteEmployee={handleDeleteEmployee}
          onSortEmployees={handleSortEmployees}
        />
        <ScheduleTable
          schedule={schedule}
          employeesList={employeesList}
          onAssignEmployee={handleAssignEmployee}
        />
      </div>
    </div>
  );
};

export default App;
