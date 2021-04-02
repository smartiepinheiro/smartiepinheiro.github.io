# **Mastermind**
Logic games have forever been a passion of mine. This is just a small side project I made trying to replicate an old favorite of mine and improve my HTML/CSS/JS skills, as a recent Dev Student.

You can give it a try at https://smartiepinheiro.github.io/mastermind/

### Game rules

For the unfamiliar the goal of **Mastermind** is to discover a combination of **4 colours** selected by the computer at random. 
- At each turn, the player makes his own **4 color combination guess** (colors can be repeated).
- The **right column** returns how many colors are part of the solution and on the right position.
- The **wrong column** returns how many are part of the solution but on the wrong position.

As an example, let's imagine the **solution** was: 🟣 ⚪ 🔴 ⚪  

Then the table could look something like this:

| User Guess      | Right    | Wrong  |
| ---------------  | :-------: | :-------: | 
| 🔵 ⚪ 🔴 🟡  |       2      |      0     | 
| 🔵 ⚪ 🟣 🟢  |       1      |      1     |
| 🔵 🟢 🔴 🔴  |       1      |      0     |
| ⚪ ⚪ 🔴 🔴  |       2      |      1     |
| ⚪ 🔴 ⚪ ⚪  |       1      |      2     |
| 🔴 ⚪ 🔴 🟣  |       2      |      1     |
| 🟣 ⚪ 🔴 ⚪  |       4      |      0     |

### Features
✔️ Rules button;  
✔️ Random generated solution every time;  
✔️ Ability to edit guess by clicking on that cell and choosing another color;  
✔️ Checks if the guess if fully completed before accepting it;  
✔️ Guess updates the table accordingly;  
✔️ Game over after 8 wrong tries;  
✔️ Win after the guess equals the solution;  
✔️ Solution displayed at Game Over / Win situation;  
✔️ Play Again button that reloads the game;  
✔️ Responsive to window resize: allows horizontal/vertical play.  

*Big shoutout to my friend [Alexandre Oliveira](https://bitbucket.org/AlexandreOliveira96/) for always so happily and intensely testing all my stuff*  ♡ 

### Thank you so much for the time 🙋