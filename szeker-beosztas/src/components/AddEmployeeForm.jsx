// AddEmployeeForm.jsx
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Button,
  Checkbox,
  FormGroup,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  Paper,
  Box,
} from "@mui/material";
import { wagons, days } from "./scheduleUtils";
import "./AddEmployeeForm.css";

const AddEmployeeForm = ({
  schedule,
  setSchedule,
  employeesList,
  onAddEmployee,
  onDeleteEmployee,
  onSortEmployees,
}) => {
  const [employee, setEmployee] = useState({
    name: "",
    shifts: 1,
    wagonPreferences: [],
    shiftAvailability: {
      morning: Array(7).fill(false),
      afternoon: Array(7).fill(false),
    },
  });

  useEffect(() => {
    console.log("Employee List:", employeesList);
  }, [employeesList]);

  const handleInputChange = (e) => {
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      name: e.target.value,
    }));
  };

  const handleShiftsChange = (e) => {
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      shifts: parseInt(e.target.value, 10),
    }));
  };

  const handleWagonPreferenceChange = (wagon) => {
    setEmployee((prevEmployee) => {
      const isAlreadySelected = prevEmployee.wagonPreferences.includes(wagon);
      return {
        ...prevEmployee,
        wagonPreferences: isAlreadySelected
          ? prevEmployee.wagonPreferences.filter((w) => w !== wagon)
          : [...prevEmployee.wagonPreferences, wagon],
      };
    });
  };

  const handleShiftAvailabilityChange = (shiftType, dayIndex) => {
    setEmployee((prevEmployee) => {
      const newAvailability = { ...prevEmployee.shiftAvailability };
      newAvailability[shiftType][dayIndex] =
        !newAvailability[shiftType][dayIndex];
      return {
        ...prevEmployee,
        shiftAvailability: newAvailability,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (employee.name.trim() !== "") {
      onAddEmployee(employee);
      setEmployee({
        name: "",
        shifts: 1,
        wagonPreferences: [],
        shiftAvailability: {
          morning: Array(7).fill(false),
          afternoon: Array(7).fill(false),
        },
      });
    }
  };

  return (
    <Paper className="employee-form-paper" elevation={5}>
      <Paper className="employee-form">
        <form className="employee-form" onSubmit={handleSubmit}>
          <Box className="employee-name-shifts-wagons">
            <TextField
              label="Könyvterjesztő neve"
              variant="outlined"
              fullWidth
              value={employee.name}
              onChange={handleInputChange}
              style={{
                marginBottom: "10px",
              }}
            />
            <TextField
              label="Igényelt műszakok száma"
              variant="outlined"
              type="number"
              fullWidth
              value={employee.shifts}
              onChange={handleShiftsChange}
              style={{ marginBottom: "10px" }}
            />
            <Typography variant="h6" gutterBottom>
              Preferált szekerek:
            </Typography>
            <FormGroup>
              <List style={{ columnCount: 2 }}>
                {wagons.map((wagon) => (
                  <ListItem key={wagon}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={employee.wagonPreferences.includes(wagon)}
                          onChange={() => handleWagonPreferenceChange(wagon)}
                        />
                      }
                      label={wagon}
                    />
                  </ListItem>
                ))}
              </List>
            </FormGroup>
          </Box>
          <Box className="employee-days-save">
            <Typography variant="h6" gutterBottom>
              Mikor érne rá:
            </Typography>
            <FormGroup style={{ width: "100%" }}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" />
                      {days.map((day, index) => (
                        <TableCell key={`day-header-${index}`} align="center">
                          {day}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        D.előtt
                      </TableCell>
                      {Array(7)
                        .fill()
                        .map((_, index) => (
                          <TableCell
                            key={`morning-shift-${index}`}
                            align="center"
                          >
                            <Checkbox
                              checked={
                                employee.shiftAvailability.morning[index]
                              }
                              onChange={() =>
                                handleShiftAvailabilityChange("morning", index)
                              }
                            />
                          </TableCell>
                        ))}
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        D.után
                      </TableCell>
                      {Array(7)
                        .fill()
                        .map((_, index) => (
                          <TableCell
                            key={`afternoon-shift-${index}`}
                            align="center"
                          >
                            <Checkbox
                              checked={
                                employee.shiftAvailability.afternoon[index]
                              }
                              onChange={() =>
                                handleShiftAvailabilityChange(
                                  "afternoon",
                                  index
                                )
                              }
                            />
                          </TableCell>
                        ))}
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </FormGroup>

            <Button
              className="employee-button"
              type="submit"
              variant="contained"
              color="primary"
            >
              Mentés
            </Button>
          </Box>
        </form>
      </Paper>
      <Paper className="employee-list-assign">
        {employeesList.length > 0 && (
          <Box>
            <List className="employee-list">
              {employeesList.map((emp, index) => (
                <ListItem className="employee-list-item" key={index}>
                  <Paper className="employee-list-item">
                    <ListItemText primary={emp.name} />
                    <Button
                      onClick={() => onDeleteEmployee(emp.name)}
                      variant="contained"
                      color="error"
                      style={{ marginLeft: "5px" }}
                    >
                      Delete
                    </Button>
                  </Paper>
                </ListItem>
              ))}
            </List>
          </Box>
        )}
        <Button
          onClick={onSortEmployees}
          variant="contained"
          color="primary"
          className="employee-button"
        >
          Beoszt
        </Button>
      </Paper>
    </Paper>
  );
};

export default AddEmployeeForm;
