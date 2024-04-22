const testEmployeesList = [
  {
    name: "Béla",
    shifts: 4,
    wagonPreferences: ["Dávid", "Bethlen", "Désiré"],
    shiftAvailability: {
      morning: [true, true, false, false, true, false, false],
      afternoon: [true, true, true, true, false, true, false],
    },
  },
  {
    name: "Károly",
    shifts: 3,
    wagonPreferences: ["Csehov", "Frodó", "Nyugati"],
    shiftAvailability: {
      morning: [true, true, false, false, true, false, false],
      afternoon: [true, true, false, true, false, false, false],
    },
  },
  {
    name: "László",
    shifts: 5,
    wagonPreferences: ["Zarándok", "Désiré"],
    shiftAvailability: {
      morning: [true, true, true, true, false, true, false],
      afternoon: [true, true, false, false, true, true, false],
    },
  },
  {
    name: "Márta",
    shifts: 6,
    wagonPreferences: ["Manfréd", "Nyugati"],
    shiftAvailability: {
      morning: [true, true, false, false, true, false, false],
      afternoon: [true, true, true, true, true, false, false],
    },
  },
  {
    name: "Géza",
    shifts: 2,
    wagonPreferences: ["Dávid", "Téka", "Nyugati"],
    shiftAvailability: {
      morning: [true, true, true, true, false, false, false],
      afternoon: [false, false, false, true, true, true, false],
    },
  },
  {
    name: "Irén",
    shifts: 4,
    wagonPreferences: ["Bethlen", "Csehov", "Désiré"],
    shiftAvailability: {
      morning: [true, true, false, false, true, false, false],
      afternoon: [true, false, true, true, false, false, false],
    },
  },
  {
    name: "Zoltán",
    shifts: 3,
    wagonPreferences: ["Frodó", "Zarándok"],
    shiftAvailability: {
      morning: [true, true, false, false, true, false, false],
      afternoon: [true, false, false, false, true, true, false],
    },
  },
  {
    name: "Györgyi",
    shifts: 5,
    wagonPreferences: ["Abigél", "Manfréd", "Désiré"],
    shiftAvailability: {
      morning: [true, true, false, false, true, false, false],
      afternoon: [true, true, true, false, false, true, false],
    },
  },
  {
    name: "Ferenc",
    shifts: 4,
    wagonPreferences: ["Dávid", "Bethlen"],
    shiftAvailability: {
      morning: [true, true, false, false, true, false, false],
      afternoon: [true, true, true, true, false, false, false],
    },
  },
  {
    name: "Ildikó",
    shifts: 6,
    wagonPreferences: ["Csehov", "Frodó"],
    shiftAvailability: {
      morning: [true, true, true, false, false, true, false],
      afternoon: [true, true, true, false, true, true, false],
    },
  },
  {
    name: "János",
    shifts: 2,
    wagonPreferences: ["Zarándok", "Abigél"],
    shiftAvailability: {
      morning: [true, true, true, true, true, false, false],
      afternoon: [true, true, false, false, true, false, false],
    },
  },
  {
    name: "Réka",
    shifts: 5,
    wagonPreferences: ["Manfréd", "Désiré"],
    shiftAvailability: {
      morning: [true, true, false, false, true, false, false],
      afternoon: [true, true, true, false, true, false, false],
    },
  },
  {
    name: "Barnabás",
    shifts: 3,
    wagonPreferences: ["Dávid", "Téka", "Nyugati"],
    shiftAvailability: {
      morning: [true, true, false, false, true, false, false],
      afternoon: [true, true, false, false, true, false, false],
    },
  },
  {
    name: "Enikő",
    shifts: 4,
    wagonPreferences: ["Bethlen", "Nyugati"],
    shiftAvailability: {
      morning: [true, true, false, false, true, false, false],
      afternoon: [true, true, false, false, true, false, false],
    },
  },
  {
    name: "Miklós",
    shifts: 2,
    wagonPreferences: ["Frodó", "Désiré"],
    shiftAvailability: {
      morning: [true, true, false, false, true, false, false],
      afternoon: [true, true, false, false, true, false, false],
    },
  },
  {
    name: "Zsuzsa",
    shifts: 5,
    wagonPreferences: ["Abigél", "Manfréd"],
    shiftAvailability: {
      morning: [true, true, false, false, true, false, false],
      afternoon: [true, true, false, false, true, false, false],
    },
  },
  {
    name: "András",
    shifts: 4,
    wagonPreferences: ["Dávid", "Bethlen"],
    shiftAvailability: {
      morning: [true, true, false, false, true, false, false],
      afternoon: [true, true, false, false, true, false, false],
    },
  },
  {
    name: "Mária",
    shifts: 5,
    wagonPreferences: ["Bethlen", "Csehov"],
    shiftAvailability: {
      morning: [true, true, true, false, true, true, true],
      afternoon: [true, true, true, false, true, true, true],
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
    wagonPreferences: ["Frodó", "Zarándok"],
    shiftAvailability: {
      morning: [true, true, true, true, true, true, true],
      afternoon: [true, true, true, true, true, true, true],
    },
  },
  {
    name: "Gábor",
    shifts: 3,
    wagonPreferences: ["Abigél", "Manfréd"],
    shiftAvailability: {
      morning: [true, true, true, false, true, false, true],
      afternoon: [true, true, true, false, true, false, true],
    },
  },
  {
    name: "Anna",
    shifts: 4,
    wagonPreferences: ["Dávid", "Téka"],
    shiftAvailability: {
      morning: [true, true, true, false, true, true, true],
      afternoon: [true, true, true, false, true, true, true],
    },
  },
  {
    name: "Péter",
    shifts: 5,
    wagonPreferences: ["Bethlen", "Csehov", "Désiré"],
    shiftAvailability: {
      morning: [true, true, true, false, true, true, true],
      afternoon: [true, true, true, false, true, true, true],
    },
  },
  {
    name: "Judit",
    shifts: 6,
    wagonPreferences: ["Frodó", "Zarándok"],
    shiftAvailability: {
      morning: [true, true, true, false, true, true, true],
      afternoon: [true, true, true, false, true, true, true],
    },
  },
  {
    name: "Tamás",
    shifts: 3,
    wagonPreferences: ["Abigél", "Manfréd"],
    shiftAvailability: {
      morning: [true, true, true, false, true, true, true],
      afternoon: [true, true, true, false, true, true, true],
    },
  },
  {
    name: "Ibolya",
    shifts: 4,
    wagonPreferences: ["Dávid", "Désiré", "Nyugati"],
    shiftAvailability: {
      morning: [true, true, true, false, true, true, true],
      afternoon: [true, true, true, false, true, true, true],
    },
  },
  {
    name: "Lajos",
    shifts: 5,
    wagonPreferences: ["Bethlen", "Csehov", "Nyugati"],
    shiftAvailability: {
      morning: [true, true, true, false, true, true, true],
      afternoon: [true, true, true, false, true, true, true],
    },
  },
];

export default testEmployeesList;
