const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {
  //Test 7
  it("constructor sets position and default values for mode and generatorWatts", function() {
    expect( function() { new Rover ();}).toThrow(new Error ('Rover position required.'));
  });

  //Test 8
  
});
