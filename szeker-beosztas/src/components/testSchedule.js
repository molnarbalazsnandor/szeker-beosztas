const testSchedule = {
  Abigél: {
    Hétfő: {
      morning: {
        employee: "Sz Fanni",
        isFixed: false,
      },
      afternoon: {
        employee: "Jámbor Csillag",
        isFixed: false,
      },
    },
    Kedd: {
      morning: {
        employee: "Sz Fanni",
        isFixed: false,
      },
      afternoon: {
        employee: "Jámbor Csillag",
        isFixed: false,
      },
    },
    Szerda: {
      morning: {
        employee: "Jámbor Csillag",
        isFixed: false,
      },
      afternoon: {
        employee: "Farkas György",
        isFixed: false,
      },
    },
    Csütörtök: {
      morning: {
        employee: "Molnár Balázs",
        isFixed: false,
      },
      afternoon: {
        employee: "Jámbor Csillag",
        isFixed: false,
      },
    },
    Péntek: {
      morning: {
        employee: "Farkas György",
        isFixed: false,
      },
      afternoon: {
        employee: "Molnár Marci",
        isFixed: false,
      },
    },
    Szombat: {
      morning: {
        employee: "Sz Fanni",
        isFixed: false,
      },
      afternoon: {
        employee: "Molnár Marci",
        isFixed: false,
      },
    },
    Vasárnap: {
      morning: "",
      afternoon: "",
    },
  },
  Antoine: {
    Hétfő: {
      morning: {
        employee: "Margulius Vanessza",
        isFixed: true,
      },
      afternoon: {
        employee: "Burai János",
        isFixed: false,
      },
    },
    Kedd: {
      morning: {
        employee: "Margulius Vanessza",
        isFixed: true,
      },
      afternoon: {
        employee: "Burai János",
        isFixed: false,
      },
    },
    Szerda: {
      morning: {
        employee: "Margulius Vanessza",
        isFixed: true,
      },
      afternoon: {
        employee: "Burai János",
        isFixed: false,
      },
    },
    Csütörtök: {
      morning: {
        employee: "Margulius Vanessza",
        isFixed: true,
      },
      afternoon: {
        employee: "Burai János",
        isFixed: false,
      },
    },
    Péntek: {
      morning: {
        employee: "Kocsis Nóra",
        isFixed: true,
      },
      afternoon: {
        employee: "Burai János",
        isFixed: false,
      },
    },
    Szombat: {
      morning: {
        employee: "",
        isFixed: false,
      },
      afternoon: {
        employee: "Burai János",
        isFixed: false,
      },
    },
    Vasárnap: {
      morning: "",
      afternoon: "",
    },
  },
  Bethlen: {
    Hétfő: {
      morning: {
        employee: "Lőrincz Gyöngy",
        isFixed: true,
      },
      afternoon: {
        employee: "Liskány Laura",
        isFixed: false,
      },
    },
    Kedd: {
      morning: {
        employee: "Mackó Orsi",
        isFixed: true,
      },
      afternoon: {
        employee: "Lőrincz Gyöngy",
        isFixed: true,
      },
    },
    Szerda: {
      morning: {
        employee: "Farkas András",
        isFixed: true,
      },
      afternoon: {
        employee: "Farkas András",
        isFixed: false,
      },
    },
    Csütörtök: {
      morning: {
        employee: "Mackó Orsi",
        isFixed: true,
      },
      afternoon: {
        employee: "Lőrincz Gyöngy",
        isFixed: true,
      },
    },
    Péntek: {
      morning: {
        employee: "Gaál Teo",
        isFixed: true,
      },
      afternoon: {
        employee: "Balogh Ricsi",
        isFixed: true,
      },
    },
    Szombat: {
      morning: {
        employee: "Lőrincz Gyöngy",
        isFixed: true,
      },
      afternoon: {
        employee: "Mackó Orsi",
        isFixed: true,
      },
    },
    Vasárnap: {
      morning: {
        employee: "Farkas András",
        isFixed: false,
      },
      afternoon: {
        employee: "Várhegyi Armand",
        isFixed: true,
      },
    },
  },
  Corvina: {
    Hétfő: {
      morning: {
        employee: "Margulius Dávid",
        isFixed: true,
      },
      afternoon: {
        employee: "Margulius Dávid",
        isFixed: true,
      },
    },
    Kedd: {
      morning: {
        employee: "Péchy Tomi",
        isFixed: true,
      },
      afternoon: {
        employee: "Sipos Laura",
        isFixed: true,
      },
    },
    Szerda: {
      morning: {
        employee: "Péchy Tomi",
        isFixed: true,
      },
      afternoon: {
        employee: "Sipos Laura",
        isFixed: true,
      },
    },
    Csütörtök: {
      morning: {
        employee: "Péchy Tomi",
        isFixed: true,
      },
      afternoon: {
        employee: "Sipos Laura",
        isFixed: true,
      },
    },
    Péntek: {
      morning: {
        employee: "Margulius Dávid",
        isFixed: false,
      },
      afternoon: {
        employee: "Péchy Tomi",
        isFixed: false,
      },
    },
    Szombat: {
      morning: {
        employee: "Sipos Laura",
        isFixed: true,
      },
      afternoon: {
        employee: "Péchy Tomi",
        isFixed: true,
      },
    },
    Vasárnap: {
      morning: {
        employee: "Sipos Laura",
        isFixed: true,
      },
      afternoon: {
        employee: "Margulius Dávid",
        isFixed: true,
      },
    },
  },
  Csehov: {
    Hétfő: {
      morning: {
        employee: "Zsemberi Zsófia",
        isFixed: true,
      },
      afternoon: {
        employee: "Bencsik Szabina",
        isFixed: true,
      },
    },
    Kedd: {
      morning: {
        employee: "Zsemberi Zsófia",
        isFixed: true,
      },
      afternoon: {
        employee: "Lerch Áhim",
        isFixed: false,
      },
    },
    Szerda: {
      morning: {
        employee: "Tichov Iza",
        isFixed: true,
      },
      afternoon: {
        employee: "Imre Lukács",
        isFixed: true,
      },
    },
    Csütörtök: {
      morning: {
        employee: "Zsemberi Zsófia",
        isFixed: true,
      },
      afternoon: {
        employee: "Csányi Viktor",
        isFixed: false,
      },
    },
    Péntek: {
      morning: {
        employee: "Zsemberi Zsófia",
        isFixed: true,
      },
      afternoon: {
        employee: "Bujdosó Áron",
        isFixed: true,
      },
    },
    Szombat: {
      morning: {
        employee: "Bujdosó Áron",
        isFixed: true,
      },
      afternoon: {
        employee: "Zsemberi Zsófia",
        isFixed: true,
      },
    },
    Vasárnap: {
      morning: {
        employee: "Hásás Levente",
        isFixed: true,
      },
      afternoon: {
        employee: "Tichov Iza",
        isFixed: true,
      },
    },
  },
  Dávid: {
    Hétfő: {
      morning: {
        employee: "Valkócz Réka",
        isFixed: true,
      },
      afternoon: {
        employee: "Valkócz Réka",
        isFixed: true,
      },
    },
    Kedd: {
      morning: {
        employee: "Bota Henriette",
        isFixed: true,
      },
      afternoon: {
        employee: "Bota Heni",
        isFixed: true,
      },
    },
    Szerda: {
      morning: {
        employee: "Bota Henriette",
        isFixed: true,
      },
      afternoon: {
        employee: "Molnár Balázs",
        isFixed: true,
      },
    },
    Csütörtök: {
      morning: {
        employee: "Bota Henriette",
        isFixed: true,
      },
      afternoon: {
        employee: "Valkócz Réka",
        isFixed: true,
      },
    },
    Péntek: {
      morning: {
        employee: "Bota Henriette",
        isFixed: true,
      },
      afternoon: {
        employee: "Valkócz Réka",
        isFixed: true,
      },
    },
    Szombat: {
      morning: {
        employee: "Bota Henriette",
        isFixed: true,
      },
      afternoon: {
        employee: "Bota Heni",
        isFixed: true,
      },
    },
    Vasárnap: {
      morning: {
        employee: "Juranits Anna",
        isFixed: true,
      },
      afternoon: {
        employee: "Balogh Ricsi",
        isFixed: true,
      },
    },
  },
  Désiré: {
    Hétfő: {
      morning: {
        employee: "Lantos Jonatán",
        isFixed: true,
      },
      afternoon: {
        employee: "Drabik Anett",
        isFixed: true,
      },
    },
    Kedd: {
      morning: {
        employee: "Bunász Éva",
        isFixed: true,
      },
      afternoon: {
        employee: "András Nóri",
        isFixed: true,
      },
    },
    Szerda: {
      morning: {
        employee: "Lantos Jonatán",
        isFixed: true,
      },
      afternoon: {
        employee: "Bunász Éva",
        isFixed: true,
      },
    },
    Csütörtök: {
      morning: {
        employee: "András Nóri",
        isFixed: true,
      },
      afternoon: {
        employee: "Bunász Éva",
        isFixed: true,
      },
    },
    Péntek: {
      morning: {
        employee: "Bunász Éva",
        isFixed: true,
      },
      afternoon: {
        employee: "",
        isFixed: false,
      },
    },
    Szombat: {
      morning: {
        employee: "Drabik Anett",
        isFixed: true,
      },
      afternoon: {
        employee: "Same Adriána",
        isFixed: true,
      },
    },
    Vasárnap: {
      morning: {
        employee: "Bunász Éva",
        isFixed: true,
      },
      afternoon: {
        employee: "Gaál Teodóra",
        isFixed: true,
      },
    },
  },
  Frodó: {
    Hétfő: {
      morning: {
        employee: "Juranits Anna",
        isFixed: true,
      },
      afternoon: {
        employee: "Lerch Áhim",
        isFixed: true,
      },
    },
    Kedd: {
      morning: {
        employee: "Juranits Anna",
        isFixed: true,
      },
      afternoon: {
        employee: "Mohácsi Lajos",
        isFixed: true,
      },
    },
    Szerda: {
      morning: {
        employee: "Juranits Anna",
        isFixed: true,
      },
      afternoon: {
        employee: "Sz Fanni",
        isFixed: true,
      },
    },
    Csütörtök: {
      morning: {
        employee: "Hásás Levente",
        isFixed: false,
      },
      afternoon: {
        employee: "Juranits Anna",
        isFixed: true,
      },
    },
    Péntek: {
      morning: {
        employee: "Liskány Laura",
        isFixed: true,
      },
      afternoon: {
        employee: "Benkő Bence",
        isFixed: true,
      },
    },
    Szombat: {
      morning: {
        employee: "Benkő Bence",
        isFixed: true,
      },
      afternoon: "",
    },
    Vasárnap: {
      morning: "",
      afternoon: "",
    },
  },
  Manfréd: {
    Hétfő: {
      morning: {
        employee: "Berki Szofi",
        isFixed: true,
      },
      afternoon: {
        employee: "Berki Szofi",
        isFixed: true,
      },
    },
    Kedd: {
      morning: {
        employee: "Lerch Áhim",
        isFixed: true,
      },
      afternoon: {
        employee: "Palotai György",
        isFixed: true,
      },
    },
    Szerda: {
      morning: {
        employee: "Berki Szofi",
        isFixed: true,
      },
      afternoon: {
        employee: "Berki Szofi",
        isFixed: true,
      },
    },
    Csütörtök: {
      morning: {
        employee: "Farkas András",
        isFixed: true,
      },
      afternoon: {
        employee: "Farkas András",
        isFixed: true,
      },
    },
    Péntek: {
      morning: {
        employee: "Palotai György",
        isFixed: true,
      },
      afternoon: {
        employee: "Berki Szofi",
        isFixed: true,
      },
    },
    Szombat: {
      morning: {
        employee: "Berki Szofi",
        isFixed: true,
      },
      afternoon: {
        employee: "Palotai György",
        isFixed: true,
      },
    },
    Vasárnap: {
      morning: "",
      afternoon: "",
    },
  },
  Nyugati: {
    Hétfő: {
      morning: {
        employee: "Rábaközi Gergő",
        isFixed: true,
      },
      afternoon: {
        employee: "Imre Lukács",
        isFixed: true,
      },
    },
    Kedd: {
      morning: {
        employee: "Bujdosó Áron",
        isFixed: true,
      },
      afternoon: {
        employee: "Bujdosó Áron",
        isFixed: true,
      },
    },
    Szerda: {
      morning: {
        employee: "Rábaközi Gergő",
        isFixed: true,
      },
      afternoon: {
        employee: "Bujdosó Áron",
        isFixed: true,
      },
    },
    Csütörtök: {
      morning: {
        employee: "Szücs Márton",
        isFixed: false,
      },
      afternoon: {
        employee: "Farkas András",
        isFixed: false,
      },
    },
    Péntek: {
      morning: {
        employee: "Rábaközi Gergő",
        isFixed: true,
      },
      afternoon: {
        employee: "Imre Lukács",
        isFixed: true,
      },
    },
    Szombat: {
      morning: {
        employee: "Rábaközi Gergő",
        isFixed: true,
      },
      afternoon: {
        employee: "Rábaközi Gergő",
        isFixed: true,
      },
    },
    Vasárnap: {
      morning: {
        employee: "Szücs Márton",
        isFixed: false,
      },
      afternoon: {
        employee: "Budai János",
        isFixed: true,
      },
    },
  },
  Téka: {
    Hétfő: {
      morning: {
        employee: "Joe",
        isFixed: true,
      },
      afternoon: {
        employee: "Pupi",
        isFixed: true,
      },
    },
    Kedd: {
      morning: {
        employee: "Joe",
        isFixed: true,
      },
      afternoon: {
        employee: "Pupi",
        isFixed: true,
      },
    },
    Szerda: {
      morning: {
        employee: "Joe",
        isFixed: true,
      },
      afternoon: {
        employee: "Pupi",
        isFixed: true,
      },
    },
    Csütörtök: {
      morning: {
        employee: "Joe",
        isFixed: true,
      },
      afternoon: {
        employee: "Pupi",
        isFixed: true,
      },
    },
    Péntek: {
      morning: {
        employee: "Joe",
        isFixed: true,
      },
      afternoon: {
        employee: "Pupi",
        isFixed: true,
      },
    },
    Szombat: {
      morning: {
        employee: "Joe",
        isFixed: true,
      },
      afternoon: "",
    },
    Vasárnap: {
      morning: "",
      afternoon: "",
    },
  },
  Zarándok: {
    Hétfő: {
      morning: {
        employee: "Bodor Balázs",
        isFixed: true,
      },
      afternoon: "",
    },
    Kedd: {
      morning: {
        employee: "Kiss Boglárka",
        isFixed: true,
      },
      afternoon: "",
    },
    Szerda: {
      morning: {
        employee: "Kiss Boglárka",
        isFixed: true,
      },
      afternoon: "",
    },
    Csütörtök: {
      morning: {
        employee: "Bodor Balázs",
        isFixed: true,
      },
      afternoon: "",
    },
    Péntek: {
      morning: {
        employee: "Kiss Boglárka",
        isFixed: true,
      },
      afternoon: "",
    },
    Szombat: {
      morning: {
        employee: "Kiss Boglárka",
        isFixed: true,
      },
      afternoon: "",
    },
    Vasárnap: {
      morning: "",
      afternoon: "",
    },
  },
};

export default testSchedule;
