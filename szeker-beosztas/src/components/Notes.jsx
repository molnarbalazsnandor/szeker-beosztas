// Notes.jsx
import React, { useEffect, useState } from "react";
import { Paper, Box, Button, Typography } from "@mui/material";
import {
  wagons,
  days,
  findDuplicateShifts,
  getDayIndex,
} from "./scheduleUtils";

const Notes = ({ schedule, employeesList, handlePrint }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    generateNotes();
  }, [schedule, employeesList]);

  const generateNotes = () => {
    const newNotes = [];
    employeesList.forEach((employee) => {
      const { name, shifts, shiftAvailability, wagonPreferences } = employee;
      const assignedShifts = calculateAssignedShifts(employee);
      if (assignedShifts !== shifts) {
        newNotes.push(
          `${name} ${shifts} műszakot kért, de ${assignedShifts}-t kapott!`
        );
      }
      const requestedWagons = wagonPreferences.join(", ");
      const assignedWagons = getAssignedWagons(employee);
      const problematicWagons = assignedWagons.filter(
        (wagon) => !wagonPreferences.includes(wagon)
      );
      if (problematicWagons.length > 0) {
        newNotes.push(
          `${name} be lett osztva a  ${problematicWagons.join(
            ", "
          )} szekérre, pedig csak ezekre kért műszakot: ${requestedWagons}!`
        );
      }
      const unavailableShifts = findUnavailableShifts(employee);
      unavailableShifts.forEach((shift) => {
        newNotes.push(
          `${name} nem ér rá ekkor: ${shift.day} ${
            shift.shift === "morning" ? "délelőtt" : "délután"
          }!`
        );
      });

      // Use the modified helper function to find duplicate shifts
      const duplicateShifts = findDuplicateShifts(employee, schedule);
      if (duplicateShifts.length > 0) {
        duplicateShifts.forEach(({ day, wagons }) => {
          newNotes.push(
            `${name} több szekérre is be lett osztva (${wagons}) ezen a napon: ${day}!`
          );
        });
      }
    });
    setNotes(newNotes);
  };

  const calculateAssignedShifts = (employee) => {
    let assignedShifts = 0;
    Object.keys(schedule).forEach((wagon) => {
      Object.keys(schedule[wagon]).forEach((day) => {
        if (schedule[wagon][day].morning === employee.name) {
          assignedShifts++;
        }
        if (schedule[wagon][day].afternoon === employee.name) {
          assignedShifts++;
        }
      });
    });
    return assignedShifts;
  };

  const getAssignedWagons = (employee) => {
    const assignedWagons = new Set();
    Object.keys(schedule).forEach((wagon) => {
      Object.keys(schedule[wagon]).forEach((day) => {
        if (schedule[wagon][day].morning === employee.name) {
          assignedWagons.add(wagon);
        }
        if (schedule[wagon][day].afternoon === employee.name) {
          assignedWagons.add(wagon);
        }
      });
    });
    return [...assignedWagons];
  };

  const findUnavailableShifts = (employee) => {
    const unavailableShifts = [];
    Object.keys(schedule).forEach((wagon) => {
      Object.keys(schedule[wagon]).forEach((day) => {
        if (!employee.shiftAvailability.morning[getDayIndex(day)]) {
          if (schedule[wagon][day].morning === employee.name) {
            unavailableShifts.push({ day, shift: "morning" });
          }
        }
        if (!employee.shiftAvailability.afternoon[getDayIndex(day)]) {
          if (schedule[wagon][day].afternoon === employee.name) {
            unavailableShifts.push({ day, shift: "afternoon" });
          }
        }
      });
    });
    return unavailableShifts;
  };

  return (
    <Paper
      className="notes-box"
      style={{
        padding: "20px",
        width: "27vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h4">Megjegyzések</Typography>
      <Box>
        <ul>
          {notes
            .sort((a, b) => a.localeCompare(b, "hu"))
            .map((note, index) => (
              <li key={index}>
                <Typography
                  variant="body1"
                  style={{
                    color:
                      note.includes("több szekérre is be lett osztva") ||
                      note.includes("nem ér rá")
                        ? "red"
                        : "inherit",
                  }}
                >
                  {note}
                </Typography>
              </li>
            ))}
        </ul>
      </Box>
      <Button
        variant="contained"
        onClick={handlePrint}
        style={{
          backgroundColor: "rgba(189, 4, 4, 0.9)",
          width: "80%",
          height: "100px",
          fontSize: "20px",
        }}
      >
        Beosztás lementése
      </Button>
      <Paper
        style={{
          width: "auto",
          height: "auto",
          marginTop: "30%",
          padding: "5px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <Typography style={{ alignSelf: "center" }} variant="h6">
          Nevek színmagyarázata
        </Typography>
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <Box
            style={{
              width: "10px",
              height: "10px",
              backgroundColor: "green",
              marginRight: "5px",
              marginTop: "10px",
            }}
          ></Box>
          <Typography variant="subtitle1">
            : a könyvterjesztő ráér ekkor, és a szekér is megfelelő
          </Typography>
        </Box>
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <Box
            style={{
              width: "10px",
              height: "10px",
              backgroundColor: "black",
              marginRight: "5px",
              marginTop: "10px",
            }}
          ></Box>
          <Typography variant="subtitle1">
            : a könyvterjesztő ráér ekkor, de a szekeret nem választotta
          </Typography>
        </Box>
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <Box
            style={{
              width: "10px",
              height: "10px",
              backgroundColor: "red",
              marginRight: "5px",
              marginTop: "10px",
            }}
          ></Box>
          <Typography variant="subtitle1">
            : a könyvterjesztőnek nem alkalmas a műszak
          </Typography>
        </Box>
      </Paper>
    </Paper>
  );
};

export default Notes;
