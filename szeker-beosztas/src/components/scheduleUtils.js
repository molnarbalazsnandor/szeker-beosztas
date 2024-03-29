const wagons = [
  "Dávid",
  "Bethlen",
  "Téka",
  "Csehov",
  "Frodó",
  "Zarándok",
  "Abigél",
  "Manfréd",
];

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
  wagons.forEach((wagon) => {
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

  // Loop through each employee in the shuffled list
  employeesList.forEach((employee) => {
    const { name, shifts, wagonPreferences, shiftAvailability } = employee;
    let shiftsAssigned = 0;

    // Loop through each shift type (morning, afternoon)
    Object.keys(shiftAvailability).forEach((shiftType) => {
      // Loop through the number of shifts requested by the employee
      for (let i = 0; i < shifts; i++) {
        // Find an available slot for the employee in the schedule
        const slot = findAvailableSlot(
          schedule,
          wagonPreferences,
          shiftAvailability,
          shiftType
        );

        // If a slot is found and the employee hasn't reached the requested shifts limit, assign the employee to that slot
        if (slot && shiftsAssigned < shifts) {
          schedule[slot.wagon][slot.day][shiftType] = name;
          shiftsAssigned++;
        } else {
          // If no slot is found or the employee has reached the requested shifts limit, break the loop
          break;
        }
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

// Helper function to find an available slot in the schedule
const findAvailableSlot = (
  schedule,
  wagonPreferences,
  shiftAvailability,
  shiftType
) => {
  const availableSlots = [];

  // Loop through each day
  Object.keys(schedule[wagonPreferences[0]]).forEach((day) => {
    // Check if the employee is available for the shift on that day
    if (shiftAvailability[shiftType][getDayIndex(day)]) {
      for (let i = 0; i < wagonPreferences.length; i++) {
        const wagon = wagonPreferences[i];

        // Check if the wagon, day, and shift type are initialized in the schedule
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

  // Return a random available slot, or null if none are available
  return availableSlots.length > 0
    ? availableSlots[Math.floor(Math.random() * availableSlots.length)]
    : null;
};

// Helper function to get the index of a day in the week
const getDayIndex = (day) => days.indexOf(day);

export { sortEmployeesIntoSchedule, createInitialSchedule, wagons, days };
