const wagons = {
  Abigél: {
    morning: [true, true, true, true, true, false, false],
    afternoon: [true, true, true, true, true, false, false],
  },
  Bethlen: {
    morning: [true, true, true, true, true, true, true],
    afternoon: [true, true, true, true, true, true, true],
  },
  Csehov: {
    morning: [true, true, true, true, true, true, true],
    afternoon: [true, true, true, true, true, true, true],
  },
  Dávid: {
    morning: [true, true, true, true, true, true, true],
    afternoon: [true, true, true, true, true, true, true],
  },
  Désiré: {
    morning: [true, true, true, true, true, true, true],
    afternoon: [true, true, true, true, true, true, true],
  },
  Frodó: {
    morning: [true, true, true, true, true, true, false],
    afternoon: [true, true, true, true, true, false, false],
  },
  Manfréd: {
    morning: [true, true, true, true, true, true, false],
    afternoon: [true, true, true, true, true, false, false],
  },
  Nyugati: {
    morning: [true, true, true, true, true, true, true],
    afternoon: [true, true, true, true, true, true, true],
  },
  Téka: {
    morning: [true, true, true, true, true, true, false],
    afternoon: [true, true, true, true, true, false, false],
  },
  Zarándok: {
    morning: [true, true, true, true, true, true, false],
    afternoon: [false, false, false, false, false, false, false],
  },
};

const days = [
  "Hétfő",
  "Kedd",
  "Szerda",
  "Csütörtök",
  "Péntek",
  "Szombat",
  "Vasárnap",
];

const createInitialSchedule = () => {
  const initialSchedule = {};
  Object.keys(wagons).forEach((wagon) => {
    initialSchedule[wagon] = {};
    days.forEach((day) => {
      initialSchedule[wagon][day] = { morning: "", afternoon: "" };
    });
  });
  return initialSchedule;
};

// Function to sort employees into the schedule
const sortEmployeesIntoSchedule = (schedule, employeesList) => {
  // Shuffle the employees list to introduce randomness
  shuffleArray(employeesList);

  // Track employee assignments to prevent double booking on different wagons the same day
  const employeeAssignments = {};

  // Loop through each employee in the shuffled list
  employeesList.forEach((employee) => {
    const { name, shifts, wagonPreferences, shiftAvailability } = employee;
    let shiftsAssigned = 0;
    const availableShifts = [];

    // Initialize tracking for this employee
    days.forEach((day) => {
      employeeAssignments[day] = [];
    });

    // Create an array of available shifts for the employee
    Object.keys(shiftAvailability).forEach((shiftType) => {
      shiftAvailability[shiftType].forEach((available, index) => {
        if (available) {
          availableShifts.push({ shiftType, index });
        }
      });
    });

    // Shuffle the available shifts for the employee
    shuffleArray(availableShifts);

    // Assign shifts randomly to the employee
    availableShifts.forEach(({ shiftType, index }) => {
      // Find an available slot for the employee in the schedule
      const slot = findAvailableSlot(
        schedule,
        wagonPreferences,
        shiftAvailability,
        shiftType,
        name,
        employeeAssignments
      );

      // If a slot is found and the employee hasn't reached the requested shifts limit, assign the employee to that slot
      if (slot && shiftsAssigned < shifts) {
        schedule[slot.wagon][slot.day][shiftType] = name;
        employeeAssignments[slot.day].push(name);
        shiftsAssigned++;
      }
    });
  });
  return schedule;
};

// Function to fill empty shifts and resolve conflicts
const fillRemainingShifts = (schedule, employeesList) => {
  // Loop through each wagon in the schedule
  Object.keys(schedule).forEach((wagon) => {
    // Loop through each day for the current wagon
    Object.keys(schedule[wagon]).forEach((day) => {
      // Loop through each shift type (morning and afternoon) for the current day and wagon
      Object.keys(schedule[wagon][day]).forEach((shiftType) => {
        // Check if the current shift is empty and if the wagon is open for this shift on this day
        if (
          schedule[wagon][day][shiftType] === "" &&
          wagons[wagon][shiftType][days.indexOf(day)]
        ) {
          // Find an employee who prefers the current wagon and is available during this shift
          const availableEmployees = employeesList.filter((employee) => {
            const { shiftAvailability, wagonPreferences } = employee;
            return (
              wagonPreferences.includes(wagon) &&
              shiftAvailability[shiftType][days.indexOf(day)]
            );
          });

          // If there are available employees, randomly select one and assign them to the shift
          if (availableEmployees.length > 0) {
            const selectedEmployee =
              availableEmployees[
                Math.floor(Math.random() * availableEmployees.length)
              ];
            schedule[wagon][day][shiftType] = selectedEmployee.name;
          }
        }
      });
    });
  });

  console.log("Filled Schedule:", schedule);

  removeDuplicateShifts(schedule, employeesList);

  return schedule;
};

const removeDuplicateShifts = (schedule, employeesList) => {
  // Loop through each employee in the employeesList
  employeesList.forEach((employee) => {
    // Derive the wagon property based on the wagonPreferences array
    employee.wagonPreferences.forEach((wagon) => {
      // Check if the wagon exists in the schedule
      if (schedule[wagon]) {
        // Call findDuplicateShifts for each employee and remove duplicates
        const duplicateShifts = findDuplicateShifts(employee, schedule);
        duplicateShifts.forEach((duplicate) => {
          const { day } = duplicate;
          // Clear the morning shift if it matches the employee
          if (schedule[wagon][day].morning === employee.name) {
            schedule[wagon][day].morning = "";
          }
          // Clear the afternoon shift if it matches the employee
          if (schedule[wagon][day].afternoon === employee.name) {
            schedule[wagon][day].afternoon = "";
          }
        });
      }
    });
  });
  console.log("Schedule after removing duplicate shifts:", schedule);
};

const equalizeShifts = (schedule, employeesList) => {
  const randomNumber = Math.random(); // Generate a random number between 0 and 1

  if (randomNumber < 0.5) {
    // Part 1: Attempt to remove an excess shift
    let changeMade = false;

    for (const employee of employeesList) {
      const { name, shifts } = employee;

      let assignedShifts = 0;
      Object.keys(schedule).forEach((wagon) => {
        Object.keys(schedule[wagon]).forEach((day) => {
          if (schedule[wagon][day].morning === name) {
            assignedShifts++;
          }
          if (schedule[wagon][day].afternoon === name) {
            assignedShifts++;
          }
        });
      });

      if (assignedShifts > shifts) {
        const excessShifts = [];
        Object.keys(schedule).forEach((wagon) => {
          Object.keys(schedule[wagon]).forEach((day) => {
            if (
              (schedule[wagon][day].morning === name &&
                excessShifts.length < assignedShifts - shifts) ||
              (schedule[wagon][day].afternoon === name &&
                excessShifts.length < assignedShifts - shifts)
            ) {
              excessShifts.push({ wagon, day });
            }
          });
        });

        console.log("Excess shifts:", excessShifts);

        // Randomly select an excess shift to remove
        const shiftIndex = Math.floor(Math.random() * excessShifts.length);
        const shiftToRemove = excessShifts[shiftIndex];

        console.log("Shift to remove:", shiftToRemove);

        // Remove the selected excess shift
        const shiftType =
          schedule[shiftToRemove.wagon][shiftToRemove.day].morning === name
            ? "morning"
            : "afternoon";
        schedule[shiftToRemove.wagon][shiftToRemove.day][shiftType] = "";
        console.log(
          `Removed excess shift from ${name} at ${shiftToRemove.wagon} on ${shiftToRemove.day} ${shiftType}`
        );
        changeMade = true;

        // Find an available employee to assign the replacement shift
        const { wagon, day } = shiftToRemove;
        const shiftAvailability = employeesList.map(
          (employee) => employee.shiftAvailability
        );
        const wagonPreferences = employeesList.map(
          (employee) => employee.wagonPreferences
        );
        const availableEmployees = employeesList.filter(
          (employee, index) =>
            wagonPreferences[index].includes(wagon) &&
            shiftAvailability[index][shiftType][days.indexOf(day)] &&
            employee.name !== name // Ensure the replacement shift is not assigned to the same person
        );

        console.log("Available employees for replacement:", availableEmployees);

        // If there are available employees, randomly select one and assign them to the shift
        if (availableEmployees.length > 0) {
          const selectedEmployee =
            availableEmployees[
              Math.floor(Math.random() * availableEmployees.length)
            ];
          schedule[wagon][day][shiftType] = selectedEmployee.name;
          console.log(
            `Reassigned shift to ${selectedEmployee.name} at ${wagon} on ${day} ${shiftType}`
          );

          let conflictResolved = true; // Flag to check if conflicts are resolved

          // Check for duplicate shifts and replace them if necessary
          let duplicateShifts = findDuplicateShifts(selectedEmployee, schedule);
          do {
            console.log("Duplicate shifts:", duplicateShifts);
            if (duplicateShifts.length > 0) {
              conflictResolved = false; // Conflicts are not resolved yet

              duplicateShifts.forEach((duplicate) => {
                const { day } = duplicate;
                const otherWagon = duplicate.wagons
                  .split(",")
                  .find((w) => w !== shiftToRemove.wagon);
                if (schedule[otherWagon] && schedule[otherWagon][day]) {
                  if (
                    schedule[otherWagon][day].morning === selectedEmployee.name
                  ) {
                    console.log(
                      "Cleared morning shift due to conflict:",
                      schedule[otherWagon][day].morning,
                      "on",
                      day,
                      "at",
                      otherWagon
                    );
                    // Assign a new employee to the cleared shift
                    assignEmployeeToShift(
                      employeesList,
                      schedule,
                      otherWagon,
                      day,
                      "morning",
                      schedule[otherWagon][day].morning
                    );
                  }
                  if (
                    schedule[otherWagon][day].afternoon ===
                    selectedEmployee.name
                  ) {
                    console.log(
                      "Cleared afternoon shift due to conflict:",
                      schedule[otherWagon][day].afternoon,
                      "on",
                      day,
                      "at",
                      otherWagon
                    );
                    // Assign a new employee to the cleared shift
                    assignEmployeeToShift(
                      employeesList,
                      schedule,
                      otherWagon,
                      day,
                      "afternoon",
                      schedule[otherWagon][day].afternoon
                    );
                  }
                }
              });

              // Check for duplicate shifts again after reassignment
              duplicateShifts = findDuplicateShifts(selectedEmployee, schedule);
            } else {
              conflictResolved = true; // No conflicts found, exit the loop
            }
          } while (!conflictResolved);
        } else {
          console.log(
            `No available employee found to replace the removed shift at ${wagon} on ${day} ${shiftType}`
          );
        }

        console.log("Equalized shift (excess removed and replaced):", schedule);
        changeMade = true;
        break; // Exit the loop once a change is made
      }
    }

    if (changeMade) {
      return schedule;
    }
  } else {
    let changeMade = false;

    let maxShortfall = -Infinity;
    let employeeMostInNeed = null;

    // Find the employee with the biggest shortfall
    for (const employee of employeesList) {
      const { name, shifts } = employee;
      let assignedShifts = 0;
      Object.keys(schedule).forEach((wagon) => {
        Object.keys(schedule[wagon]).forEach((day) => {
          if (schedule[wagon][day].morning === name) {
            assignedShifts++;
          }
          if (schedule[wagon][day].afternoon === name) {
            assignedShifts++;
          }
        });
      });

      const shortfall = shifts - assignedShifts;
      if (shortfall > maxShortfall) {
        maxShortfall = shortfall;
        employeeMostInNeed = employee;
      }
    }

    if (employeeMostInNeed && maxShortfall > 0) {
      const { name, shiftAvailability, wagonPreferences } = employeeMostInNeed;

      // Attempt to find and reassign a shift
      let assigned = false;
      outerLoop: for (const wagon of wagonPreferences) {
        for (const shiftType of ["morning", "afternoon"]) {
          for (const day of Object.keys(schedule[wagon])) {
            if (
              shiftAvailability[shiftType][
                Object.keys(schedule[wagon]).indexOf(day)
              ] &&
              schedule[wagon][day][shiftType] !== name // ensure we're not taking from the same person
            ) {
              const originalEmployeeName = schedule[wagon][day][shiftType];
              schedule[wagon][day][shiftType] = name;
              console.log(
                `Shift reassigned from ${originalEmployeeName} to ${name} at ${wagon} on ${day} ${shiftType}`
              );
              assigned = true;
              break outerLoop;
            }
          }
        }
      }

      if (assigned) {
        changeMade = true;
        console.log("Equalized shift (shortfall corrected):", schedule);
      } else {
        console.log(
          `No suitable shift found for ${name}. Shift preferences:`,
          shiftAvailability
        );
      }
    }

    if (changeMade) {
      return schedule;
    }
  }

  console.log("No changes were made.");
  return schedule;
};

const findAvailableSlot = (
  schedule,
  wagonPreferences,
  shiftAvailability,
  shiftType,
  employeeName,
  employeeAssignments
) => {
  const availableSlots = [];

  // Loop through each day
  Object.keys(schedule[wagonPreferences[0]]).forEach((day) => {
    // Check if the employee is already booked on this day on a different wagon
    if (
      employeeAssignments[day] &&
      employeeAssignments[day].includes(employeeName)
    ) {
      return; // Skip to the next day if already booked elsewhere
    }

    const dayIndex = getDayIndex(day);

    // Check if the wagon is open for the specified shift on that day
    wagonPreferences.forEach((wagon) => {
      if (wagons[wagon][shiftType][dayIndex]) {
        // Check if the employee is available for the shift on that day
        if (shiftAvailability[shiftType][dayIndex]) {
          // Check if the wagon, day, and shift type are initialized in the schedule and empty
          if (
            schedule[wagon] &&
            schedule[wagon][day] &&
            schedule[wagon][day][shiftType] === ""
          ) {
            availableSlots.push({ wagon, day, shiftType });
          }
        }
      }
    });
  });

  // Return a random available slot, or null if none are available
  return availableSlots.length > 0
    ? availableSlots[Math.floor(Math.random() * availableSlots.length)]
    : null;
};

// Function to shuffle an array using Fisher-Yates algorithm (modern version)
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

//Helper function for both fillSingleShift and for generateNotes in Note.jsx
const findDuplicateShifts = (employee, schedule) => {
  const duplicateShifts = [];

  // Iterate over each day in the schedule
  days.forEach((day) => {
    const duplicateWagons = new Set();

    // Check morning shift
    Object.keys(wagons).forEach((wagon) => {
      if (schedule[wagon][day].morning === employee.name) {
        duplicateWagons.add(wagon);
      }
    });

    // Check afternoon shift
    Object.keys(wagons).forEach((wagon) => {
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

  return duplicateShifts;
};

const assignEmployeeToShift = (
  employeesList,
  schedule,
  wagon,
  day,
  shiftType,
  removedEmployeeName
) => {
  const shiftAvailability = employeesList.map(
    (employee) => employee.shiftAvailability
  );
  const wagonPreferences = employeesList.map(
    (employee) => employee.wagonPreferences
  );

  // Filter available employees, excluding the removed employee
  const availableEmployees = employeesList.filter(
    (employee, index) =>
      wagonPreferences[index].includes(wagon) &&
      shiftAvailability[index][shiftType][days.indexOf(day)] &&
      employee.name !== removedEmployeeName // Exclude the removed employee
  );

  console.log("Available employees for replacement:", availableEmployees);

  if (availableEmployees.length > 0) {
    const selectedEmployee =
      availableEmployees[Math.floor(Math.random() * availableEmployees.length)];
    schedule[wagon][day][shiftType] = selectedEmployee.name;
    console.log(
      `Reassigned shift to ${selectedEmployee.name} at ${wagon} on ${day} ${shiftType}`
    );
  } else {
    console.log(
      `No available employee found to replace the removed shift at ${wagon} on ${day} ${shiftType}`
    );
  }
};

// Helper function to get the index of a day in the week
const getDayIndex = (day) => days.indexOf(day);

export {
  sortEmployeesIntoSchedule,
  fillRemainingShifts,
  createInitialSchedule,
  wagons,
  days,
  findDuplicateShifts,
  equalizeShifts,
  getDayIndex,
};
