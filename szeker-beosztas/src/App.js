// App.js
import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import ScheduleTable from "./components/ScheduleTable";
import AddEmployeeForm from "./components/AddEmployeeForm";
import Notes from "./components/Notes";
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
    <Box>
      <Typography variant="h3">Könyvmentők beosztás</Typography>
      <Box style={{ display: "flex", flexDirection: "row" }}>
        <AddEmployeeForm
          schedule={schedule}
          employeesList={employeesList}
          onAddEmployee={handleAddEmployee}
          onDeleteEmployee={handleDeleteEmployee}
          onSortEmployees={handleSortEmployees}
        />
        <Box style={{ display: "flex", flexDirection: "column" }}>
          <ScheduleTable
            schedule={schedule}
            employeesList={employeesList}
            onAssignEmployee={handleAssignEmployee}
          />
          <Notes schedule={schedule} employeesList={employeesList} />
        </Box>
      </Box>
    </Box>
  );
};

export default App;
