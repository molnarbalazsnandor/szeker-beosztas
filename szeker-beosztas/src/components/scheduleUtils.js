// scheduleUtils.js

// Function to sort employees into the schedule
const sortEmployeesIntoSchedule = (schedule, employeesList) => {
  // Loop through each employee in the list
  employeesList.forEach((employee) => {
    const { name, shifts, wagonPreferences, shiftAvailability } = employee;

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

        // If a slot is found, assign the employee to that slot
        if (slot) {
          schedule[slot.wagon][slot.day][shiftType] = name;
        } else {
          // If no slot is found, break the loop
          break;
        }
      }
    });
  });

  return schedule;
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
const getDayIndex = (day) =>
  [
    "Hétfő",
    "Kedd",
    "Szerda",
    "Csütörtök",
    "Péntek",
    "Szombat",
    "Vasárnap",
  ].indexOf(day);

export { sortEmployeesIntoSchedule };
