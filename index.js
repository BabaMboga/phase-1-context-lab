// Your code here

function createEmployeeRecord(employeeData) {
  return {
      firstName: employeeData[0],
      familyName: employeeData[1],
      title: employeeData[2],
      payPerHour: employeeData[3],
      timeInEvents: [],
      timeOutEvents: []
  };
}

function createEmployeeRecords(arrays) {
  return arrays.map(createEmployeeRecord);
}

function createTimeInEvent(employee, dateStamp) {
  const [date, time] = dateStamp.split(' ');
  const [year, month, day] = date.split('-');
  const hour = parseInt(time)
  // const minute = time.slice(2);
  const dateTime  = new Date(year, month-1, day, hour);
  employee.timeInEvents.push({type: 'TimeIn', hour, date });
  return employee;
}

function createTimeOutEvent(employee, dateStamp) {
  const [date, time] = dateStamp.split(' ');
  const [year, month, day] = date.split('-');
  const hour = time.slice(0, 2);
  const minute = time.slice(2);
  const dateTime = new Date(year, month-1, day, hour, minute);
  employee.timeOutEvents.push({ type: 'TimeOut', hour: parseInt(hour + minute), date});
  return employee;
}

function hoursWorkedOnDate(employee, dateTime) {
  const [date, time] = dateTime.split(' ');

  const timeIn = employee.timeInEvents.find(event => event.date === date);
  const timeOut = employee.timeOutEvents.find(event => event.date === date);


  if (timeIn && timeOut) {
      const [timeInHour, timeInMinute] = timeIn.hour.toString().padStart(4, '0').match(/\d{2}/g); // Splitting hour and minute from timeIn
      const [timeOutHour, timeOutMinute] = timeOut.hour.toString().padStart(4, '0').match(/\d{2}/g); // Splitting hour and minute from timeOut

      const timeInMinutes = parseInt(timeInHour) * 60 + parseInt(timeInMinute);
      const timeOutMinutes = parseInt(timeOutHour) * 60 + parseInt(timeOutMinute);

      const hoursWorked = (timeOutMinutes - timeInMinutes) / 60;
      return hoursWorked;
  } else {
      return 0;
  }

}

function wagesEarnedOnDate(employee, date) {
  const hoursWorked = hoursWorkedOnDate(employee, date);
  return hoursWorked * employee.payPerHour;
}

function allWagesFor(employee) {
  const datesWorked = employee.timeInEvents.map(event => event.date);
  const wages = datesWorked.reduce((totalWages, date) => totalWages + wagesEarnedOnDate(employee, date), 0);
  return wages;
}

function calculatePayroll(employees) {
  return employees.reduce((totalPayroll, employee) => totalPayroll + allWagesFor(employee), 0);

}

function findEmployeeByFirstName (collection, firstNameString) {
  return collection.find(employee => employee.firstName === firstNameString);
}