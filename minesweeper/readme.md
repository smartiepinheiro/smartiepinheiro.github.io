# **Minesweeper**
Game development has forever been a passion of mine. This is just a small side project I made trying to replicate an old favorite of mine and improve my HTML/CSS/JS skills, as a recent Dev Student.

You can give it a try at https://smartiepinheiro.github.io/minesweeper/

### Game rules

For the unfamiliar the goal of **Minesweeper** is to locate all of the **20 hidden mines**. 

The numbers on the cells tells you **how many mines** that cell is touching (above, below, left, right, and all 4 diagonals). 
- **Left click** on a cell if you believe it doesn't hold a mine.
- **Right click** on a cell if you believe it does hold a mine to **pin** it.
- **Double click** on a cell if you believe you already pinned all the adjacent mines to uncover the rest.  
- You **lose** when a cell that you left click open contains a mine.
- You **win** if you either pin all the mines or left click on all the non-mine cells.

You can see an example of a mini try here:  

![alt-text](https://imgur.com/EhNcmye.gif)

### Features
✔️ 'Show rules' button;  
✔️ Random generated mines every time;  
✔️ Ability to left-click to open a cell;  
✔️ Ability to right-click to pin a cell;  
✔️ Ability to un-pin a cell by right clicking it again;  
✔️ Ability to double-click a cell if the user believes they pinned all the mines next to it to open the surrounding cells;  
✔️ Game over when the user left clicks a mine;  
✔️ Game over when the user double clicks a cell and they had wrongly pinned the mines next to it;  
✔️ Win after the user either pins all the mines of left clicks all the non-mine cells;  
✔️ At game over shows a red cross on the wrong pinned mines and an explosion on the mine clicked;  
✔️ Disables table clicks at the end of the game;  
✔️ 'Current Time' timer, that starts with the first table click;  
✔️ 'Current Time' resets on every game;  
✔️ 'Highscore' time stored in the cookies, that updates and displays the user's fastest win time.  
✔️ Play Again button that reloads the game;  
✔️ Responsive to window resize: allows horizontal/vertical play.

### Thank you so much for the time 🙋