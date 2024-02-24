const Message = require("./message");
const Command = require("./command");

class Rover {
  // Write code here!
  constructor(position) {
    this.position = position;
    if(!position){
      throw Error('Rover position required.');
    }
    this.mode = 'NORMAL';
    this.generatorWatts = 110;
  }
  receiveMessage(message) {
   let phrase = message.name;
   let results = [];

  }
}

module.exports = Rover;

//Delete code below after finishing
// let rover = new Rover(100);
// let commands = [
//   new Command("MOVE", 4321),
//   new Command("STATUS_CHECK"),
//   new Command("MODE_CHANGE", "LOW_POWER"),
//   new Command("MOVE", 3579),
//   new Command("STATUS_CHECK"),
// ];
// let message = new Message("TA power", commands);
// let response = rover.receiveMessage(message);

// console.log(rover);
// console.log(response);
// console.log(JSON.stringify(response, null, 2));
