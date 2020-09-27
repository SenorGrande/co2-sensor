const { Board, Sensor } = require("johnny-five");
const board = new Board({port: "COM3"});

// Atmospheric CO2 Level = 400ppm
// Average indoor CO2    = 350-450ppm
var co2readings = []; // array to store raw readings
var co2avg = 0;       // int for raw value of CO2
var co2comp = 0;      // int for compensated CO2
var co2sum = 0;       // int for summed CO2 readings
var co2cal = 75;      // margin of error of the sensor

board.on("ready", () => {
  // Create a new generic sensor instance for
  // a sensor connected to an analog (ADC) pin
  const sensor = new Sensor("A5");

  // When the sensor value changes, log the value
  sensor.on("change", value => {

    if (co2readings.length < 10) {
      co2readings.push(sensor.value);
    } else {
      co2sum = 0
      for (var i in co2readings) {
        console.log("i: ", co2readings[i]);
        co2sum = co2sum + co2readings[i];
      }
      co2avg = co2sum / co2readings.length; // divide total to get avg
      co2comp = co2avg - co2cal; // get compensated value
      console.log("Average CO2: ", co2comp);
      co2readings = [];
    }

  });
});
