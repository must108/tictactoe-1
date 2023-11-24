class Cell {
    constructor(id){
        this.element = Getting(id);
        this.clicked = 0;
    }
    isClicked(){
        return this.clicked === 0;
    }
    get elem(){
        return this.element;
    }
    click(num){
        this.clicked = num;
    }
};

class Player {
    constructor(order){
        if(order === 1){
            this.myTurn = true;
        } else if(order === 2){
            this.myTurn = false;
        }
    }
    get turn(){
        return this.myTurn;
    }
    newTurn(bool){
        this.myTurn = bool;
    }
};

const Player1 = new Player(1);
const Player2 = new Player(2);

const zero = new Cell("0");
const one = new Cell("1");
const two = new Cell("2");
const three = new Cell("3");
const four = new Cell("4");
const five = new Cell("5");
const six = new Cell("6");
const seven = new Cell("7");
const eight = new Cell("8");

const play1 = Getting("player1");
const play2 = Getting("player2");

const gamestatus = Getting("gamestatus");
const allCells = document.getElementById("container");

let numCount = 0;

function Getting(id){
    return document.getElementById(id);
}

function updateCell(elem){
    let element = elem.elem;

    if(elem.isClicked() && numCount % 2 === 0){
        element.textContent = "X";
        elem.click(1);
        numCount += 1;
        Player1.newTurn(false);
        Player2.newTurn(true);
    } else if(elem.isClicked() && numCount % 2 === 1){
        element.textContent = "O";
        elem.click(1);
        numCount += 1;
        Player1.newTurn(true);
        Player2.newTurn(false);
    } 

    highlightPlayer();
    determineWinner();
}

function highlightPlayer(){
    if(Player1.turn){
        play1.style.border = "2px solid #7bafd4";
        play2.style.border = "2px solid #484d50";
    } else if (Player2.turn) {
        play2.style.border = "2px solid #7bafd4";
        play1.style.border = "2px solid #484d50";
    }
}

function determineWinner(){
    const status1 = [
        zero.elem.textContent,
        one.elem.textContent,
        two.elem.textContent,
        three.elem.textContent,
        four.elem.textContent,
        five.elem.textContent,
        six.elem.textContent,
        seven.elem.textContent,
        eight.elem.textContent
    ];

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for(const combination of winningCombinations){
        const [a, b, c] = combination;
        if(status1[a] === status1[b] && status1[b] === status1[c] && status1[a] !== ""){
            allClicked();
            if(status1[a] === "X"){
                setTimeout(function(){
                    gamestatus.style.opacity = 1;
                    gamestatus.textContent = "player 1 won!";
                    play1.style.border = "2px solid #7bafd4";
                    play2.style.border = "2px solid #484d50";
                    allCells.style.opacity = 0;
                }, 600);
            } else if(status1[a] === "O"){
                allClicked();
                setTimeout(function(){
                    gamestatus.style.opacity = 1;
                    gamestatus.textContent = "player 2 won!";
                    play2.style.border = "2px solid #7bafd4";
                    play1.style.border = "2px solid #484d50";
                    allCells.style.opacity = 0;
                }, 600);
            }
            return;
        } 
    }
    if(status1.every(symbol => symbol != "")){
            allClicked();
        setTimeout(function(){
            gamestatus.style.opacity = 1;
            gamestatus.textContent = "draw!";
            allCells.style.opacity = 0;
        }, 600);
    }
}

function allClicked(){
    const cells = [zero, one, two, three, four, five, six, seven, eight];

    for(const cell of cells){
        cell.click(1);
    }
}

function resetAll(){
    const cells = [zero, one, two, three, four, five, six, seven, eight];

    for(const cell of cells){
        let element = cell.elem;

        cell.click(0);
        element.textContent = "";
        gamestatus.textContent = "";
    }

    Player1.myTurn = true;
    Player2.myTurn = false;
    numCount = 0;
    gamestatus.style.opacity = 0;
    allCells.style.opacity = 1;
    status1 = [];
    highlightPlayer();
}

zero.elem.addEventListener("click", function() {
    updateCell(zero);
});

one.elem.addEventListener("click", function() {
    updateCell(one);
});

two.elem.addEventListener("click", function() {
    updateCell(two);
});

three.elem.addEventListener("click", function() {
    updateCell(three);
});

four.elem.addEventListener("click", function() {
    updateCell(four);
});

five.elem.addEventListener("click", function() {
    updateCell(five);
});

six.elem.addEventListener("click", function() {
    updateCell(six);
});

seven.elem.addEventListener("click", function() {
    updateCell(seven);
});

eight.elem.addEventListener("click", function() {
    updateCell(eight);
});

highlightPlayer();
