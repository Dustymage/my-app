# my-app

TOY DRONE ASSESSMENT

1.For the interface of the toy drone simulation, we'll use HTML, CSS, and JavaScript to make it look good on both mobile and desktop devices. The logic of the simulation will be handled by JavaScript, which is good for making interactive things.
To make sure the simulation works correctly, we'll do some manual testing and also use tools like Jest or Mocha to automatically test it. This way, we can make sure the simulation keeps working correctly even after making changes.

2.We're building a simulation game of a toy drone that can move on a 10x10 square surface. The drone must not cross the boundary and we can control it with commands like PLACE, MOVE, LEFT, RIGHT, REPORT, and ATTACK. The PLACE command sets the starting position of the drone and the other commands allow us to move and control the drone. We also need to make the interface look good and work on both mobile and desktop.

3.To confirm that the drone has moved successfully to the correct location, the automation tool needs to compare the expected location of the drone after each movement command (such as MOVE, LEFT, or RIGHT) with its actual location as reported by the REPORT command. If the expected and actual locations match, then the movement was successful. If not, then there's an error in the movement logic that needs to be fixed.

4.To automate and confirm that the Place command must be executed first before any other sequence of commands can be used, we need to add a check in our code. The code should check if the Place command has been executed before allowing any other commands. If the Place command has not been executed yet, the code should only accept the Place command and discard any other commands until a valid Place command has been executed.

5.To automate and verify that the drone does not go out of the boundary, I would first define the boundary of the surface as 10 units x 10 units. Then, before executing each move command, I would check if the new location of the drone after the move would still be within the boundary. If it would go out of the boundary, I would ignore the move command. If it's within the boundary, I would update the drone's position. This way, the drone's position will always remain within the boundary and never go out of it.

6. To summarize, based on the requirements for the drone simulation, some other automatable test scenarios could include verifying that the drone follows the correct movement commands, such as MOVE, LEFT, and RIGHT. Another scenario could be testing that the drone does not cross the surface boundary and is prevented from falling. Additionally, testing the drone's ability to report its current X, Y, and F position, as well as the correct functioning of the ATTACK command, can also be automated. 
These tests can help ensure that the drone behaves as expected and meets the requirements set out in the assessment.

ANSWER TO QUESTIONS
