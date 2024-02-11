// App.js
import React, { useState, useEffect } from "react";
import ScheduleTable from "./components/ScheduleTable";
import AddEmployeeForm from "./components/AddEmployeeForm";
import { sortEmployeesIntoSchedule } from "./components/scheduleUtils";

const defaultWagons = [
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

const App = () => {
  const [wagons, setWagons] = useState(defaultWagons);
  const [schedule, setSchedule] = useState(createInitialSchedule());
  const [employeesList, setEmployeesList] = useState([]);

  function createInitialSchedule() {
    const initialSchedule = {};
    wagons.forEach((wagon) => {
      initialSchedule[wagon] = {};
      days.forEach((day) => {
        initialSchedule[wagon][day] = { morning: "", afternoon: "" };
      });
    });
    return initialSchedule;
  }

  const handleAddEmployee = (employee) => {
    setEmployeesList([...employeesList, employee]);
  };

  const handleAssignEmployee = (wagon, day, shiftType, employee) => {
    setSchedule((prevSchedule) => {
      const newSchedule = { ...prevSchedule };

      // Ensure the wagon and day are initialized
      if (!newSchedule[wagon]) {
        newSchedule[wagon] = {};
      }
      if (!newSchedule[wagon][day]) {
        newSchedule[wagon][day] = { morning: "", afternoon: "" };
      }

      // Update the employee for the specified shift
      newSchedule[wagon][day][shiftType] = employee;

      console.log("Updated Schedule:", newSchedule); // Log the updated schedule
      return newSchedule;
    });
  };

  const handleSortEmployees = () => {
    const sortedSchedule = sortEmployeesIntoSchedule(
      employeesList,
      wagons,
      schedule
    );
    setSchedule(sortedSchedule);
  };

  useEffect(() => {
    setSchedule(createInitialSchedule());
  }, [wagons]);

  return (
    <div>
      <h1>Workplace Schedule Maker</h1>
      <div style={{ display: "flex" }}>
        <AddEmployeeForm
          onAddEmployee={handleAddEmployee}
          employeesList={employeesList}
          wagons={wagons}
          days={days}
          onSortEmployees={handleSortEmployees}
        />
        <ScheduleTable
          wagons={wagons}
          days={days}
          schedule={schedule}
          employeesList={employeesList}
          onAssignEmployee={handleAssignEmployee}
          onSortEmployees={handleSortEmployees}
        />
      </div>
    </div>
  );
};

export default App;
