function getWeekRange(date) {
    const startOfWeek = new Date(date);
    //get day will determine how many days passed since sunday
    const day = startOfWeek.getDay();
    // so we are subtracting the chosen date with the amount of day so it reaches out to recent sunday
    startOfWeek.setDate(startOfWeek.getDate() - day);
    startOfWeek.setHours(0, 0, 0, 0);
    // add seven days to reach to next sunday
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 7);

    return {
        startOfWeek,
        endOfWeek
    };
}

module.exports = getWeekRange;