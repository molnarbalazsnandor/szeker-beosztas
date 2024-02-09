import React, { useState } from "react";
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

  function createInitialSchedule() {
    // Create an initial schedule with empty shifts
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
    setWagons([...wagons, employee]);
    setSchedule({
      ...schedule,
      [employee]: createInitialSchedule()[employee],
    });
  };

  return (
    <div>
      <h1>Workplace Schedule Maker</h1>
      <div style={{ display: "flex" }}>
        <AddEmployeeForm onAddEmployee={handleAddEmployee} />
        <ScheduleTable wagons={wagons} schedule={schedule} />
      </div>
    </div>
  );
};

export default App;
