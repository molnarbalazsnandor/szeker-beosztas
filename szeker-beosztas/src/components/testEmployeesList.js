const testEmployeesList = [
  {
    name: "Béla",
    shifts: 4,
    wagonPreferences: ["Dávid", "Bethlen", "Corvina"],
    shiftAvailability: {
      morning: [true, true, true, true, true, false, false],
      afternoon: [true, true, true, true, true, false, false],
    },
  },
  {
    name: "Károly",
    shifts: 3,
    wagonPreferences: ["Csehov", "Frodó", "Nyugati"],
    shiftAvailability: {
      morning: [true, true, true, true, true, false, false],
      afternoon: [true, true, true, false, false, false, false],
    },
  },
  {
    name: "László",
    shifts: 5,
    wagonPreferences: ["Zarándok", "Désiré", "Antoine"],
    shiftAvailability: {
      morning: [true, true, true, true, true, false, false],
      afternoon: [true, true, true, true, true, false, false],
    },
  },
  {
    name: "Márta",
    shifts: 6,
    wagonPreferences: ["Manfréd", "Nyugati", "Abigél"],
    shiftAvailability: {
      morning: [true, true, true, true, true, true, false],
      afternoon: [true, true, true, true, true, true, false],
    },
  },
  {
    name: "Géza",
    shifts: 2,
    wagonPreferences: ["Dávid", "Téka", "Frodó"],
    shiftAvailability: {
      morning: [true, true, true, true, true, false, false],
      afternoon: [true, true, false, false, false, false, false],
    },
  },
  {
    name: "Irén",
    shifts: 4,
    wagonPreferences: ["Bethlen", "Csehov", "Désiré"],
    shiftAvailability: {
      morning: [true, true, true, true, true, false, false],
      afternoon: [true, true, true, false, false, false, false],
    },
  },
  {
    name: "Zoltán",
    shifts: 3,
    wagonPreferences: ["Frodó", "Zarándok", "Corvina"],
    shiftAvailability: {
      morning: [true, true, true, true, true, false, false],
      afternoon: [true, true, false, false, false, false, false],
    },
  },
  {
    name: "Györgyi",
    shifts: 5,
    wagonPreferences: ["Abigél", "Manfréd", "Téka"],
    shiftAvailability: {
      morning: [true, true, true, true, true, false, false],
      afternoon: [true, true, true, true, true, false, false],
    },
  },
  {
    name: "Ferenc",
    shifts: 4,
    wagonPreferences: ["Dávid", "Bethlen", "Corvina"],
    shiftAvailability: {
      morning: [true, true, true, true, true, false, false],
      afternoon: [true, true, true, true, false, false, false],
    },
  },
  {
    name: "Ildikó",
    shifts: 6,
    wagonPreferences: ["Csehov", "Frodó", "Manfréd"],
    shiftAvailability: {
      morning: [true, true, true, true, true, true, false],
      afternoon: [true, true, true, true, true, true, false],
    },
  },
  {
    name: "János",
    shifts: 2,
    wagonPreferences: ["Zarándok", "Abigél", "Antoine"],
    shiftAvailability: {
      morning: [true, true, true, true, true, false, false],
      afternoon: [true, true, true, false, false, false, false],
    },
  },
  {
    name: "Réka",
    shifts: 5,
    wagonPreferences: ["Manfréd", "Désiré", "Corvina"],
    shiftAvailability: {
      morning: [true, true, true, true, true, false, false],
      afternoon: [true, true, true, true, true, false, false],
    },
  },
  {
    name: "Barnabás",
    shifts: 3,
    wagonPreferences: ["Dávid", "Téka", "Nyugati"],
    shiftAvailability: {
      morning: [true, true, true, true, true, false, false],
      afternoon: [true, true, true, true, true, false, false],
    },
  },
  {
    name: "Enikő",
    shifts: 4,
    wagonPreferences: ["Bethlen", "Nyugati", "Antoine"],
    shiftAvailability: {
      morning: [true, true, true, true, true, false, false],
      afternoon: [true, true, true, true, true, false, false],
    },
  },
  {
    name: "Miklós",
    shifts: 2,
    wagonPreferences: ["Frodó", "Désiré", "Téka"],
    shiftAvailability: {
      morning: [true, true, true, true, true, false, false],
      afternoon: [true, true, true, true, true, false, false],
    },
  },
  {
    name: "Zsuzsa",
    shifts: 5,
    wagonPreferences: ["Abigél", "Manfréd", "Corvina"],
    shiftAvailability: {
      morning: [true, true, true, true, true, false, false],
      afternoon: [true, true, true, true, true, false, false],
    },
  },
  {
    name: "András",
    shifts: 4,
    wagonPreferences: ["Dávid", "Bethlen", "Frodó"],
    shiftAvailability: {
      morning: [true, true, true, true, true, false, false],
      afternoon: [true, true, true, true, true, false, false],
    },
  },
  {
    name: "Mária",
    shifts: 5,
    wagonPreferences: ["Bethlen", "Csehov", "Corvina"],
    shiftAvailability: {
      morning: [true, true, true, true, true, true, true],
      afternoon: [true, true, true, true, true, true, true],
    },
  },
  {
    name: "Özséb",
    shifts: 4,
    wagonPreferences: ["Dávid", "Bethlen", "Nyugati"],
    shiftAvailability: {
      morning: [true, true, true, true, true, true, true],
      afternoon: [true, true, true, true, true, true, true],
    },
  },
  {
    name: "Ágnes",
    shifts: 6,
    wagonPreferences: ["Frodó", "Zarándok", "Antoine"],
    shiftAvailability: {
      morning: [true, true, true, true, true, true, true],
      afternoon: [true, true, true, true, true, true, true],
    },
  },
  {
    name: "Gábor",
    shifts: 3,
    wagonPreferences: ["Abigél", "Manfréd", "Corvina"],
    shiftAvailability: {
      morning: [true, true, true, true, true, true, true],
      afternoon: [true, true, true, true, true, true, true],
    },
  },
  {
    name: "Anna",
    shifts: 4,
    wagonPreferences: ["Dávid", "Téka", "Bethlen"],
    shiftAvailability: {
      morning: [true, true, true, true, true, true, true],
      afternoon: [true, true, true, true, true, true, true],
    },
  },
  {
    name: "Péter",
    shifts: 5,
    wagonPreferences: ["Bethlen", "Csehov", "Désiré"],
    shiftAvailability: {
      morning: [true, true, true, true, true, true, true],
      afternoon: [true, true, true, true, true, true, true],
    },
  },
  {
    name: "Judit",
    shifts: 6,
    wagonPreferences: ["Frodó", "Zarándok", "Antoine"],
    shiftAvailability: {
      morning: [true, true, true, true, true, true, true],
      afternoon: [true, true, true, true, true, true, true],
    },
  },
  {
    name: "Tamás",
    shifts: 3,
    wagonPreferences: ["Abigél", "Manfréd", "Nyugati"],
    shiftAvailability: {
      morning: [true, true, true, true, true, true, true],
      afternoon: [true, true, true, true, true, true, true],
    },
  },
  {
    name: "Ibolya",
    shifts: 4,
    wagonPreferences: ["Dávid", "Téka", "Frodó"],
    shiftAvailability: {
      morning: [true, true, true, true, true, true, true],
      afternoon: [true, true, true, true, true, true, true],
    },
  },
  {
    name: "Erika",
    shifts: 5,
    wagonPreferences: ["Antoine", "Zarándok", "Nyugati"],
    shiftAvailability: {
      morning: [true, true, true, true, true, false, false],
      afternoon: [true, true, true, true, true, false, false],
    },
  },
  {
    name: "István",
    shifts: 4,
    wagonPreferences: ["Désiré", "Corvina", "Téka"],
    shiftAvailability: {
      morning: [true, true, true, true, true, true, false],
      afternoon: [true, true, true, false, false, false, false],
    },
  },
  {
    name: "Anikó",
    shifts: 3,
    wagonPreferences: ["Abigél", "Manfréd", "Dávid"],
    shiftAvailability: {
      morning: [true, true, true, true, false, false, false],
      afternoon: [true, true, true, true, false, false, false],
    },
  },
  {
    name: "Bence",
    shifts: 6,
    wagonPreferences: ["Bethlen", "Csehov", "Antoine"],
    shiftAvailability: {
      morning: [true, true, true, true, true, true, false],
      afternoon: [true, true, true, true, true, true, false],
    },
  },
  {
    name: "Lilla",
    shifts: 4,
    wagonPreferences: ["Frodó", "Manfréd", "Corvina"],
    shiftAvailability: {
      morning: [true, true, true, true, false, false, false],
      afternoon: [true, true, true, true, true, false, false],
    },
  },
  {
    name: "Sándor",
    shifts: 5,
    wagonPreferences: ["Nyugati", "Dávid", "Zarándok"],
    shiftAvailability: {
      morning: [true, true, true, true, true, true, false],
      afternoon: [true, true, true, true, true, false, false],
    },
  },
  {
    name: "Gina",
    shifts: 3,
    wagonPreferences: ["Csehov", "Désiré", "Abigél"],
    shiftAvailability: {
      morning: [true, true, true, true, false, false, false],
      afternoon: [true, true, true, true, false, false, false],
    },
  },
  {
    name: "Róbert",
    shifts: 4,
    wagonPreferences: ["Manfréd", "Zarándok", "Antoine"],
    shiftAvailability: {
      morning: [true, true, true, true, true, false, false],
      afternoon: [true, true, true, true, true, false, false],
    },
  },
];
export default testEmployeesList;
