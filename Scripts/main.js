window.onload = function main() {
    document.getElementById("ghostImg").onclick = changeGhost;
    document.getElementById("start").onclick = startGame;
    document.getElementById("roll").onclick = generateRandomRolls;
    document.getElementById("0").onclick = retainDice1;
    document.getElementById("1").onclick = retainDice2;
    document.getElementById("2").onclick = retainDice3;
    document.getElementById("3").onclick = retainDice4;
    document.getElementById("4").onclick = retainDice5;
    let inputBoxes = document.querySelectorAll("#ghostScores input");
    for (var item = 0; item < inputBoxes.length; item++) {
        if (getGhostInputBoxName(item) == "score1") {
            document.getElementById(getGhostInputBoxName(item)).onclick = inputScore1;
        }
        else if (getGhostInputBoxName(item) == "score2") {
            document.getElementById(getGhostInputBoxName(item)).onclick = inputScore2;
        }
        else if (getGhostInputBoxName(item) == "score3") {
            document.getElementById(getGhostInputBoxName(item)).onclick = inputScore3;
        }
        else if (getGhostInputBoxName(item) == "score4") {
            document.getElementById(getGhostInputBoxName(item)).onclick = inputScore4;
        }
        else if (getGhostInputBoxName(item) == "score5") {
            document.getElementById(getGhostInputBoxName(item)).onclick = inputScore5;
        }
        else if (getGhostInputBoxName(item) == "score6") {
            document.getElementById(getGhostInputBoxName(item)).onclick = inputScore6;
        }
        else if (getGhostInputBoxName(item) == "scoreThreeKind") {
            document.getElementById(getGhostInputBoxName(item)).onclick = inputScoreThreeKind;
        }
        else if (getGhostInputBoxName(item) == "scoreFourKind") {
            document.getElementById(getGhostInputBoxName(item)).onclick = inputScoreFourKind;
        }
        else if (getGhostInputBoxName(item) == "scoreFullHouse") {
            document.getElementById(getGhostInputBoxName(item)).onclick = inputScoreFullHouse;
        }
        else if (getGhostInputBoxName(item) == "scoreSmall") {
            document.getElementById(getGhostInputBoxName(item)).onclick = inputScoreSmall;
        }
        else if (getGhostInputBoxName(item) == "scoreLarge") {
            document.getElementById(getGhostInputBoxName(item)).onclick = inputScoreLarge;
        }
        else if (getGhostInputBoxName(item) == "scoreChance") {
            document.getElementById(getGhostInputBoxName(item)).onclick = inputScoreChance;
        }
        else if (getGhostInputBoxName(item) == "scoreYahtzee") {
            document.getElementById(getGhostInputBoxName(item)).onclick = inputScoreYahtzee;
        }
        inputBoxes[item].onfocus = function () {
            this.blur();
        };
    }
};
function changeGhost() {
    var general = "Images/Ghost.gif";
    var bowTie = "Images/GhostAndBowTie.gif";
    var flower = "Images/GhostWithFlower.gif";
    var sunglasses = "Images/SunglassesGhost.gif";
    if (obtainImgSrcAttribute() == general) {
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
function startGame() {
    var buttons = document.querySelectorAll("button");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].removeAttribute("hidden");
    }
    document.getElementById("graveImg").setAttribute("hidden", "true");
    document.getElementById("ghostImg").removeAttribute("hidden");
    document.getElementById("youLabel").innerHTML = "You";
    document.getElementById("start").setAttribute("disabled", "true");
    document.getElementById("start").innerHTML = "&cross;";
    generateRandomRolls();
}
let ghostRolls = new Array(5);
let rollCounter = 0;
function generateRandomRolls() {
    if (document.getElementById("roll").hasAttribute("disabled")) {
        document.getElementById("roll").removeAttribute("disabled");
        document.getElementById("grimTurn").innerHTML = "&nbsp;";
    }
    if (rollCounter <= 3 && anyEnabledButtons()) {
        for (var index = 0; index < ghostRolls.length; index++) {
            if (!document.getElementById(index.toString()).hasAttribute("data-clicked")) {
                ghostRolls[index] = Math.floor(Math.random() * 6) + 1;
                document.getElementById(index.toString()).innerHTML = ghostRolls[index];
            }
        }
        rollCounter++;
        document.getElementById("rollNumber").innerHTML = "Roll " + (rollCounter);
        if (rollCounter == 3) {
            document.getElementById("roll").setAttribute("disabled", "true");
            checkGhostRolls();
        }
    }
    else {
        checkGhostRolls();
    }
}
function anyEnabledButtons() {
    var buttons = document.querySelectorAll(".die");
    for (var i = 0; i < buttons.length; i++) {
        if (!buttons[i].hasAttribute("data-clicked")) {
            return true;
        }
    }
    return false;
}
function retainDice1() {
    if (checkDataClickedAttr("0")) {
        return;
    }
    else {
        retainRolls("0");
    }
}
function retainDice2() {
    if (checkDataClickedAttr("1")) {
        return;
    }
    else {
        retainRolls("1");
    }
}
function retainDice3() {
    if (checkDataClickedAttr("2")) {
        return;
    }
    else {
        retainRolls("2");
    }
}
function retainDice4() {
    if (checkDataClickedAttr("3")) {
        return;
    }
    else {
        retainRolls("3");
    }
}
function retainDice5() {
    if (checkDataClickedAttr("4")) {
        return;
    }
    else {
        retainRolls("4");
    }
}
function checkDataClickedAttr(diceNumber) {
    if (document.getElementById(diceNumber).hasAttribute("data-clicked")) {
        document.getElementById(diceNumber).removeAttribute("data-clicked");
        return true;
    }
    return false;
}
function removeAllDataClickedAttr() {
    var ghostButtons = document.querySelectorAll("#ghostRolls button");
    for (var i = 0; i < 5; i++) {
        if (document.getElementById(i.toString()).hasAttribute("data-clicked")) {
            document.getElementById(i.toString()).removeAttribute("data-clicked");
        }
    }
}
function retainRolls(diceNumber) {
    if (rollCounter > 0) {
        document.getElementById(diceNumber).setAttribute("data-clicked", "true");
    }
}
var singlesTotal = 0;
function checkGhostRolls() {
    removeChosenAttr();
    ghostRolls.sort();
    for (let diceValue = 1; diceValue <= 6; diceValue++) {
        if (ghostRolls.indexOf(diceValue) > -1) {
            highlightInput("score" + diceValue.toString());
        }
    }
    for (var index = 0; index < ghostRolls.length - 2; index++) {
        if (threeOfTheSame(index)) {
            highlightInput("scoreThreeKind");
        }
    }
    for (var index = 0; index < ghostRolls.length - 3; index++) {
        if (ghostRolls[index] ==
            ghostRolls[index + 1] &&
            ghostRolls[index + 1] ==
                ghostRolls[index + 2] &&
            ghostRolls[index + 2] ==
                ghostRolls[index + 3]) {
            highlightInput("scoreFourKind");
        }
    }
    var newIndex = 0;
    if (threeOfTheSame(0)) {
        newIndex = ghostRolls.lastIndexOf(ghostRolls[index]);
        if (newIndex == 2) {
            if (ghostRolls[newIndex + 1] ==
                ghostRolls[index + 2]) {
                highlightInput("scoreFullHouse");
            }
        }
    }
    if (threeOfTheSame(2)) {
        newIndex = ghostRolls.indexOf(ghostRolls[index]);
        if (newIndex == 2) {
            if (ghostRolls[newIndex - 1] ==
                ghostRolls[newIndex - 2]) {
                highlightInput("scoreFullHouse");
            }
        }
    }
    var ghostRollsSet = new Set(ghostRolls);
    var ghostRollsUnique = Array.from(ghostRollsSet);
    if (ghostRollsUnique.length >= 4) {
        for (var index = 0; index <= ghostRollsUnique.length - 4; index++) {
            if (ghostRollsUnique[0] == index + 1 &&
                ghostRollsUnique[1] == index + 2 &&
                ghostRollsUnique[2] == index + 3 &&
                ghostRollsUnique[3] == index + 4) {
                highlightInput("scoreSmall");
            }
        }
    }
    if (ghostRollsUnique.length == 5) {
        if (ghostRollsUnique[0] == 1 &&
            ghostRollsUnique[1] == 2 &&
            ghostRollsUnique[2] == 3 &&
            ghostRollsUnique[3] == 4 &&
            ghostRollsUnique[4] == 5) {
            highlightInput("scoreLarge");
        }
    }
    highlightInput("scoreChance");
    if (ghostRolls[1] == ghostRolls[0] &&
        ghostRolls[2] == ghostRolls[0] &&
        ghostRolls[3] == ghostRolls[0] &&
        ghostRolls[4] == ghostRolls[0]) {
        highlightInput("scoreYahtzee");
    }
    var allInputBoxes = document.querySelectorAll("input[type=text]");
}
function threeOfTheSame(index) {
    if (ghostRolls[index] ==
        ghostRolls[index + 1] &&
        ghostRolls[index + 1] ==
            ghostRolls[index + 2]) {
        return true;
    }
    return false;
}
function highlightInput(inputName) {
    if (!document.getElementById(inputName).hasAttribute("option-checked")) {
        document.getElementById(inputName).setAttribute("option-chosen", "true");
    }
}
function inputScore1() {
    if (document.getElementById("score1").hasAttribute("option-chosen")) {
        var onesTotal = 0;
        for (var i = 0; i < ghostRolls.length; i++) {
            if (ghostRolls[i] == 1) {
                onesTotal++;
            }
        }
        singlesTotal += onesTotal;
        document.getElementById("score1").value = onesTotal.toString();
        removeSingleScoreAttr("score1");
        removeChosenAttr();
        runningGhostTotal(onesTotal);
        grimTurn();
    }
}
function inputScore2() {
    if (document.getElementById("score2").hasAttribute("option-chosen")) {
        var twosTotal = 0;
        for (var i = 0; i < ghostRolls.length; i++) {
            if (ghostRolls[i] == 2) {
                twosTotal += 2;
            }
        }
        singlesTotal += twosTotal;
        document.getElementById("score2").value = twosTotal.toString();
        removeSingleScoreAttr("score2");
        removeChosenAttr();
        runningGhostTotal(twosTotal);
        grimTurn();
    }
}
function inputScore3() {
    if (document.getElementById("score3").hasAttribute("option-chosen")) {
        var threesTotal = 0;
        for (var i = 0; i < ghostRolls.length; i++) {
            if (ghostRolls[i] == 3) {
                threesTotal += 3;
            }
        }
        singlesTotal += threesTotal;
        document.getElementById("score3").value = threesTotal.toString();
        removeSingleScoreAttr("score3");
        removeChosenAttr();
        runningGhostTotal(threesTotal);
        grimTurn();
    }
}
function inputScore4() {
    if (document.getElementById("score4").hasAttribute("option-chosen")) {
        var foursTotal = 0;
        for (var i = 0; i < ghostRolls.length; i++) {
            if (ghostRolls[i] == 4) {
                foursTotal += 4;
            }
        }
        singlesTotal += foursTotal;
        document.getElementById("score4").value = foursTotal.toString();
        removeSingleScoreAttr("score4");
        removeChosenAttr();
        runningGhostTotal(foursTotal);
        grimTurn();
    }
}
function inputScore5() {
    if (document.getElementById("score5").hasAttribute("option-chosen")) {
        var fivesTotal = 0;
        for (var i = 0; i < ghostRolls.length; i++) {
            if (ghostRolls[i] == 5) {
                fivesTotal += 5;
            }
        }
        singlesTotal += fivesTotal;
        document.getElementById("score5").value = fivesTotal.toString();
        removeSingleScoreAttr("score5");
        removeChosenAttr();
        runningGhostTotal(fivesTotal);
        grimTurn();
    }
}
function inputScore6() {
    if (document.getElementById("score6").hasAttribute("option-chosen")) {
        var sixesTotal = 0;
        for (var i = 0; i < ghostRolls.length; i++) {
            if (ghostRolls[i] == 6) {
                sixesTotal += 6;
            }
        }
        singlesTotal += sixesTotal;
        document.getElementById("score6").value = sixesTotal.toString();
        removeSingleScoreAttr("score6");
        removeChosenAttr();
        runningGhostTotal(sixesTotal);
        grimTurn();
    }
}
function inputScoreBonus() {
    if (singlesTotal >= 63) {
        document.getElementById("scoreBonus").value = "35";
    }
}
function inputScoreThreeKind() {
    if (document.getElementById("scoreThreeKind").hasAttribute("option-chosen")) {
        var threeKindTotal = ghostRolls.reduce((a, b) => a + b, 0);
        document.getElementById("scoreThreeKind").value = threeKindTotal.toString();
        removeSingleScoreAttr("scoreThreeKind");
        removeChosenAttr();
        runningGhostTotal(threeKindTotal);
        grimTurn();
    }
}
function inputScoreFourKind() {
    if (document.getElementById("scoreFourKind").hasAttribute("option-chosen")) {
        var fourKindTotal = ghostRolls.reduce((a, b) => a + b, 0);
        document.getElementById("scoreFourKind").value = fourKindTotal.toString();
        removeSingleScoreAttr("scoreFourKind");
        removeChosenAttr();
        runningGhostTotal(fourKindTotal);
        grimTurn();
    }
}
function inputScoreFullHouse() {
    if (document.getElementById("scoreFullHouse").hasAttribute("option-chosen")) {
        document.getElementById("scoreFullHouse").value = "25";
        removeSingleScoreAttr("scoreFullHouse");
        removeChosenAttr();
        runningGhostTotal(25);
        grimTurn();
    }
}
function inputScoreSmall() {
    if (document.getElementById("scoreSmall").hasAttribute("option-chosen")) {
        document.getElementById("scoreSmall").value = "30";
        removeSingleScoreAttr("scoreSmall");
        removeChosenAttr();
        runningGhostTotal(30);
        grimTurn();
    }
}
function inputScoreLarge() {
    if (document.getElementById("scoreLarge").hasAttribute("option-chosen")) {
        document.getElementById("scoreLarge").value = "40";
        removeSingleScoreAttr("scoreLarge");
        removeChosenAttr();
        runningGhostTotal(40);
        grimTurn();
    }
}
function inputScoreChance() {
    if (document.getElementById("scoreChance").hasAttribute("option-chosen")) {
        var chanceTotal = ghostRolls.reduce((a, b) => a + b, 0);
        document.getElementById("scoreChance").value =
            chanceTotal.toString();
        removeSingleScoreAttr("scoreChance");
        removeChosenAttr();
        runningGhostTotal(chanceTotal);
        grimTurn();
    }
}
function inputScoreYahtzee() {
    if (document.getElementById("scoreYahtzee").hasAttribute("option-chosen")) {
        document.getElementById("scoreYahtzee").value = "50";
        removeSingleScoreAttr("scoreYahtzee");
        removeChosenAttr();
        runningGhostTotal(50);
        grimTurn();
    }
}
function removeSingleScoreAttr(inputName) {
    document.getElementById(inputName).removeAttribute("option-chosen");
    document.getElementById(inputName).setAttribute("option-checked", "true");
}
function removeChosenAttr() {
    var optionsChecked = document.querySelectorAll("input");
    for (var item = 0; item < optionsChecked.length; item++) {
        if (optionsChecked[item].hasAttribute("option-chosen")) {
            optionsChecked[item].removeAttribute("option-chosen");
        }
    }
}
function getGhostInputBoxName(digitCode) {
    if (digitCode == 0) {
        return "score1";
    }
    else if (digitCode == 1) {
        return "score2";
    }
    else if (digitCode == 2) {
        return "score3";
    }
    else if (digitCode == 3) {
        return "score4";
    }
    else if (digitCode == 4) {
        return "score5";
    }
    else if (digitCode == 5) {
        return "score6";
    }
    else if (digitCode == 6) {
        return "scoreBonus";
    }
    else if (digitCode == 7) {
        return "scoreThreeKind";
    }
    else if (digitCode == 8) {
        return "scoreFourKind";
    }
    else if (digitCode == 9) {
        return "scoreFullHouse";
    }
    else if (digitCode == 10) {
        return "scoreSmall";
    }
    else if (digitCode == 11) {
        return "scoreLarge";
    }
    else if (digitCode == 12) {
        return "scoreChance";
    }
    else if (digitCode == 13) {
        return "scoreYahtzee";
    }
}
function grimTurn() {
    alert("Grims turn");
    document.getElementById("rollNumber").innerHTML = "&nbsp;";
    document.getElementById("grimTurn").innerHTML = "Playing...";
    ghostRolls = new Array(5);
    rollCounter = 0;
    document.getElementById("roll").setAttribute("disabled", "true");
    removeAllDataClickedAttr();
    var inputBox = Math.floor(Math.random() * 13) + 1;
    var numberOfDice = Math.floor(Math.random() * 4) + 1;
    var diceValue = Math.floor(Math.random() * 6) + 1;
    var coinFlip = Math.floor(Math.random() * 2) + 1;
    var yahtzeeFlip = Math.floor(Math.random() * 5) + 1;
    console.log(inputBox);
    if (notAlreadyScored(getGrimInputBoxName(inputBox))) {
        if (inputBox == 1) {
            document.getElementById("gScore1").value =
                numberOfDice.toString();
            setGrimScoredAttr("gScore1");
            runningGrimtTotal(numberOfDice);
        }
        else if (inputBox == 2) {
            document.getElementById("gScore2").value =
                (numberOfDice * 2).toString();
            setGrimScoredAttr("gScore2");
            runningGrimtTotal(numberOfDice * 2);
        }
        else if (inputBox == 3) {
            document.getElementById("gScore3").value =
                (numberOfDice * 3).toString();
            setGrimScoredAttr("gScore3");
            runningGrimtTotal(numberOfDice * 3);
        }
        else if (inputBox == 4) {
            document.getElementById("gScore4").value =
                (numberOfDice * 4).toString();
            setGrimScoredAttr("gScore4");
            runningGrimtTotal(numberOfDice * 4);
        }
        else if (inputBox == 5) {
            document.getElementById("gScore5").value =
                (numberOfDice * 5).toString();
            setGrimScoredAttr("gScore5");
            runningGrimtTotal(numberOfDice * 5);
        }
        else if (inputBox == 6) {
            document.getElementById("gScore6").value =
                (numberOfDice * 6).toString();
            setGrimScoredAttr("gScore6");
            runningGrimtTotal(numberOfDice * 6);
        }
        else if (inputBox == 7) {
            document.getElementById("gScoreThreeKind").value =
                ((diceValue * 3) +
                    (Math.floor(Math.random() * 6) + 1) +
                    (Math.floor(Math.random() * 6) + 1)).toString();
            setGrimScoredAttr("gScoreThreeKind");
            runningGrimtTotal((diceValue * 3) +
                (Math.floor(Math.random() * 6) + 1) +
                (Math.floor(Math.random() * 6) + 1));
        }
        else if (inputBox == 8) {
            document.getElementById("gScoreFourKind").value =
                ((diceValue * 4) +
                    (Math.floor(Math.random() * 6) + 1)).toString();
            setGrimScoredAttr("gScoreFourKind");
            runningGrimtTotal((diceValue * 4) +
                (Math.floor(Math.random() * 6) + 1));
        }
        else if (inputBox == 9) {
            if (coinFlip == 2) {
                document.getElementById("gScoreFullHouse").value = "25";
                setGrimScoredAttr("gScoreFullHouse");
                runningGrimtTotal(25);
            }
            else {
                document.getElementById("gScoreFullHouse").value = "0";
                setGrimScoredAttr("gScoreFullHouse");
                runningGrimtTotal(0);
            }
        }
        else if (inputBox == 10) {
            if (coinFlip == 1) {
                document.getElementById("gScoreSmall").value = "30";
                setGrimScoredAttr("gScoreSmall");
                runningGrimtTotal(30);
            }
            else {
                document.getElementById("gScoreSmall").value = "0";
                setGrimScoredAttr("gScoreSmall");
                runningGrimtTotal(0);
            }
        }
        else if (inputBox == 11) {
            if (coinFlip == 2) {
                document.getElementById("gScoreLarge").value = "40";
                setGrimScoredAttr("gScoreLarge");
                runningGrimtTotal(40);
            }
            else {
                document.getElementById("gScoreLarge").value = "0";
                setGrimScoredAttr("gScoreLarge");
                runningGrimtTotal(0);
            }
        }
        else if (inputBox == 12) {
            document.getElementById("gScoreChance").value =
                (Math.floor(Math.random() * 30) + 5).toString();
            setGrimScoredAttr("gScoreChance");
            runningGrimtTotal(Math.floor(Math.random() * 30) + 5);
        }
        else {
            if (yahtzeeFlip == coinFlip) {
                document.getElementById("gScoreYahtzee").value = "50";
                setGrimScoredAttr("gScoreYahtzee");
                runningGrimtTotal(50);
            }
            else {
                document.getElementById("gScoreYahtzee").value = "0";
                setGrimScoredAttr("gScoreYahtzee");
                runningGrimtTotal(0);
            }
        }
    }
    else {
        grimTurn();
    }
}
function notAlreadyScored(inputBox) {
    if (document.getElementById(inputBox).hasAttribute("grim-scored")) {
        return false;
    }
    return true;
}
function getGrimInputBoxName(digitCode) {
    if (digitCode == 1) {
        return "gScore1";
    }
    else if (digitCode == 2) {
        return "gScore2";
    }
    else if (digitCode == 3) {
        return "gScore3";
    }
    else if (digitCode == 4) {
        return "gScore4";
    }
    else if (digitCode == 5) {
        return "gScore5";
    }
    else if (digitCode == 6) {
        return "gScore6";
    }
    else if (digitCode == 7) {
        return "gScoreThreeKind";
    }
    else if (digitCode == 8) {
        return "gScoreFourKind";
    }
    else if (digitCode == 9) {
        return "gScoreFullHouse";
    }
    else if (digitCode == 11) {
        return "gScoreSmall";
    }
    else if (digitCode == 10) {
        return "gScoreLarge";
    }
    else if (digitCode == 12) {
        return "gScoreChance";
    }
    else {
        return "gScoreYahtzee";
    }
}
function setGrimScoredAttr(inputBox) {
    document.getElementById(inputBox).setAttribute("grim-scored", "true");
    generateRandomRolls();
}
var ghostGrandTotal = 0;
var grimGrandTotal = 0;
function runningGhostTotal(score) {
    document.getElementById("scoreTotal").value =
        (ghostGrandTotal += score).toString();
}
function runningGrimtTotal(score) {
    document.getElementById("gScoreTotal").value =
        (grimGrandTotal += score).toString();
}
