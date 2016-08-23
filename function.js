(function () {
  'use strict';
  
  const view = {
  displayMessage(msg){
    const messageArea = document.querySelector('.message');
    messageArea.textContent = msg;
  },
  
  displayOorX(field,symbol){
    const cel = document.getElementById(field);
    cel.classList.add(symbol);
  }
}

const model = {
  
  playerSymbol: 'O',
  
  gameBoard: {
    id1: '1',
    id2: '2',
    id3: '3',
    id4: '4',
    id5: '5',
    id6: '6',
    id7: '7',
    id8: '8',
    id9: '9'
  },
  
  gameOver: false,
  
  movements: 0,
  
  playerAction(id){
    if(this.gameOver){
      view.displayMessage('KONIEC GRY');
      return false;
    }
    this.playerSymbol === 'O' ? view.displayOorX(id,'playerO') : view.displayOorX(id,'playerX');
    this.setPlayerChoice(id);
    this.playerSymbol === 'O' ? this.playerSymbol = 'X' : this.playerSymbol = 'O';
    view.displayMessage(`Następny ruch należy do ${this.playerSymbol}`);
    this.checkGameStat();
  },
  
  setPlayerChoice(id){
    this.gameBoard[id] = this.playerSymbol;
    this.movements++;
  },
  
  checkGameStat(){
    if(this.movements === 9){
      view.displayMessage('REMIS');
    }
    if(this.gameBoard.id1 === this.gameBoard.id2 && this.gameBoard.id2 === this.gameBoard.id3 ||
      this.gameBoard.id4 === this.gameBoard.id5 && this.gameBoard.id5 === this.gameBoard.id6  ||
      this.gameBoard.id7 === this.gameBoard.id8 && this.gameBoard.id8 === this.gameBoard.id9  ||
      this.gameBoard.id1 === this.gameBoard.id4 && this.gameBoard.id4 === this.gameBoard.id7 ||
      this.gameBoard.id2 === this.gameBoard.id5 && this.gameBoard.id5 === this.gameBoard.id8 ||
      this.gameBoard.id3 === this.gameBoard.id6 && this.gameBoard.id6 === this.gameBoard.id9 ||
      this.gameBoard.id1 === this.gameBoard.id5 && this.gameBoard.id5 === this.gameBoard.id9 ||
      this.gameBoard.id3 === this.gameBoard.id5 && this.gameBoard.id5 === this.gameBoard.id7){
      if(this.playerSymbol === "O"){
          view.displayMessage(`Wygrał znak X`);
        }else{
          view.displayMessage(`Wygrał znak O`);
        }
      this.gameOver = true;
    }
  }
}


const controler = {
  
  procesClick(){
    view.displayMessage(`Zaczyna ${model.playerSymbol}`);
    let cells = document.querySelectorAll('.game-cell');
    for(let element of cells){
    element.addEventListener('click',()=>{
     if(model.gameBoard[element.id] === 'X' || model.gameBoard[element.id] === 'O'){
       return false;
     }else{
      model.playerAction(element.id);
     }
    })}
  }
}

controler.procesClick();
  
})();