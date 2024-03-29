// Notes.jsx
import React, { useEffect, useState } from "react";
import { Paper, Box } from "@mui/material";
import { wagons, days } from "./scheduleUtils";

const Notes = ({ schedule, employeesList }) => {
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
          `${name}: requested ${shifts} shifts, but got ${assignedShifts}!`
        );
      }
      const requestedWagons = wagonPreferences.join(", ");
      const assignedWagons = getAssignedWagons(employee);
      const problematicWagons = assignedWagons.filter(
        (wagon) => !wagonPreferences.includes(wagon)
      );
      if (problematicWagons.length > 0) {
        newNotes.push(
          `${name} got assigned to ${problematicWagons.join(
            ", "
          )}, but only requested shifts on ${requestedWagons}!`
        );
      }
      const unavailableShifts = findUnavailableShifts(employee);
      unavailableShifts.forEach((shift) => {
        newNotes.push(
          `${name} is not available on ${shift.day} ${shift.shift}!`
        );
      });
      const duplicateShifts = findDuplicateShifts(employee);
      if (duplicateShifts.length > 0) {
        duplicateShifts.forEach((note) => newNotes.push(note));
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

  const findDuplicateShifts = (employee) => {
    const duplicateShifts = [];

    // Iterate over each day in the schedule
    days.forEach((day) => {
      const duplicateWagons = new Set();

      // Check morning shift
      wagons.forEach((wagon) => {
        if (schedule[wagon][day].morning === employee.name) {
          duplicateWagons.add(wagon);
        }
      });

      // Check afternoon shift
      wagons.forEach((wagon) => {
        if (schedule[wagon][day].afternoon === employee.name) {
          duplicateWagons.add(wagon);
        }
      });

      // If multiple wagons have the same shift on the same day, add it to the duplicateShifts array
      if (duplicateWagons.size > 1) {
        duplicateShifts.push({
          day,
          wagons: Array.from(duplicateWagons).join(","),
        });
      }
    });

    // Generate notes for duplicate shifts
    const notes = duplicateShifts.map(({ day, wagons }) => {
      return `${employee.name} is assigned to multiple wagons (${wagons}) on ${day}!`;
    });

    return notes;
  };

  const getDayIndex = (day) => {
    return days.indexOf(day);
  };

  return (
    <Paper className="notes-box">
      <h2>Notes</h2>
      <Box>
        <ul>
          {notes.map((note, index) => (
            <li key={index}>{note}</li>
          ))}
        </ul>
      </Box>
    </Paper>
  );
};

export default Notes;
