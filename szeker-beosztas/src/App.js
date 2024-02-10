// App.js
import React, { useState, useEffect } from "react";
import ScheduleTable from "./components/ScheduleTable";
import AddEmployeeForm from "./components/AddEmployeeForm";

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

const App = () => {
  const [wagons, setWagons] = useState(defaultWagons);
  const [schedule, setSchedule] = useState(createInitialSchedule());
  const [employeesList, setEmployeesList] = useState([]);

  function createInitialSchedule() {
    const initialSchedule = {};
    wagons.forEach((wagon) => {
      initialSchedule[wagon] = {
        Monday: { morning: "", afternoon: "" },
        Tuesday: { morning: "", afternoon: "" },
        Wednesday: { morning: "", afternoon: "" },
        Thursday: { morning: "", afternoon: "" },
        Friday: { morning: "", afternoon: "" },
        Saturday: { morning: "", afternoon: "" },
        Sunday: { morning: "", afternoon: "" },
      };
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
        />
        <ScheduleTable
          wagons={wagons}
          schedule={schedule}
          employeesList={employeesList}
          onAssignEmployee={handleAssignEmployee}
        />
      </div>
    </div>
  );
};

export default App;
