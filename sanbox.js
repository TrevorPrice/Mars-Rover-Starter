class Command {
  constructor(commandType, value) {
    this.commandType = commandType;
    if (!commandType) {
      throw Error("Command type required.");
    }
    this.value = value;
  }
}
let modeCommand = new Command("MODE_CHANGE", "LOW_POWER");
let moveCommand = new Command("MOVE", 12000);

console.log(modeCommand);
console.log(moveCommand);

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
    if(!position){
      throw Error('Rover position required.');
    }
    this.mode = 'NORMAL';
    this.generatorWatts = 110;
  }
}