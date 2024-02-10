// ScheduleTable.jsx
import React from "react";
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
} from "@mui/material";

const ScheduleTable = ({
  wagons,
  schedule,
  employeesList,
  onAssignEmployee,
}) => {
  let days = [
    "Hétfő",
    "Kedd",
    "Szerda",
    "Csütörtök",
    "Péntek",
    "Szombat",
    "Vasárnap",
  ];

  const handleAssignEmployeeToCell = (wagon, day, shiftType, employee) => {
    onAssignEmployee(wagon, day, shiftType, employee);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table style={{ borderCollapse: "collapse" }}>
          <TableHead>
            <TableRow>
              <TableCell style={{ border: "1px solid #ddd", padding: "8px" }}>
                Wagon
              </TableCell>
              <TableCell style={{ border: "1px solid #ddd", padding: "8px" }}>
                Shifts
              </TableCell>
              {days.map((day) => (
                <TableCell
                  key={day}
                  style={{ border: "1px solid #ddd", padding: "8px" }}
                >
                  {day}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {wagons.map((wagon) => (
              <React.Fragment key={wagon}>
                <TableRow>
                  <TableCell
                    rowSpan={2}
                    style={{ border: "1px solid #ddd", padding: "8px" }}
                  >
                    {wagon}
                  </TableCell>
                  <TableCell
                    style={{ border: "1px solid #ddd", padding: "8px" }}
                  >
                    Morning
                  </TableCell>
                  {days.map((day) => (
                    <TableCell
                      key={`${wagon}-${day}-morning`}
                      style={{ border: "1px solid #ddd", padding: "8px" }}
                    >
                      <Select
                        labelId={`${wagon}-${day}-morning-label`}
                        value={schedule[wagon]?.[day]?.morning || ""}
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
                  <TableCell
                    style={{ border: "1px solid #ddd", padding: "8px" }}
                  >
                    Afternoon
                  </TableCell>
                  {days.map((day) => (
                    <TableCell
                      key={`${wagon}-${day}-afternoon`}
                      style={{ border: "1px solid #ddd", padding: "8px" }}
                    >
                      <Select
                        labelId={`${wagon}-${day}-afternoon-label`}
                        value={schedule[wagon]?.[day]?.afternoon || ""}
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
      <Box mt={2} p={2} border={1} borderColor="grey.300">
        <h2>Notes</h2>
      </Box>
    </div>
  );
};

export default ScheduleTable;
