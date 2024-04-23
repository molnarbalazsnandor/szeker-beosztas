const wagons = {
  Abigél: {
    morning: [true, true, true, true, true, false, false],
    afternoon: [true, true, true, true, true, false, false],
  },
  Bethlen: {
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
  Csehov: {
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
// Function to shuffle an array using Fisher-Yates algorithm (modern version)
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
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

// Helper function to get the index of a day in the week
const getDayIndex = (day) => days.indexOf(day);

export { sortEmployeesIntoSchedule, createInitialSchedule, wagons, days };
