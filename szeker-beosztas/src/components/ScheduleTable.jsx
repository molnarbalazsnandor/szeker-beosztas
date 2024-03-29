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
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import "./ScheduleTable.css";
import { wagons, days } from "./scheduleUtils";
import Notes from "./Notes";

const ScheduleTable = ({ schedule, employeesList, onAssignEmployee }) => {
  const handleAssignEmployeeToCell = (wagon, day, shiftType, employee) => {
    onAssignEmployee(wagon, day, shiftType, employee);
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
                        <MenuItem value="">{"(üres)"}</MenuItem>
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
                        <MenuItem value="">{"(üres)"}</MenuItem>
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
      <Notes schedule={schedule} employeesList={employeesList} />
    </div>
  );
};

export default ScheduleTable;
