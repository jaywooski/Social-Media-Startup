const moment = require('moment');

function getDate(time) {
    // Get current date.
    time = moment()
    
    const documentedTime = time.format('LLLL');
    
    return documentedTime;
}

module.exports = getDate;