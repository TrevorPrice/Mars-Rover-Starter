class Command {
  constructor(commandType, value) {
    this.commandType = commandType;
    if (!commandType) {
      throw Error("Command type required.");
    }
    this.value = value;
  }
}
// let modeCommand = new Command("MODE_CHANGE", "LOW_POWER");
// let moveCommand = new Command("MOVE", 12000);

// console.log(modeCommand);
// console.log(moveCommand);

class Message {
  constructor(name, commands = []) {
    this.name = name;
    if (!name) {
      throw Error("Name required.");
    }
    this.commands = commands;
  }
}

class Rover {
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
console.log(JSON.stringify(response, null, 2));
