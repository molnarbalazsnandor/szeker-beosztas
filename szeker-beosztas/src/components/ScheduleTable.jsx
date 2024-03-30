import React, { useRef } from "react";
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
  Button,
} from "@mui/material";
import "./ScheduleTable.css";
import { wagons, days } from "./scheduleUtils";
import html2canvas from "html2canvas";

const ScheduleTable = ({ schedule, employeesList, onAssignEmployee }) => {
  const tableRef = useRef(null);

  const handlePrint = () => {
    if (tableRef.current) {
      html2canvas(tableRef.current).then((canvas) => {
        const imgData = canvas.toDataURL("image/jpeg");
        const link = document.createElement("a");
        link.href = imgData;
        link.download = "könyvmentők beosztás.jpg";
        link.click();
      });
    }
  };

  // Function to get the days of the next week
  const dates = getDatesOfWeek();
  function getDatesOfWeek() {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      const options = { day: "2-digit", month: "2-digit" };
      dates.push(new Intl.DateTimeFormat("hu-HU", options).format(date));
    }
    return dates;
  }

  const handleAssignEmployeeToCell = (wagon, day, shiftType, employee) => {
    onAssignEmployee(wagon, day, shiftType, employee);
  };

  return (
    <Box className="schedule-table" style={{ width: "100%" }}>
      <TableContainer component={Paper}>
        <Table
          className="schedule-table"
          style={{ borderCollapse: "collapse" }}
          ref={tableRef}
        >
          <TableHead>
            <TableRow>
              <TableCell className="schedule-cell">Szekér</TableCell>
              <TableCell className="schedule-cell">Műszak</TableCell>
              {days.map((day, index) => (
                <TableCell key={day} className="schedule-cell">
                  {`${day} ${dates[index]}`}
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
      <Button variant="contained" onClick={handlePrint}>
        Print as JPG
      </Button>
    </Box>
  );
};

export default ScheduleTable;
