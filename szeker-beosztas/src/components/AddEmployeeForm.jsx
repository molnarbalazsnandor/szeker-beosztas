// AddEmployeeForm.jsx
import React, { useState, useEffect } from "react";
import {
  TextField,
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

const AddEmployeeForm = ({ onAddEmployee, employeesList, wagons, days }) => {
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
    <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Employee Name"
          variant="outlined"
          fullWidth
          value={employee.name}
          onChange={handleInputChange}
          style={{ marginBottom: "10px" }}
        />
        <TextField
          label="Number of Shifts"
          variant="outlined"
          type="number"
          fullWidth
          value={employee.shifts}
          onChange={handleShiftsChange}
          style={{ marginBottom: "10px" }}
        />
        <FormGroup>
          <List>
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
        <FormGroup>
          <List>
            <ListItem>
              <ListItemText />
              {days.map((day, index) => (
                <ListItemText key={`day-label-${index}`} primary={day} />
              ))}
            </ListItem>
            <ListItem>
              <ListItemText primary="Morning Shift" />
              {Array(7)
                .fill()
                .map((_, index) => (
                  <Checkbox
                    key={`morning-shift-${index}`}
                    checked={employee.shiftAvailability.morning[index]}
                    onChange={() =>
                      handleShiftAvailabilityChange("morning", index)
                    }
                  />
                ))}
            </ListItem>
            <ListItem>
              <ListItemText primary="Afternoon Shift" />
              {Array(7)
                .fill()
                .map((_, index) => (
                  <Checkbox
                    key={`afternoon-shift-${index}`}
                    checked={employee.shiftAvailability.afternoon[index]}
                    onChange={() =>
                      handleShiftAvailabilityChange("afternoon", index)
                    }
                  />
                ))}
            </ListItem>
          </List>
        </FormGroup>
        <Button type="submit" variant="contained" color="primary">
          Hozzáad
        </Button>
      </form>
      {employeesList.length > 0 && (
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <List style={{ marginTop: "20px" }}>
            {employeesList.map((emp, index) => (
              <ListItem key={index}>
                <ListItemText primary={emp.name} />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{ marginTop: "20px" }}
      >
        Beoszt
      </Button>
    </Paper>
  );
};

export default AddEmployeeForm;
