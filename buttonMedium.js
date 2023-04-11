console.log("hello js!")

// var, but should use let + const to declare a variable
const myButton = document.querySelector("button");
let theMain = document.getElementById("theMessage");
let theP = document.querySelector("p");

// when user clicks button trigger potato function
myButton.addEventListener('click',buttON);

function buttON(){
    console.log("you clicked!")
    theMain.style.backgroundColor="darkseagreen"
    theP.textContent="you did it :)"
}