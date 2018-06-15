window.onload = function main() {
    /* In Game Layout */
    document.getElementById("ghostImg").onclick = changeGhost;
    document.getElementById("start").onclick = startGame;
    
    /* In Game Play (Dice) */
    document.getElementById("roll").onclick = generateRandomRolls;
    document.getElementById("0").onclick = retainDice1;  // If dice buttons 
    document.getElementById("1").onclick = retainDice2; // are clicked during 
    document.getElementById("2").onclick = retainDice3; // any turn 
    document.getElementById("3").onclick = retainDice4;
    document.getElementById("4").onclick = retainDice5;

    /* In Game Play (Scores) */
    let inputBoxes = document.querySelectorAll("#ghostScores input");

    for(var item = 0; item < inputBoxes.length; item++){
            if(getGhostInputBoxName(item) == "score1") {
                document.getElementById(getGhostInputBoxName(item)).onclick = inputScore1;
            }
            else if(getGhostInputBoxName(item) == "score2") {
                document.getElementById(getGhostInputBoxName(item)).onclick = inputScore2;
            }
            else if(getGhostInputBoxName(item) == "score3") {
                document.getElementById(getGhostInputBoxName(item)).onclick = inputScore3;
            }
            else if(getGhostInputBoxName(item) == "score4") {
                document.getElementById(getGhostInputBoxName(item)).onclick = inputScore4;
            }
            else if(getGhostInputBoxName(item) == "score5") {
                document.getElementById(getGhostInputBoxName(item)).onclick = inputScore5;
            }
            else if(getGhostInputBoxName(item) == "score6") {
                document.getElementById(getGhostInputBoxName(item)).onclick = inputScore6;
            }
            /*else if(getInputBoxName(item) == "scoreBonus") {
                document.getElementById(getInputBoxName(item)).onclick = inputScoreBonus;
            }*/
            else if(getGhostInputBoxName(item) == "scoreThreeKind") {
                document.getElementById(getGhostInputBoxName(item)).onclick = inputScoreThreeKind;
            }
            else if(getGhostInputBoxName(item) == "scoreFourKind") {
                document.getElementById(getGhostInputBoxName(item)).onclick = inputScoreFourKind;
            }
            else if(getGhostInputBoxName(item) == "scoreFullHouse") {
                document.getElementById(getGhostInputBoxName(item)).onclick = inputScoreFullHouse;
            }
            else if(getGhostInputBoxName(item) == "scoreSmall") {
                document.getElementById(getGhostInputBoxName(item)).onclick = inputScoreSmall;
            }
            else if(getGhostInputBoxName(item) == "scoreLarge") {
                document.getElementById(getGhostInputBoxName(item)).onclick = inputScoreLarge;
            }
            else if(getGhostInputBoxName(item) == "scoreChance") {
                document.getElementById(getGhostInputBoxName(item)).onclick = inputScoreChance;
            }
            else if(getGhostInputBoxName(item) == "scoreYahtzee") {
                document.getElementById(getGhostInputBoxName(item)).onclick = inputScoreYahtzee;
            }

        // Take text cursor off of boxes
        (<HTMLElement>inputBoxes[item]).onfocus = function() {
            this.blur();
        }
    }
} 

/*//////////////////////////////////////// Game Layout ////////////////////////////////////////*/

//#region Game Layout
function changeGhost() {
    var general = "Images/Ghost.gif";
    var bowTie = "Images/GhostAndBowTie.gif";
    var flower = "Images/GhostWithFlower.gif";
    var sunglasses = "Images/SunglassesGhost.gif";

    if(obtainImgSrcAttribute() == general) {
        changeImgScrAttribute(bowTie);
    }
    else if (obtainImgSrcAttribute() == bowTie) {
        changeImgScrAttribute(flower);
    }
    else if (obtainImgSrcAttribute() == flower) {
        changeImgScrAttribute(sunglasses);
    }
    else {
        changeImgScrAttribute(general);
    }
    
}

function obtainImgSrcAttribute() {
    return document.getElementById("ghostImg").getAttribute("src");
}

function changeImgScrAttribute(imgName) {
    return document.getElementById("ghostImg").setAttribute("src", imgName);
}

function startGame (){
    var buttons = document.querySelectorAll("button"); // All buttons

    for(var i = 0; i < buttons.length; i++) {
        buttons[i].removeAttribute("hidden");
    }

    document.getElementById("graveImg").setAttribute("hidden", "true");

    document.getElementById("ghostImg").removeAttribute("hidden");

    document.getElementById("youLabel").innerHTML = "You";

    document.getElementById("start").setAttribute("disabled", "true");

    document.getElementById("start").innerHTML = "&cross;";

    generateRandomRolls();
}
//#endregion

/*//////////////////////////////////////// Game Play (Dice) ////////////////////////////////////////*/

//#region Game Play Dice
let ghostRolls = new Array(5); // All rolls per ghost turn
let rollCounter = 0; // Keeps track of rolls per turn; first roll = 1
//let testArray = new Array(5, 5, 5, 5, 5);

/**
 * Generates random roll values per turn based on
 * die buttons that are selected/non-selected
 */
function generateRandomRolls() {
    /* If roll button is disabled from grim turn, then enable it */
    if(document.getElementById("roll").hasAttribute("disabled")) {
        document.getElementById("roll").removeAttribute("disabled");
        document.getElementById("grimTurn").innerHTML = "&nbsp;";
    }

    /* If there are three or less rolls, and there are any dice enabled,
       generate more random numbers */
    if(rollCounter <= 3 && anyEnabledButtons()) { // 3 rolls per turn
        for(var index = 0; index < ghostRolls.length; index++){
            /* Only change the value of the non-cliked dice */
            if(!document.getElementById(index.toString()).hasAttribute("data-clicked")) {
                ghostRolls[index] = Math.floor(Math.random() * 6) + 1

                /* Display rolls on buttons */
                document.getElementById(index.toString()).innerHTML = ghostRolls[index];
            }
        }

        rollCounter++;

        /*Display roll number */
        document.getElementById("rollNumber").innerHTML = "Roll " + (rollCounter);

        if(rollCounter == 3) {
            /* Disable roll button on 3rd roll*/
            document.getElementById("roll").setAttribute("disabled", "true");
    
            /* Calculate turn total and pass turn */
            //alert("Fool");
            checkGhostRolls();
        }
    }
    else {
        checkGhostRolls()
    }
}

/**
 *  Returns whether or not there are any enabled buttons
 *  @return boolean
 */
function anyEnabledButtons():boolean {
    var buttons = document.querySelectorAll(".die"); // Select all buttons except "roll"

    /* If a button is NOT disabled, return true;
       We want to know if there are any enabled */
    for(var i = 0; i < buttons.length; i++) { 
        if(!buttons[i].hasAttribute("data-clicked")) {
            return true;
        }
    }

    return false;
}

/**
 *  Check data-clicked attribute and pass function for dice 1
 */
function retainDice1() {
    /* If button has already been clicked,
       do not retain when clicked again */
    if(checkDataClickedAttr("0")) {
        return;
    }
    else {
        retainRolls("0");
    }
}

/**
 *  Check data-clicked attribute and pass function for dice 2
 */
function retainDice2() {
    /* If button has already been clicked,
       do not retain when clicked again */
    if(checkDataClickedAttr("1")) {
        return;
    }
    else {
        retainRolls("1");
    }
}

/**
 *  Check data-clicked attribute and pass function for dice 3
 */
function retainDice3() {
    /* If button has already been clicked,
       do not retain when clicked again */
    if(checkDataClickedAttr("2")) {
        return;
    }
    else {
        retainRolls("2");
    }
}

/**
 *  Check data-clicked attribute and pass function for dice 4
 */
function retainDice4() {
    /* If button has already been clicked,
       do not retain when clicked again */
    if(checkDataClickedAttr("3")) {
        return;
    }
    else {
        retainRolls("3");
    }
}

/**
 *  Check data-clicked attribute and pass function for dice 5
 */
function retainDice5() {
    /* If button has already been clicked,
       do not retain when clicked again */
    if(checkDataClickedAttr("4")) {
        return;
    }
    else {
     retainRolls("4");
    }
}

/**
 * Check to see if a die button has the data-clicked attribute
 * @param diceNumber the 1st, or 2nd, or 3rd... die
 * @return boolean
 */
function checkDataClickedAttr(diceNumber:string):boolean {
    if(document.getElementById(diceNumber).hasAttribute("data-clicked")) {
        document.getElementById(diceNumber).removeAttribute("data-clicked");
        return true;
    }
    return false;
}

function removeAllDataClickedAttr() {
    var ghostButtons = document.querySelectorAll("#ghostRolls button");

    for(var i = 0; i < 5; i++) { 
        if(document.getElementById(i.toString()).hasAttribute("data-clicked")) {
            document.getElementById(i.toString()).removeAttribute("data-clicked");
        }
    }
}

/**
 * Keeps the roll value the user clicks on
 * @param diceNumber the 1st, 2nd, 3rd, ... dice rolled
 */
function retainRolls(diceNumber:string) {
    if(rollCounter > 0) {
        /* Adding clicked buttons to data-clicked group*/
        document.getElementById(diceNumber).setAttribute("data-clicked", "true");
    }

}
//#endregion

/*//////////////////////////////////////// Game Play (Scores) ////////////////////////////////////////*/

//#region  Game Play (Scores)
var singlesTotal = 0;

function checkGhostRolls() {
    /* Remove attributes to re-distribute them */
    removeChosenAttr();

    /* Sort ghostRolls for easy searching */
    ghostRolls.sort();

    /* Check if ghostRolls contains 1s, 2s, 3s, ... to trigger
       score selection */
    for (let diceValue = 1; diceValue <= 6; diceValue++) { // Dice numbers 1 - 6 inclusive    
        if(ghostRolls.indexOf(diceValue) > -1) {
            highlightInput("score" + diceValue.toString());
        }
    }
       
    /* Check if ghostRolls contains three of  the same number
       to trigger score selection */
    for(var index = 0; index < ghostRolls.length - 2; index++) {
        if(threeOfTheSame(index)) {
            highlightInput("scoreThreeKind");
        }
    }

    /* Check if ghostRolls contains four of  the same number
       to trigger score selection */
       for(var index = 0; index < ghostRolls.length - 3; index++) {
        if(ghostRolls[index] ==
           ghostRolls[index + 1] && 
           ghostRolls[index + 1] ==
           ghostRolls[index + 2] &&
           ghostRolls[index + 2] ==
           ghostRolls[index + 3]) {
            highlightInput("scoreFourKind");
        }
    }

    /* Check if ghostRolls contains three same numbers
       and a pair to trigger score selection; three of the
       same being at the front */
    var newIndex = 0;

    if(threeOfTheSame(0)) { // Checking first three indexes
        newIndex = ghostRolls.lastIndexOf(ghostRolls[index]); // Last index of three
        
        if(newIndex == 2) { // If three are at the front;
                           // looking at the last two numbers
            if(ghostRolls[newIndex + 1] ==
                ghostRolls[index + 2]) {
                highlightInput("scoreFullHouse");
            }
        }
    }

    /* Check if ghostRolls contains three same numbers
       and a pair to trigger score selection; three of the
       same being at the front */
    if(threeOfTheSame(2)) { // Checking last three indexes
        newIndex = ghostRolls.indexOf(ghostRolls[index]); // First index of three
        
        if(newIndex == 2) { // If three are at the back;
                            // looking at the first two numbers
            if(ghostRolls[newIndex - 1] ==
                ghostRolls[newIndex - 2]) {
                highlightInput("scoreFullHouse");
            }
        }
    }

    /* Check if ghostRolls contains four sequential values
       to trigger score selection*/
    var ghostRollsSet = new Set(ghostRolls); // Getting rid of duplicates
    var ghostRollsUnique = Array.from(ghostRollsSet); // Back to array to use indexes, sorted

    
    if(ghostRollsUnique.length >= 4) { // Has to have a list 4 numbers to compare
        for(var index = 0; index <= ghostRollsUnique.length - 4; index++) { // If length is bigger than 4
            if(ghostRollsUnique[0] == index + 1 &&
               ghostRollsUnique[1] == index + 2 &&
               ghostRollsUnique[2] == index + 3 &&
               ghostRollsUnique[3] == index + 4) {
                   highlightInput("scoreSmall");
            }
        }          
    }

    /* Check if ghostRolls contains five sequential values
       to trigger score selection*/
    if(ghostRollsUnique.length == 5) { // Only 5 dice to compare, no for loop needed
        if(ghostRollsUnique[0] == 1 &&
            ghostRollsUnique[1] == 2 &&
            ghostRollsUnique[2] == 3 &&
            ghostRollsUnique[3] == 4 &&
            ghostRollsUnique[4] == 5) {
                highlightInput("scoreLarge");
        }
    }
    
    /* Hightlight chance*/
    highlightInput("scoreChance");

    /* Check if ghostRolls contains five of the same values
       to trigger score selection*/
    if(ghostRolls[1] == ghostRolls[0] &&
        ghostRolls[2] == ghostRolls[0] &&
        ghostRolls[3] == ghostRolls[0] &&
        ghostRolls[4] == ghostRolls[0]) {
            highlightInput("scoreYahtzee");
    }

    var allInputBoxes = document.querySelectorAll("input[type=text]");

    /* for(var item = 0; item < allInputBoxes.length; item++) {
        if(allInputBoxes[item].hasAttribute("option-chosen")) {
            allInputBoxes[item].onclick
        }
    } */
}

function threeOfTheSame(index:number):boolean {
    if(ghostRolls[index] ==
       ghostRolls[index + 1] && 
       ghostRolls[index + 1] ==
       ghostRolls[index + 2]) {
           return true;
    }
    return false;
}

function highlightInput(inputName:string) {
    /* If the option-checked ISN'T present, then add option-chosen */
    if(!document.getElementById(inputName).hasAttribute("option-checked")) {
        document.getElementById(inputName).setAttribute("option-chosen", "true");
    }
}

function inputScore1() {
    if(document.getElementById("score1").hasAttribute("option-chosen")) {
        var onesTotal = 0;

        for(var i = 0; i < ghostRolls.length;i++) {
            if(ghostRolls[i] == 1) {
                onesTotal++;
            }
        }

        /* Add to singlesTotal to calcualte bonus */
        singlesTotal += onesTotal;

        (<HTMLInputElement>document.getElementById("score1")).value = onesTotal.toString();
        
        removeSingleScoreAttr("score1");

        /* Resent option-chosen attr */
        removeChosenAttr();

        /* Add current score to running total */
        runningGhostTotal(onesTotal);

        /* Turn turn over to Grim once input has been clicked */
        grimTurn();
    }
}

function inputScore2() {
    if(document.getElementById("score2").hasAttribute("option-chosen")) {
        var twosTotal = 0;

        for(var i = 0; i < ghostRolls.length;i++) {
            if(ghostRolls[i] == 2) {
                twosTotal += 2;
            }
        }

        /* Add to singlesTotal to calcualte bonus */
        singlesTotal += twosTotal;

        (<HTMLInputElement>document.getElementById("score2")).value = twosTotal.toString();
        
        removeSingleScoreAttr("score2");

        /* Resent option-chosen attr */
        removeChosenAttr();

        /* Add current score to running total */
        runningGhostTotal(twosTotal);

        /* Turn turn over to Grim once input has been clicked */
        grimTurn();
    }
}

function inputScore3() {
    if(document.getElementById("score3").hasAttribute("option-chosen")) {
        var threesTotal = 0;

        for(var i = 0; i < ghostRolls.length;i++) {
            if(ghostRolls[i] == 3) {
                threesTotal += 3;
            }
        }

        /* Add to singlesTotal to calcualte bonus */
        singlesTotal += threesTotal;

        (<HTMLInputElement>document.getElementById("score3")).value = threesTotal.toString();
        
        removeSingleScoreAttr("score3");

        /* Reset option-chosen attr */
        removeChosenAttr();

        /* Add current score to running total */
        runningGhostTotal(threesTotal);

        /* Turn turn over to Grim once input has been clicked */
        grimTurn();
    }
}

function inputScore4() {
    if(document.getElementById("score4").hasAttribute("option-chosen")) {
        var foursTotal = 0;

        for(var i = 0; i < ghostRolls.length; i++) {
            if(ghostRolls[i] == 4) {
                foursTotal += 4;
            }
        }

        /* Add to singlesTotal to calcualte bonus */
        singlesTotal += foursTotal;

        (<HTMLInputElement>document.getElementById("score4")).value = foursTotal.toString();
        
        removeSingleScoreAttr("score4");

        /* Reset option-chosen attr */
        removeChosenAttr();

        /* Add current score to running total */
        runningGhostTotal(foursTotal);

        /* Turn turn over to Grim once input has been clicked */
        grimTurn();
    }
}

function inputScore5() {
    if(document.getElementById("score5").hasAttribute("option-chosen")) {
        var fivesTotal = 0;

        for(var i = 0; i < ghostRolls.length; i++) {
            if(ghostRolls[i] == 5) {
                fivesTotal += 5;
            }
        }

        /* Add to singlesTotal to calcualte bonus */
        singlesTotal += fivesTotal;

        (<HTMLInputElement>document.getElementById("score5")).value = fivesTotal.toString();
        
        removeSingleScoreAttr("score5");

        /* Reset option-chosen attr */
        removeChosenAttr();

        /* Add current score to running total */
        runningGhostTotal(fivesTotal);

        /* Turn turn over to Grim once input has been clicked */
        grimTurn();
    }
}

function inputScore6() {
    if(document.getElementById("score6").hasAttribute("option-chosen")) {
    var sixesTotal = 0;

        for(var i = 0; i < ghostRolls.length; i++) {
            if(ghostRolls[i] == 6) {
                sixesTotal += 6;
            }
        }

        /* Add to singlesTotal to calcualte bonus */
        singlesTotal += sixesTotal;

        (<HTMLInputElement>document.getElementById("score6")).value = sixesTotal.toString();
        
        removeSingleScoreAttr("score6");

        /* Reset option-chosen attr */
        removeChosenAttr();

        /* Add current score to running total */
        runningGhostTotal(sixesTotal);

        /* Turn turn over to Grim once input has been clicked */
        grimTurn();
    }
}

function inputScoreBonus() { // Not clickable; Decide where to call!!!
    if(singlesTotal >= 63) { // 63 is bonus minimum required
        (<HTMLInputElement>document.getElementById("scoreBonus")).value = "35"; // 35 is bonus amount given
    }
}

/**
 * Calculaes and displayes the three of a kind score
 * (the sum of all dice values)
 */
function inputScoreThreeKind() {
    if(document.getElementById("scoreThreeKind").hasAttribute("option-chosen")) {
        var threeKindTotal = ghostRolls.reduce((a, b) => a + b, 0);

        (<HTMLInputElement>document.getElementById("scoreThreeKind")).value = threeKindTotal.toString();
        
        removeSingleScoreAttr("scoreThreeKind");

        /* Reset option-chosen attr */
        removeChosenAttr();

        /* Add current score to running total */
        runningGhostTotal(threeKindTotal);

        /* Turn turn over to Grim once input has been clicked */
        grimTurn();
    }
}

/**
 * Calculaes and displayes the four of a kind score
 * (the sum of all dice values)
 */
function inputScoreFourKind() {
    if(document.getElementById("scoreFourKind").hasAttribute("option-chosen")) {
        var fourKindTotal = ghostRolls.reduce((a, b) => a + b, 0);

        (<HTMLInputElement>document.getElementById("scoreFourKind")).value = fourKindTotal.toString();
        
        removeSingleScoreAttr("scoreFourKind");

        /* Reset option-chosen attr */
        removeChosenAttr();

        /* Add current score to running total */
        runningGhostTotal(fourKindTotal);

        /* Turn turn over to Grim once input has been clicked */
        grimTurn();
    }
}

function inputScoreFullHouse() {
    if(document.getElementById("scoreFullHouse").hasAttribute("option-chosen")) {
        (<HTMLInputElement>document.getElementById("scoreFullHouse")).value = "25"; // 25 is given score for a full house
        
        removeSingleScoreAttr("scoreFullHouse");

        /* Reset option-chosen attr */
        removeChosenAttr();

        /* Add current score to running total */
        runningGhostTotal(25);

        /* Turn turn over to Grim once input has been clicked */
        grimTurn();
    }
}

function inputScoreSmall() {
    if(document.getElementById("scoreSmall").hasAttribute("option-chosen")) {
        (<HTMLInputElement>document.getElementById("scoreSmall")).value = "30"; // 30 is given score for a small straight
        
        removeSingleScoreAttr("scoreSmall");

        /* Reset option-chosen attr */
        removeChosenAttr();

        /* Add current score to running total */
        runningGhostTotal(30);

        /* Turn turn over to Grim once input has been clicked */
        grimTurn();
    }
}

function inputScoreLarge() {
    if(document.getElementById("scoreLarge").hasAttribute("option-chosen")) {
        (<HTMLInputElement>document.getElementById("scoreLarge")).value = "40"; // 40 is given score for a large straight
        
        removeSingleScoreAttr("scoreLarge");

        /* Reset option-chosen attr */
        removeChosenAttr();

        /* Add current score to running total */
        runningGhostTotal(40);

        /* Turn turn over to Grim once input has been clicked */
        grimTurn();
    }
}

function inputScoreChance() {
    if(document.getElementById("scoreChance").hasAttribute("option-chosen")) {
        var chanceTotal = ghostRolls.reduce((a,b) => a + b, 0);

        (<HTMLInputElement>document.getElementById("scoreChance")).value = 
                                                    chanceTotal.toString(); // 40 is given score for a large straight
        
        removeSingleScoreAttr("scoreChance");

        /* Reset option-chosen attr */
        removeChosenAttr();

        /* Add current score to running total */
        runningGhostTotal(chanceTotal);

        /* Turn turn over to Grim once input has been clicked */
        grimTurn();
    }
}

function inputScoreYahtzee() {
    if(document.getElementById("scoreYahtzee").hasAttribute("option-chosen")) {
        (<HTMLInputElement>document.getElementById("scoreYahtzee")).value = "50"; // 50 is given score for a yahtzee
        
        removeSingleScoreAttr("scoreYahtzee");

        /* Reset option-chosen attr */
        removeChosenAttr();

        /* Add current score to running total */
        runningGhostTotal(50);

        /* Turn turn over to Grim once input has been clicked */
        grimTurn();
    }
}

function removeSingleScoreAttr(inputName:string) {
    document.getElementById(inputName).removeAttribute("option-chosen");
    document.getElementById(inputName).setAttribute("option-checked", "true");
}

function removeChosenAttr() {
    var optionsChecked = document.querySelectorAll("input");

    for(var item = 0; item < optionsChecked.length; item++) {
        if(optionsChecked[item].hasAttribute("option-chosen")){
            optionsChecked[item].removeAttribute("option-chosen");
        }
    }
}

function getGhostInputBoxName(digitCode:number):string {
    if(digitCode == 0) {
        return "score1";
    }
    else if(digitCode == 1){
        return "score2";
    }
    else if(digitCode == 2){
        return "score3";
    }
    else if(digitCode == 3){
        return "score4";
    }
    else if(digitCode == 4){
        return "score5";
    }
    else if(digitCode == 5){
        return "score6";
    }
    else if(digitCode == 6){
        return "scoreBonus";
    }
    else if(digitCode == 7){
        return "scoreThreeKind";
    }
    else if(digitCode == 8){
        return "scoreFourKind";
    }
    else if(digitCode == 9){
        return "scoreFullHouse";
    }
    else if(digitCode == 10){
        return "scoreSmall";
    }
    else if(digitCode == 11){
        return "scoreLarge";
    }
    else if(digitCode == 12){
        return "scoreChance";
    }
    else if(digitCode == 13){
        return "scoreYahtzee";
    }
}

function grimTurn() { // Oversimplification of scoring
    alert("Grims turn");

    /* Clear rolls from ghost side and add them to Grim side */
    document.getElementById("rollNumber").innerHTML = "&nbsp;";
    document.getElementById("grimTurn").innerHTML = "Playing..."

    /* Clear all ghost fields and disable roll button */
    ghostRolls = new Array(5);
    rollCounter = 0;
    document.getElementById("roll").setAttribute("disabled", "true");
    removeAllDataClickedAttr();

    /* Generate random numbers for each score box */
    var inputBox = Math.floor(Math.random() * 13) + 1;
    var numberOfDice = Math.floor(Math.random() * 4) + 1; // Doubles as dice value
    var diceValue = Math.floor(Math.random() * 6) + 1; 
    var coinFlip = Math.floor(Math.random() * 2) + 1; 
    var yahtzeeFlip = Math.floor(Math.random() * 5) + 1; 

    /* Testing */
    console.log(inputBox);

    if(notAlreadyScored(getGrimInputBoxName(inputBox))) {
        if(inputBox == 1) {
            /* For ones, generate a random number between 0 and 4 (not 5 otherwise
            it would be a yahtzee)*/
            (<HTMLInputElement>document.getElementById("gScore1")).value = 
                                                        numberOfDice.toString();

            /* Add score to class */
            setGrimScoredAttr("gScore1");

            /* Add score to running grim total */
            runningGrimtTotal(numberOfDice);
        }
        else if(inputBox == 2) {
            (<HTMLInputElement>document.getElementById("gScore2")).value = 
                                                    (numberOfDice * 2).toString();

            /* Add score to class */
            setGrimScoredAttr("gScore2");

            /* Add score to running grim total */
            runningGrimtTotal(numberOfDice * 2);
        }
        else if(inputBox == 3) {
            (<HTMLInputElement>document.getElementById("gScore3")).value = 
                                                    (numberOfDice * 3).toString();

            /* Add score to class */
            setGrimScoredAttr("gScore3");

            /* Add score to running grim total */
            runningGrimtTotal(numberOfDice * 3);
        }
        else if(inputBox == 4) {
            (<HTMLInputElement>document.getElementById("gScore4")).value = 
                                                    (numberOfDice * 4).toString();

            /* Add score to class */
            setGrimScoredAttr("gScore4");

            /* Add score to running grim total */
            runningGrimtTotal(numberOfDice * 4);
        }
        else if(inputBox == 5) {
            (<HTMLInputElement>document.getElementById("gScore5")).value = 
                                                    (numberOfDice * 5).toString();

            /* Add score to class */
            setGrimScoredAttr("gScore5");

            /* Add score to running grim total */
            runningGrimtTotal(numberOfDice * 5);
        }
        else if(inputBox == 6) {
            (<HTMLInputElement>document.getElementById("gScore6")).value = 
                                                    (numberOfDice * 6).toString();
            
            /* Add score to class */
            setGrimScoredAttr("gScore6");

            /* Add score to running grim total */
            runningGrimtTotal(numberOfDice * 6);
        }
        else if(inputBox == 7) { // Skipping bonus
            (<HTMLInputElement>document.getElementById("gScoreThreeKind")).value = 
                                                    ((diceValue * 3) + // The three dice added together
                                                    (Math.floor(Math.random() * 6) + 1) + // Plus one random die
                                                    (Math.floor(Math.random() * 6) + 1) ).toString(); // Plus one random die
                        
            /* Add score to class */
            setGrimScoredAttr("gScoreThreeKind");

            /* Add score to running grim total */
            runningGrimtTotal((diceValue * 3) +
                              (Math.floor(Math.random() * 6) + 1) +
                              (Math.floor(Math.random() * 6) + 1));
        }
        else if(inputBox == 8) { 
            (<HTMLInputElement>document.getElementById("gScoreFourKind")).value = 
                                                    ((diceValue * 4) + // The four dice added together
                                                    (Math.floor(Math.random() * 6) + 1) ).toString(); // Plus one random die
                                        
            /* Add score to class */
            setGrimScoredAttr("gScoreFourKind");

            /* Add score to running grim total */
            runningGrimtTotal((diceValue * 4) +
                              (Math.floor(Math.random() * 6) + 1));
        }
        else if(inputBox == 9) { 
            if(coinFlip == 2) {
                (<HTMLInputElement>document.getElementById("gScoreFullHouse")).value = "25";

                /* Add score to class */
               setGrimScoredAttr("gScoreFullHouse");

               /* Add score to running grim total */
                runningGrimtTotal(25);
            }
            else {
                (<HTMLInputElement>document.getElementById("gScoreFullHouse")).value = "0";

                /* Add score to class */
                setGrimScoredAttr("gScoreFullHouse");

                /* Add score to running grim total */
                runningGrimtTotal(0); // To show 0 in total box if chosen first
            }
        }
        else if(inputBox == 10) { 
            if(coinFlip == 1) {
                (<HTMLInputElement>document.getElementById("gScoreSmall")).value = "30";

                /* Add score to class */
                setGrimScoredAttr("gScoreSmall");

                /* Add score to running grim total */
                runningGrimtTotal(30);
            }
            else {
                (<HTMLInputElement>document.getElementById("gScoreSmall")).value = "0";

                /* Add score to class */
                setGrimScoredAttr("gScoreSmall");

                /* Add score to running grim total */
                runningGrimtTotal(0); // To show 0 in total box if chosen first
            }
        }
        else if(inputBox == 11) { 
            if(coinFlip == 2) {
                (<HTMLInputElement>document.getElementById("gScoreLarge")).value = "40";

                /* Add score to class */
                setGrimScoredAttr("gScoreLarge");

                /* Add score to running grim total */
                runningGrimtTotal(40);
            }
            else {
                (<HTMLInputElement>document.getElementById("gScoreLarge")).value = "0";

                /* Add score to class */
                setGrimScoredAttr("gScoreLarge");

                /* Add score to running grim total */
                runningGrimtTotal(0); // To show 0 in total box if chosen first
            }
        }
        else if(inputBox == 12) { 
            (<HTMLInputElement>document.getElementById("gScoreChance")).value = 
                                                    (Math.floor(Math.random() * 30) + 5).toString(); // Max value 6 per each of the 5 die
                                                                                                     // Min value of 1 per each of the 5 die
            /* Add score to class */
            setGrimScoredAttr("gScoreChance");
            
            /* Add score to running grim total */
            runningGrimtTotal(Math.floor(Math.random() * 30) + 5);
        }
        else { 
            if(yahtzeeFlip == coinFlip) {
                (<HTMLInputElement>document.getElementById("gScoreYahtzee")).value = "50";

                /* Add score to class */
                setGrimScoredAttr("gScoreYahtzee");

                /* Add score to running grim total */
                runningGrimtTotal(50);
            }
            else {
                (<HTMLInputElement>document.getElementById("gScoreYahtzee")).value = "0"; 

                /* Add score to class */
                setGrimScoredAttr("gScoreYahtzee");

                /* Add score to running grim total */
                runningGrimtTotal(0); // To show 0 in total box if chosen first
            }
        }
    }
    else {
        grimTurn();
    }

    //#region For Later Updates

    /* For more accurate playing with updates */

    // Clear rolls from ghost side and add them to Grim side 
    /*document.getElementById("rollNumber").innerHTML = "&nbsp;";
    document.getElementById("grimTurn").innerHTML = "Playing..."

    // Clear all ghost fields and disable roll button
    ghostRolls = new Array(5);
    rollCounter = 0;
    document.getElementById("roll").setAttribute("disabled", "true");

    // Generate random Array for Grim 
    var grimRolls = new Array(5);

    for(var index = 0; index < grimRolls.length; index++) {
        grimRolls[index] = Math.floor(Math.random() * 6) + 1;
    }

    // Check grim rolls
    grimRolls.sort();

    if(grimRolls.indexOf(1) > -1) {
        (<HTMLInputElement>document.getElementById("gScore1")).value = "1";
    }*/
    //#endregion
}

/**
 * Returns true if the input box has the "grim-scored" attribute and
 * false if it doesn't
 * @param inputBox The input box name to check the "grim-scored"
 * attribute
 * @returns boolean
 */
function notAlreadyScored(inputBox:string):boolean {    
    if(document.getElementById(inputBox).hasAttribute("grim-scored")) {
        return false;
    }
    return true;
}

/**
 * Converts an input box number into a input box name
 * @param digitCode 
 */
function getGrimInputBoxName(digitCode:number):string {
    if(digitCode == 1) {
        return "gScore1";
    }
    else if(digitCode == 2){
        return "gScore2";
    }
    else if(digitCode == 3){
        return "gScore3";
    }
    else if(digitCode == 4){
        return "gScore4";
    }
    else if(digitCode == 5){
        return "gScore5";
    }
    else if(digitCode == 6){
        return "gScore6";
    }
    else if(digitCode == 7){
        return "gScoreThreeKind";
    }
    else if(digitCode == 8){
        return "gScoreFourKind";
    }
    else if(digitCode == 9){
        return "gScoreFullHouse";
    }
    else if(digitCode == 11){
        return "gScoreSmall";
    }
    else if(digitCode == 10){
        return "gScoreLarge";
    }
    else if(digitCode == 12){
        return "gScoreChance";
    }
    else { // digitCode == 13
        return "gScoreYahtzee";
    }
}

/**
 * Marks all input boxes with a score by adding the "grim-scored"
 * attribute
 * @param inputBox The input box name to set the attribute for
 */
function setGrimScoredAttr (inputBox:string) {
    document.getElementById(inputBox).setAttribute("grim-scored", "true");

    /* Back to ghost turn */
    generateRandomRolls();
}
//#endregion

/*//////////////////////////////////////// Game Play (Final Scores) ////////////////////////////////////////*/

var ghostGrandTotal = 0;
var grimGrandTotal = 0;

function runningGhostTotal(score:number) {
    (<HTMLInputElement>document.getElementById("scoreTotal")).value = 
                                              (ghostGrandTotal += score).toString();
}

function runningGrimtTotal(score:number) {
    (<HTMLInputElement>document.getElementById("gScoreTotal")).value = 
                                              (grimGrandTotal += score).toString();
}

