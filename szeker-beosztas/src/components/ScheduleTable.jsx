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
  Typography,
} from "@mui/material";
import "./ScheduleTable.css";
import { wagons, days } from "./scheduleUtils";
import Notes from "./Notes";
import html2canvas from "html2canvas";

const ScheduleTable = ({
  schedule,
  setSchedule,
  employeesList,
  onAssignEmployee,
}) => {
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

  const compareHungarianStrings = (a, b) => {
    return a.localeCompare(b, "hu");
  };

  const isAvailable = (employee, dayIndex, shiftType) => {
    return employee.shiftAvailability[shiftType][dayIndex];
  };

  const prefersWagon = (employee, wagon) => {
    return employee.wagonPreferences.includes(wagon);
  };

  const getColorForEmployee = (employee, wagon, dayIndex, shiftType) => {
    if (!isAvailable(employee, dayIndex, shiftType)) {
      return "red";
    }
    if (prefersWagon(employee, wagon)) {
      return "green";
    }
    return "black";
  };

  const isWagonOpen = (wagon, dayIndex, shiftType) => {
    return wagons[wagon][shiftType][dayIndex];
  };

  return (
    <Box className="schedule-table-box">
      <TableContainer component={Paper}>
        <Table
          className="schedule-table"
          style={{ borderCollapse: "collapse" }}
          ref={tableRef}
        >
          <colgroup>
            <col style={{ backgroundColor: "rgba(180, 40, 40, 1)" }} />
            <col style={{ backgroundColor: "rgba(83, 53, 53, 0.5)" }} />
            {Array.from({ length: 7 }).map((_, index) => (
              <col
                key={index}
                style={{
                  backgroundColor:
                    index % 2 === 1 ? "" : `rgba(180, 40, 40, 0.${7 - index})`,
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
          <TableBody className="table-body">
            {Object.keys(wagons).map((wagon) =>
              ["morning", "afternoon"].map((shiftType) => (
                <TableRow key={`${wagon}-${shiftType}`} className="table-row">
                  {shiftType === "morning" && (
                    <TableCell
                      rowSpan={2}
                      className={`schedule-cell wagon ${wagon}`}
                    >
                      {wagon}
                    </TableCell>
                  )}
                  <TableCell
                    className={`schedule-cell shifts-column ${shiftType}`}
                  >
                    {shiftType === "morning" ? "D.előtt" : "D.után"}
                  </TableCell>
                  {days.map((day, index) => (
                    <TableCell
                      key={`${wagon}-${day}-${shiftType}`}
                      className={`schedule-cell ${day} ${shiftType}`}
                    >
                      {isWagonOpen(wagon, days.indexOf(day), shiftType) ? (
                        <Select
                          value={schedule[wagon]?.[day]?.[shiftType] || ""}
                          onChange={(e) =>
                            onAssignEmployee(
                              wagon,
                              day,
                              shiftType,
                              e.target.value
                            )
                          }
                          labelId={`${wagon}-${day}-${shiftType}-label`}
                          className="schedule-select"
                        >
                          <MenuItem value="">(üres)</MenuItem>
                          {employeesList
                            .sort((a, b) =>
                              compareHungarianStrings(a.name, b.name)
                            )
                            .map((employee) => (
                              <MenuItem
                                key={employee.name}
                                value={employee.name}
                                style={{
                                  color: getColorForEmployee(
                                    employee,
                                    wagon,
                                    days.indexOf(day),
                                    shiftType
                                  ),
                                }}
                              >
                                {employee.name}
                              </MenuItem>
                            ))}
                        </Select>
                      ) : (
                        <Typography variant="body1">------</Typography>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Notes
        schedule={schedule}
        setSchedule={setSchedule}
        employeesList={employeesList}
        handlePrint={handlePrint}
      />
    </Box>
  );
};

export default ScheduleTable;
