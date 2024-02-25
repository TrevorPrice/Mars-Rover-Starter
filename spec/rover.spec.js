const Rover = require("../rover.js");
const Message = require("../message.js");
const Command = require("../command.js");

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Rover class", function () {
//Test 7
  it("constructor sets position and default values for mode and generatorWatts", function () {
    let rover = new Rover(100);
    expect(rover.position).toBe(100);
  });

//Test 8
  it("response returned by receiveMessage contains the name of the message", function () {
    let roverMessage = new Message("Test message with two commands");
    let rover = new Rover(100);
    let response = rover.receiveMessage(roverMessage);
    expect(response.message).toBe("Test message with two commands");
  });

//Test 9
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function () {
    let commands = [new Command("MODE_CHANGE", "LOW_POWER"), new Command("STATUS_CHECK")];
    let roverMessage = new Message("Test message with two commands", commands);
    let rover = new Rover(100);
    let response = rover.receiveMessage(roverMessage);
    expect(response.results.length).toBe(commands.length);
  });

//Test 10
  it("responds correctly to the status check command", function () {
    let commands = [new Command("STATUS_CHECK")];
    let roverMessage = new Message("Test message with two commands", commands);
    let rover = new Rover(100);
    let response = rover.receiveMessage(roverMessage);
    let roverData = {
      mode: rover.mode,
      generatorWatts: rover.generatorWatts,
      position: rover.position,
    };
    expect(response.results[0].roverStatus).toEqual(roverData);
  });

//Test 11
  it("responds correctly to the mode change command", function () {
    let commands = [new Command("MODE_CHANGE", "LOW_POWER")];
    let roverMessage = new Message("Changing mode to LOW_POWER", commands);
    let rover = new Rover(100);
    let response = rover.receiveMessage(roverMessage);
    expect(rover.mode).toEqual("LOW_POWER");
  });

//Test 12
  it("responds with a false completed value when attempting to move in LOW_POWER mode", function() {
    let commands = [new Command("MODE_CHANGE", "LOW_POWER"), new Command("MOVE", 1000)];
    let roverMessage = new Message("Cannot be moved in this state.", commands);
    let rover = new Rover(100);
    let response = rover.receiveMessage(roverMessage);
    expect(response.results[1]).toEqual({ completed: false });
  });

//Test 13
  it("responds with the position for the move command", function() {
    let commands = [new Command("MOVE", 500)];
    let roverMessage = new Message("Moving to position 500", commands);
    let rover = new Rover(100);
    let response = rover.receiveMessage(roverMessage);
    expect(rover.position).toEqual(500);
  });
});
