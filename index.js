/* Your Code Here */

    


 function createEmployeeRecord(employeeData) {
    return {
      firstName: employeeData[0],
      familyName: employeeData[1],
      title: employeeData[2],
      payPerHour: employeeData[3],
      timeInEvents: [],
      timeOutEvents: [],
      };
  }
  
  function createEmployeeRecords(employeesData) {
    return employeesData.map(employeeData => createEmployeeRecord(employeeData));
  }
  
  function createTimeInEvent(employeeRecord, dateStamp) {
       
    const  [date, hour]  = dateStamp.split(" ");
      
    
    employeeRecord.timeInEvent.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date
    });
  
    return employeeRecord;
  }
 
  
  function createTimeOutEvent(employeeRecord, dateStamp) {
    
    const [date, hour] = dateStamp.split(' ');
  
    employeeRecord.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour),
      date
    });

    return employeeRecord;
  }
  
  function hoursWorkedOnDate(employeeRecord, date) {
    const timeIn = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOut = employeeRecord.timeOutEvents.find(event => event.date === date);
  
    return (timeOut.hour - timeIn.hour) / 100;
  }
  
  function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    const payRate = employeeRecord.payPerHour;
  
    return hoursWorked * payRate;
  }
  
  /*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

 const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

//   function allWagesFor(employeeRecord) {
//     const datesWorked = employeeRecord.timeInEvents.map(event => event.date);
//     const wages = datesWorked.map(date => wagesEarnedOnDate(employeeRecord, date));
  
//     return wages.reduce((total, wage) => total + wage, 0);
//   }
  
  function findEmployeeByFirstName(employees, firstName) {
    return employees.find(employee => employee.firstName === firstName);
  }
  
  function calculatePayroll(employees) {
    return employees.reduce((totalPay, employee) => totalPay + allWagesFor(employee), 0);
  }
  




