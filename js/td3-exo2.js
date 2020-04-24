let grille = [] //global variable

function init(){
    for (let i = 0; i <= 3; i++) { // i = ligne
        grille[i] = [] //creation tableau multidimentional
        for (let j = 0; j <= 3; j++) { // j = colonne
            grille[i][j] = new maCase;
        }
    }
    insertionValeur()
    insertionValeur()
    addEventListener("keydown", actionClavier)

    afficherGrille()
    console.log(grille) //test
}

class maCase {
    constructor() {
        this.value = null
        this.lastInsert = false
    }
}

function insertionValeur() { //insertion 2 valeurs random à l'initialisation
    rand1 = MathRandomInt(0, 3)
    rand2 = MathRandomInt(0, 3)
    grille[rand1][rand2].value = Math.random() < 0.9 ? 2 : 4

}

function actionClavier(e) {
    if (e.keyCode === 38) { //up
        deplacementVersHaut()
    }
    else if (e.keyCode === 40) { //down
        deplacementVersBas()
    }
    else if (e.keyCode === 37) { //left
        deplacementVersGauche()
    }
    else if (e.keyCode === 39) { //right
        deplacementVersDroite()
    }
}

function deplacementVersHaut() {
    //TODO
}

function deplacementVersBas() {
    //TODO
}

function deplacementVersGauche() {
    //TODO
}

function deplacementVersDroite() {
    for (let i = 0; i <= 3; i++) { // i = ligne
        if (!emptyLine(i)) { //
            //TODO::tout decaller à droite

            //pour chaque colonne decroissant, si vide on cherche la valeur la plus proche, on ramene a droite




            //fusionner les cases de meme valeur

            //supprimer les blancs generé
        }
    }
}

function afficherGrille() {
    let cases = document.querySelectorAll(".case")
    let actualCase = 0
    for (let i = 0; i <= 3; i++) { // i = ligne
        for (let j = 0; j <= 3; j++) { // j = colonne
            cases[actualCase].innerHTML = grille[i][j].value
            actualCase++
        }
    }
}
/*************************************************************/
function MathRandomInt(min, max) {
    return Math.floor(Math.random() * (max+1)) + (min)
}

function emptyLine(line) {
    for (let j = 0; j <= 3; j++) { //pour chaque colonne
        if(grille[line][j].value !== null) { //si une colonne est pas vide
            return false //direct return false
        }
    }
    return true //sinon return true
}

function emptyColumn(column) {
    for (let i = 0; i <= 3; i++) { //pour chaque colonne
        if(grille[i][column].value !== null) { //si une colonne est pas vide
            return false //direct return false
        }
    }
    return true //sinon return true
}
