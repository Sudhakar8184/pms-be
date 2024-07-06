const { addMonths, endOfMonth, addDays } = require('date-fns');

function calculateEndDate(startDate, monthsToAdd) {
    // Add months to start date
    let endDate = addMonths(startDate, monthsToAdd);
    
    // Get the end of the month for the calculated end date
    endDate = endOfMonth(endDate);
    
    return endDate;
}

function calculateNextTriggedDate(startDate, monthsToAdd) {
    // Add months to start date
   return addDays(startDate, monthsToAdd);
}


module.exports ={
    calculateEndDate,
    calculateNextTriggedDate
}