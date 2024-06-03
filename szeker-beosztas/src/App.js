// App.js
import React, { useState, useEffect } from "react";
import { Box, Typography, createTheme, ThemeProvider } from "@mui/material";
import ScheduleTable from "./components/ScheduleTable";
import AddEmployeeForm from "./components/AddEmployeeForm";
import {
  sortEmployeesIntoSchedule,
  createInitialSchedule,
  fillRemainingShifts,
  equalizeShifts,
} from "./components/scheduleUtils";
/* import testEmployeesList from "./components/testEmployeesList"; */
import "./App.css";

const App = () => {
  const [schedule, setSchedule] = useState(() => {
    const storedSchedule = JSON.parse(localStorage.getItem("schedule"));
    return storedSchedule || createInitialSchedule();
  });
  const [employeesList, setEmployeesList] = useState([]);
  const [isSortClicked, setIsSortClicked] = useState(false);

  let theme = createTheme({
    palette: {
      primary: {
        main: "rgba(101, 17, 17, 0.9)",
      },
      secondary: {
        main: "#edf2ff",
      },
    },
  });

  // Load employeesList from local storage on component mount
  useEffect(() => {
    const storedEmployeesList = JSON.parse(
      localStorage.getItem("employeesList")
    );
    if (storedEmployeesList && storedEmployeesList.length > 0) {
      setEmployeesList(storedEmployeesList);
    }
  }, []);

  // Save employeesList to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("employeesList", JSON.stringify(employeesList));
  }, [employeesList]);

  // Save schedule to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("schedule", JSON.stringify(schedule));
  }, [schedule]);

  const handleAddEmployee = (employee) => {
    const updatedEmployeesList = [...employeesList, employee];
    setEmployeesList(updatedEmployeesList);
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

      console.log("App.js Updated Schedule:", newSchedule);
      return newSchedule;
    });
  };

  const handleSortEmployees = () => {
    const initialSchedule = createInitialSchedule();
    setSchedule(initialSchedule);

    const updatedSchedule = sortEmployeesIntoSchedule(
      { ...initialSchedule },
      employeesList
    );

    console.log("Sorted Schedule:", updatedSchedule);
    setSchedule(updatedSchedule);
    setIsSortClicked(true);
  };

  // Function to delete an employee
  const handleDeleteEmployee = (employeeName) => {
    const updatedList = employeesList.filter(
      (employee) => employee.name !== employeeName
    );
    setEmployeesList(updatedList);
  };

  // Handler function for filling a single shift
  const handleFillRemainingShifts = () => {
    const updatedSchedule = fillRemainingShifts({ ...schedule }, employeesList);
    setSchedule({ ...updatedSchedule });
  };

  const handleEqualizeShift = () => {
    const updatedSchedule = equalizeShifts({ ...schedule }, employeesList);
    setSchedule({ ...updatedSchedule });
  };

  return (
    <Box>
      <ThemeProvider theme={theme}>
        <Box className="app-header">
          <Box
            component="img"
            src="./../konyvmentok.jpg"
            alt="konyvmentok ikon"
            sx={{ width: 100, height: "auto" }}
          />
          <Typography variant="h3">Beosztás generátor</Typography>
        </Box>
        <Box className="app-body">
          <AddEmployeeForm
            schedule={schedule}
            employeesList={employeesList}
            setEmployeesList={setEmployeesList}
            onAddEmployee={handleAddEmployee}
            onDeleteEmployee={handleDeleteEmployee}
            onSortEmployees={handleSortEmployees}
            onFillRemainingShifts={handleFillRemainingShifts}
            isSortClicked={isSortClicked}
            onEqualizeShift={handleEqualizeShift}
          />
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              width: "95%",
              paddingTop: "20px",
            }}
          >
            <ScheduleTable
              schedule={schedule}
              setSchedule={setSchedule}
              employeesList={employeesList}
              onAssignEmployee={handleAssignEmployee}
            />
          </Box>
        </Box>
      </ThemeProvider>
    </Box>
  );
};

export default App;
