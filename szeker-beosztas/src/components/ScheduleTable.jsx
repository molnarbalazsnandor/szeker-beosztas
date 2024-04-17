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
import Notes from "./Notes";
import html2canvas from "html2canvas";

const ScheduleTable = ({ schedule, employeesList, onAssignEmployee }) => {
  const tableRef = useRef(null);

  // Function to get the days of the next week
  const dates = getDatesOfWeek();
  function getDatesOfWeek() {
    const dates = [];
    const today = new Date();

    // Calculate the next Monday
    const nextMonday = new Date(today);
    nextMonday.setDate(
      nextMonday.getDate() + ((1 + 7 - nextMonday.getDay()) % 7 || 7)
    );

    // Push the dates for each day of next week into the dates array
    for (let i = 0; i < 7; i++) {
      const date = new Date(nextMonday);
      date.setDate(date.getDate() + i);
      const options = { day: "2-digit", month: "2-digit" };
      dates.push(new Intl.DateTimeFormat("hu-HU", options).format(date));
    }

    return dates;
  }

  const handlePrint = () => {
    if (tableRef.current) {
      html2canvas(tableRef.current).then((canvas) => {
        const imgData = canvas.toDataURL("image/jpeg");
        const link = document.createElement("a");
        link.href = imgData;
        link.download = `${dates[0]} - ${
          dates[dates.length - 1]
        } könyvmentők beosztás.jpg`;
        link.click();
      });
    }
  };

  const handleAssignEmployeeToCell = (wagon, day, shiftType, employee) => {
    onAssignEmployee(wagon, day, shiftType, employee);
  };

  return (
    <Box className="schedule-table">
      <TableContainer component={Paper}>
        <Table
          className="schedule-table"
          style={{ borderCollapse: "collapse" }}
          ref={tableRef}
        >
          <colgroup>
            {Array.from({ length: 9 }).map((_, index) => (
              <col
                key={index}
                style={{
                  backgroundColor:
                    index % 2 === 1 ? "" : `rgba(180, 40, 40, 0.${9 - index})`,
                }}
              />
            ))}
          </colgroup>
          <TableHead className="table-head">
            <TableRow className="table-row">
              <TableCell className="schedule-cell">Szekér</TableCell>
              <TableCell className="schedule-cell">Műszak</TableCell>
              {days.map((day, index) => (
                <TableCell key={day} className="schedule-cell">
                  <Box>{day}</Box>
                  <Box>{dates[index]}</Box>
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
                  <TableCell className="schedule-cell morning">
                    D.előtt
                  </TableCell>
                  {days.map((day) => (
                    <TableCell
                      key={`${wagon}-${day}-morning`}
                      className={`schedule-cell ${day} morning`}
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
                  <TableCell className="schedule-cell afternoon">
                    D.után
                  </TableCell>
                  {days.map((day) => (
                    <TableCell
                      key={`${wagon}-${day}-afternoon`}
                      className={`schedule-cell ${day} afternoon`}
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
      <Notes
        schedule={schedule}
        employeesList={employeesList}
        handlePrint={handlePrint}
      />
    </Box>
  );
};

export default ScheduleTable;
