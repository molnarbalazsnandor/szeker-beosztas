import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const ScheduleTable = ({ wagons, schedule }) => {
  let days = [
    "Hétfő",
    "Kedd",
    "Szerda",
    "Csütörtök",
    "Péntek",
    "Szombat",
    "Vasárnap",
  ];
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
                  <TableCell
                    style={{ border: "1px solid #ddd", padding: "8px" }}
                  >
                    {schedule[wagon]["Monday"].morning}
                  </TableCell>
                  <TableCell
                    style={{ border: "1px solid #ddd", padding: "8px" }}
                  >
                    {schedule[wagon]["Tuesday"].morning}
                  </TableCell>
                  <TableCell
                    style={{ border: "1px solid #ddd", padding: "8px" }}
                  >
                    {schedule[wagon]["Wednesday"].morning}
                  </TableCell>
                  <TableCell
                    style={{ border: "1px solid #ddd", padding: "8px" }}
                  >
                    {schedule[wagon]["Thursday"].morning}
                  </TableCell>
                  <TableCell
                    style={{ border: "1px solid #ddd", padding: "8px" }}
                  >
                    {schedule[wagon]["Friday"].morning}
                  </TableCell>
                  <TableCell
                    style={{ border: "1px solid #ddd", padding: "8px" }}
                  >
                    {schedule[wagon]["Saturday"].morning}
                  </TableCell>
                  <TableCell
                    style={{ border: "1px solid #ddd", padding: "8px" }}
                  >
                    {schedule[wagon]["Sunday"].morning}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    style={{ border: "1px solid #ddd", padding: "8px" }}
                  >
                    Afternoon
                  </TableCell>
                  <TableCell
                    style={{ border: "1px solid #ddd", padding: "8px" }}
                  >
                    {schedule[wagon]["Monday"].afternoon}
                  </TableCell>
                  <TableCell
                    style={{ border: "1px solid #ddd", padding: "8px" }}
                  >
                    {schedule[wagon]["Tuesday"].afternoon}
                  </TableCell>
                  <TableCell
                    style={{ border: "1px solid #ddd", padding: "8px" }}
                  >
                    {schedule[wagon]["Wednesday"].afternoon}
                  </TableCell>
                  <TableCell
                    style={{ border: "1px solid #ddd", padding: "8px" }}
                  >
                    {schedule[wagon]["Thursday"].afternoon}
                  </TableCell>
                  <TableCell
                    style={{ border: "1px solid #ddd", padding: "8px" }}
                  >
                    {schedule[wagon]["Friday"].afternoon}
                  </TableCell>
                  <TableCell
                    style={{ border: "1px solid #ddd", padding: "8px" }}
                  >
                    {schedule[wagon]["Saturday"].afternoon}
                  </TableCell>
                  <TableCell
                    style={{ border: "1px solid #ddd", padding: "8px" }}
                  >
                    {schedule[wagon]["Sunday"].afternoon}
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ScheduleTable;
