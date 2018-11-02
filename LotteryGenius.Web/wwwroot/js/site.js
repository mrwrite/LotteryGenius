// Write your JavaScript code.
var clock;
var clock2;

$(document).ready(function () {
    // Grab the current date
    var currentDate = new Date();

    // Set some date in the future. In this case, it's always Jan 1
    var futureDate = new Date(currentDate.getFullYear() + 1, 0, 1);

    var powerFutureDate = new Date(document.getElementById('powerNextDate').value);
    var megaFutureDate = new Date(document.getElementById('megaNextDate').value);

    // Calculate the difference in seconds between the future and current date
    var diff = futureDate.getTime() / 1000 - currentDate.getTime() / 1000;

    var powerDiff = powerFutureDate.getTime() / 1000 - currentDate.getTime() / 1000;
    var megaDiff = megaFutureDate.getTime() / 1000 - currentDate.getTime() / 1000;

    // Instantiate a coutdown FlipClock
    clock = $('.clock').FlipClock(powerDiff, {
        clockFace: 'DailyCounter',
        countdown: true
    });

    clock2 = $('.clock-2').FlipClock(megaDiff,
        {
            clockFace: 'DailyCounter',
            countdown: true
        });
});