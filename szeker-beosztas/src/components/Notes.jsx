/* eslint-disable react-hooks/exhaustive-deps */
// Notes.jsx
import React, { useEffect, useState } from "react";
import {
  Paper,
  Box,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  findDuplicateShifts,
  getDayIndex,
  createInitialSchedule,
} from "./scheduleUtils";

const Notes = ({ schedule, setSchedule, employeesList, handlePrint }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    generateNotes();
  }, [schedule, employeesList]);

  const generateNotes = () => {
    const newNotes = [];
    employeesList.forEach((employee) => {
      const { name, shifts, wagonPreferences } = employee;
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

  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const handleConfirmClearSchedule = () => {
    setOpenConfirmDialog(true);
  };

  const handleClearSchedule = () => {
    setSchedule(createInitialSchedule());
    localStorage.removeItem("schedule");
    setOpenConfirmDialog(false);
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
      <Button
        variant="contained"
        color="error"
        style={{ marginTop: "30px", backgroundColor: "rgba(50, 49, 49, 1)" }}
        onClick={handleConfirmClearSchedule}
      >
        Beosztás törlése
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
      <Dialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
      >
        <DialogTitle>Beosztás törlése</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Biztosan törölni szeretnéd a beosztást?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClearSchedule}
            variant="contained"
            color="error"
          >
            Igen
          </Button>
          <Button
            variant="contained"
            style={{ backgroundColor: "rgba(112, 112, 112, 1)" }}
            onClick={() => setOpenConfirmDialog(false)}
            autoFocus
          >
            Mégse
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default Notes;
/* eslint-disable react-hooks/exhaustive-deps */
