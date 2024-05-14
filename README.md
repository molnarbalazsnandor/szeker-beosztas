Documentation

Background

This is a schedule generator written for internal use for the Könyvmentők Kulturális Egyesület (Book Rescue Cultural Association, BR for short).

The mission of Könvymentők is to gather books that their previous owners are trying to get rid of and would just throw out otherwise, and to redistribute them at the lowest prices possible, so that cultural and intellectual knowledge is accessible to all who would otherwise struggle to afford it (mostly pensioners and students).
Their kiosks are shaped like wagons with book cabinets attached to them, an iconic sight that is easily recognizable on the streets.
BR is mostly based in Budapest, but has wagons spread out on many major cities around the Carpathian Basin.

BR's shopkeepers are called the könyvterjesztők (book distributors), and their schedule changes from week to week in a very flexible manner: they decide how many shifts they wish to take every week, and can be assigned to different wagons and shifts (there are two shifts a day: a morning and an afternoon, since the wagons are open 12-14 hours a day). This high number of always changing preferences and variables has proven to be a great administrative challenge for a while, and this schedule generator's goal is to greatly ease that burden.

The App

As a frontend developer, it was easiest for me to develop this idea as a web application, and React was an ideal environment, since it's component-based structure makes it easy to manage and maintain a logical structure.
The structure of the app is:

- App.js: the root of the component tree as usual, calls the major children and also manages the two most important states: schedule and employeesList.

- AddEmployeeForm.jsx: the component where the potential employees can be registered and added manually to employeesList, along with their shift, day and wagon preferences. Employees are also displayed in a mosaic list here, where their data can be checked again by hovering the mouse over their mosaic, and they can be deleted as well (employeesList is also stored locally, so that this process is not lost in case of an accidental browser escape).
  This component also houses the three automatic assignment buttons of the generator:
  - "Beoszt" assigns the employees based on their preferences and as randomly as possible, but can only assign employees to free shifts.
  - "Feltölt" aims to fill up the empty slots in the schedule, but takes no regard for how many shifts people requested, only whether they are available on that wagon and day, therefore it can result in overburdening.
  - "Kiegyenlít" aims to correct that, as it will randomly execute one of two balancing options: either choose someone with excess shifts, and reassign one of their shifts randomly, or take someone who's got a shortfall, and compensate them on someone else's expense.
- ScheduleTable.jsx: a table similar to a styled excel sheet, where the rows are the different wagons (each having two sub-rows, a morning and an afternoon shift), and the columns are the days of the week. the cells of the table can be filled manually, or they are filled by the buttons of AddEmployeeForm automatically. When selecting an employee, their names are displayed in different colors according to their availability in that given shift and wagons. It also has a button that will print the table as a .jpg file when the user deems the shift to be ready, and it calls Notes.jsx as a child component.
- Notes.jsx: it is responsible for detecting any kind of conflicts between the employee preferences and the current state of the shift, and for displaying these conflicts as alerts. These conflicts are:
  - employee is assigned more or less shifts than requested,
  - employee is assigned a shift on a day or wagon that they didn't mark as available,
  - employee is assigned to multiple shifts on different wagons on a certain day (the most severe conflict, displayed in red).
    -scheduleUtils.js: it contains static data that ( the wagons and the days in Hungarian) is used by multiple components, and functions responsible for initializing the schedule and updating it, the algorithms sorting employees into the schedule automatically, and the conflict detection tools.
