const Message = require("./message");
const Command = require("./command");

class Rover {
  // Write code here!
  constructor(position) {
    this.position = position;
    if (!position) {
      throw Error("Rover position required.");
    }
    this.mode = "NORMAL";
    this.generatorWatts = 110;
  }

  receiveMessage(roverMessage) {
    let message = roverMessage.name;
    let results = [];

    for (let i = 0; i < roverMessage.commands.length; i++) {
      if (roverMessage.commands[i].commandType === "MOVE") {
        if (this.mode === "LOW_POWER") {
          results.push({ completed: false });
        } else {
          results.push({ completed: true });
          this.position = roverMessage.commands[i].value;
        }
      } else if (roverMessage.commands[i].commandType === "STATUS_CHECK") {
        results.push({
          completed: true,
          roverStatus: {
            mode: this.mode,
            generatorWatts: this.generatorWatts,
            position: this.position,
          },
        });
      } else if (roverMessage.commands[i].commandType === "MODE_CHANGE") {
        results.push({ completed: true });
        this.mode = roverMessage.commands[i].value;
      } else {
        throw Error("Command type undefined.");
      }
    }

    return { message, results };
  }
}

module.exports = Rover;

//Delete code below after finishing
let rover = new Rover(100);
let commands = [
  new Command("MOVE", 4321),
  new Command("STATUS_CHECK"),
  new Command("MODE_CHANGE", "LOW_POWER"),
  new Command("MOVE", 3579),
  new Command("STATUS_CHECK"),
];
let message = new Message("TA power", commands);
let response = rover.receiveMessage(message);

console.log(rover);
console.log(response);
// console.log(JSON.stringify(response, null, 2));
