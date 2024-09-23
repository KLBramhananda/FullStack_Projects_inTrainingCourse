window.onload = function() {
    localStorage.setItem('usersScore', 0);
    localStorage.setItem('compsScore', 0);
};

  

const addBoxButton = document.getElementById('togglerulebook');
const hiddenBox = document.querySelector('.rulebook.hidden');
const crossbtn = document.getElementById('cross');

const addBoxButton1 = document.getElementById('addBox');
const hiddenBox1 = document.querySelector('.sub-box.hidden');

const choices = ["rock", "paper", "scissors"];
const buttons = document.querySelectorAll('.number');
const result = document.getElementById('yourchoice');
const mainElement = document.querySelector(".main");

///score changer
let savedCompsScore = localStorage.getItem('compsScore');
let savedUsersScore = localStorage.getItem('usersScore');

let comps = document.getElementById('scorecomp');
let users = document.getElementById('scoreuser');


// Set initial scores from localStorage or default to 0
comps.textContent = savedCompsScore !== null ? savedCompsScore : 0;
users.textContent = savedUsersScore !== null ? savedUsersScore : 0;

//toggle hiding of mumma and resgen circles
const hidemumma = document.querySelector('.mumma');
const hideaddbox = document.querySelector('.addBox');
const statusbar = document.getElementById('status');
const hidemainresbox = document.querySelector('.mainresbox')

//toggle rulebook
addBoxButton.addEventListener('click',() =>{
    if(hiddenBox.classList.contains('hidden')){
        hiddenBox.classList.remove('hidden');
    }else{
        hiddenBox.classList.add('hidden');  
    }
    //Cross btn action to close rulesbook
    crossbtn.addEventListener('click',function() {
        hiddenBox.classList.add('hidden');  
    });
});


//result generator
buttons.forEach(button => {
    button.addEventListener('click', playGame);
    button.addEventListener('click', function () {
        const backgroundValue = getComputedStyle(button).getPropertyValue("background-image");
        const borderColor = getComputedStyle(button).getPropertyValue("border-color");
        
        mainElement.style.backgroundImage = backgroundValue;
        mainElement.style.borderColor = borderColor;
        hidemumma.style.display = 'none';
        hideaddbox.style.display = 'flex'; 
        hidemainresbox.style.display = 'block';

    });
});



function playGame(event) {
    const playerChoice = event.target.id;
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    const winner = getWinner(playerChoice, computerChoice);
    const secondPulse = document.querySelector(".twopulse");//animations toggle 2nd one
    const firstPulse = document.querySelector(".onepulse");//animations toggle 1nd one

        statusbar.textContent = `${winner} `;

    const mainTwoElement = document.querySelector('.main.two');
      
        switch (computerChoice) {
            case 'rock':
                mainTwoElement.style.backgroundImage = 'var(--rock)'; 
                mainTwoElement.style.borderColor = 'var(--bx1)'; 
                break;
            case 'paper':
                mainTwoElement.style.backgroundImage = 'var(--paper)'; 
                mainTwoElement.style.borderColor = 'var(--bx3)'; 
                break;
            case 'scissors':
                mainTwoElement.style.backgroundImage = 'var(--scissors)'; 
                mainTwoElement.style.borderColor = 'var(--bx2)'; 
                break;
            default:
                break;
        }

//toggle button hide
addBoxButton1.addEventListener('click',() =>{

        toggleAnimation();
        function toggleAnimation() {
            console.log("toggled");
             firstPulse.classList.remove("animate");
             secondPulse.classList.remove("animate");
         }
        hidemumma.style.display = 'block';
        hidemainresbox.style.display = 'none';

// When a player wins, 
if (parseInt(users.textContent) === 5 || parseInt(comps.textContent) === 5) {
    let winnerMessage = parseInt(users.textContent) === 5 ? "YOU WIN THE GAME" : "YOU LOST THE GAME";
    
    // Store the winner in localStorage to display on the final page
    localStorage.setItem('finalWinner', winnerMessage);

    // Redirect to a new page to show the final result
    window.location.href = "final_page.html"; 
}

    
});

    // Update the scoreboard
    if (winner === "YOU WIN") {
        users.textContent = parseInt(users.textContent) + 1;
    // Store the updated users' score in localStorage
    localStorage.setItem('usersScore', users.textContent);
        console.log(`${parseInt(users.textContent)}`)
        if (parseInt(users.textContent) === 5) {
            hiddenBox1.classList.remove('hidden'); 

        }
        toggleAnimation();
        function toggleAnimation() {
            console.log("toggled");
             firstPulse.classList.toggle("animate");
         }
    } else if (winner === "YOU LOST") {
        comps.textContent = parseInt(comps.textContent) + 1;
    // Store the updated comps' score in localStorage
    localStorage.setItem('compsScore', comps.textContent);
        toggleAnimation();
        function toggleAnimation() {
            console.log("toggled");
             secondPulse.classList.toggle("animate");
         }
    }
    else{
        firstPulse.classList.toggle("animate");
        secondPulse.classList.toggle("animate");
     }
}


function getWinner(player, computer) {
    if (player === computer) {
        return "TIE UP";
    } else if (
        (player === "rock" && computer === "scissors") ||
        (player === "paper" && computer === "rock") ||
        (player === "scissors" && computer === "paper")
    ) {
        return "YOU WIN";
    } else {
        return "YOU LOST";
    }
}
