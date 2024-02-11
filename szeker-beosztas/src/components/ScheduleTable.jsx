// ScheduleTable.jsx
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import "./ScheduleTable.css";
import { sortEmployeesIntoSchedule } from "./scheduleUtils";

const ScheduleTable = ({
  wagons,
  days,
  schedule,
  employeesList,
  onAssignEmployee,
}) => {
  const handleAssignEmployeeToCell = (wagon, day, shiftType, employee) => {
    onAssignEmployee(wagon, day, shiftType, employee);
  };

  const [sortedSchedule, setSortedSchedule] = useState(schedule);

  useEffect(() => {
    setSortedSchedule(schedule);
  }, [schedule]);

  const handleSortEmployees = () => {
    const updatedSchedule = sortEmployeesIntoSchedule(
      { ...schedule },
      employeesList
    );
    setSortedSchedule(updatedSchedule);
    console.log("Sorted Schedule:", sortedSchedule);
    // You may want to update the state or perform any other actions based on the sorted schedule
  };

  return (
    <div className="schedule-table">
      <TableContainer component={Paper}>
        <Table
          className="schedule-table"
          style={{ borderCollapse: "collapse" }}
        >
          <TableHead>
            <TableRow>
              <TableCell className="schedule-cell">Szekér</TableCell>
              <TableCell className="schedule-cell">Műszak</TableCell>
              {days.map((day) => (
                <TableCell key={day} className="schedule-cell">
                  {day}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {wagons.map((wagon) => (
              <React.Fragment key={wagon}>
                <TableRow>
                  <TableCell rowSpan={2} className="cell">
                    {wagon}
                  </TableCell>
                  <TableCell className="cell">D.előtt</TableCell>
                  {days.map((day) => (
                    <TableCell
                      key={`${wagon}-${day}-morning`}
                      className="schedule-cell"
                    >
                      <Select
                        className="schedule-select"
                        labelId={`${wagon}-${day}-morning-label`}
                        value={sortedSchedule[wagon]?.[day]?.morning || ""}
                        onChange={(e) =>
                          handleAssignEmployeeToCell(
                            wagon,
                            day,
                            "morning",
                            e.target.value
                          )
                        }
                      >
                        <MenuItem value="" disabled>
                          Select Employee
                        </MenuItem>
                        {employeesList.map((employee) => (
                          <MenuItem key={employee.name} value={employee.name}>
                            {employee.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="schedule-cell">D.után</TableCell>
                  {days.map((day) => (
                    <TableCell
                      key={`${wagon}-${day}-afternoon`}
                      className="schedule-cell"
                    >
                      <Select
                        className="schedule-select"
                        labelId={`${wagon}-${day}-afternoon-label`}
                        value={sortedSchedule[wagon]?.[day]?.afternoon || ""}
                        onChange={(e) =>
                          handleAssignEmployeeToCell(
                            wagon,
                            day,
                            "afternoon",
                            e.target.value
                          )
                        }
                      >
                        <MenuItem value="" disabled>
                          Select Employee
                        </MenuItem>
                        {employeesList.map((employee) => (
                          <MenuItem key={employee.name} value={employee.name}>
                            {employee.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </TableCell>
                  ))}
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box className="notes-box">
        <h2>Notes</h2>
        <Button
          onClick={handleSortEmployees}
          variant="contained"
          color="primary"
        >
          Beoszt
        </Button>
      </Box>
    </div>
  );
};

export default ScheduleTable;
