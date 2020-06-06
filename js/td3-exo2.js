let grille = [] //global variable
let lastCase = []

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

function insertionValeur() {
    let case_vide = obtenirCaseVide()
    if (Array.isArray((case_vide))) {
        grille[case_vide[0]][case_vide[1]].value = obtenirNouvelleValeur()
        lastCase = [case_vide[0], case_vide[1]]
    }
}

function obtenirNouvelleValeur() {
    return Math.random() < 0.9 ? 2 : 4
}

function obtenirCaseVide() {
    let cases_vide = []
    for (let i = 0; i <= 3; i++) { // i = ligne
        for (let j = 0; j <= 3; j++) { // j = colonne
            if (!grille[i][j].value) {
                cases_vide.push([i,j]) //stockage des cases vides dans tableau temporaire
            }
        }
    }
    return cases_vide[MathRandomInt(0, cases_vide.length - 1)] //choix d'une case random du tableau de cases vide
}

function actionClavier(e) {
    switch (e.keyCode) {
        case 38: deplacementVersHaut(); break
        case 40: deplacementVersBas(); break
        case 37: deplacementVersGauche(); break
        case 39: deplacementVersDroite(); break
    }
    if (estVictoire()) {
        alert("Bravo, vous avez gagner !")
    } else if (estDefaite()) {
        alert("Echec !")
    }
}

function deplacementVersHaut() {
    tasserVertical(true)
    fusionVertical(true)
    insertionValeur()
    afficherGrille()
}

function deplacementVersBas() {
    tasserVertical(false)
    fusionVertical(false)
    insertionValeur()
    afficherGrille()
}

function deplacementVersGauche() {
    tasserHorizontale(true)
    fusionHorizontale(true)
    insertionValeur()
    afficherGrille()
}

function deplacementVersDroite() {
    tasserHorizontale(false)
    fusionHorizontale(false)
    insertionValeur()
    afficherGrille()
}

function tasserHorizontale(gauche) {
    let move = false
    for (let i = 0; i <= 3; i++) { //pour chaque ligne
        if (!estLigneVide(i)) { //si ligne non vide
            for (let repeat = 0; repeat <= 2; repeat++) { //repetition max du decallage des cases
                if (gauche) {
                    for (let j = 0; j < 3; j++) { //pour chaque colonnes
                        if (!grille[i][j].value && grille[i][j+1].value) { //si valeur colonne null & colonne suivante non null
                            grille[i][j].value = grille[i][j+1].value; //echange de valeur
                            grille[i][j+1].value = null; //echange de valeur
                            move = true
                        }
                    }
                } else { //droite
                    for (let j = 3; j > 0; j--) { //pour chaque colonnes
                        if (!grille[i][j].value && grille[i][j-1].value) { //si valeur colonne null & colonne suivante non null
                            grille[i][j].value = grille[i][j-1].value; //echange de valeur
                            grille[i][j-1].value = null; //echange de valeur
                            move = true
                        }
                    }
                }
            }
        }
    }
    return move
}

function tasserVertical(haut) {
    let move = false
    for (let j = 0; j <= 3; j++) { //pour chaque colonnes
        if (!estColonneVide(j)) { //si colonne non vide
            for (let repeat = 0; repeat <= 2; repeat++) { //repetition max du decallage des cases
                if (haut) {
                    for (let i = 0; i < 3; i++) { //pour chaque lignes
                        if (!grille[i][j].value && grille[i+1][j].value) { //si valeur colonne null & colonne suivante non null
                            grille[i][j].value = grille[i+1][j].value; //echange de valeur
                            grille[i+1][j].value = null; //echange de valeur
                            move = true
                        }
                    }
                } else { //bas
                    for (let i = 3; i > 0; i--) { //pour chaque lignes
                        if (!grille[i][j].value && grille[i-1][j].value) { //si valeur colonne null & colonne suivante non null
                            grille[i][j].value = grille[i-1][j].value; //echange de valeur
                            grille[i-1][j].value = null; //echange de valeur
                            move = true
                        }
                    }
                }
            }
        }
    }
    return move
}

function fusionHorizontale(gauche) {
    let move = false
    for (let i = 0; i <= 3; i++) {
        if (!estLigneVide(i)) {
            for (let repeat = 0; repeat <= 2; repeat++) {
                if (gauche) {
                    for (let j = 0; j < 3; j++) {
                        if (grille[i][j].value && grille[i][j].value === grille[i][j+1].value) {
                            grille[i][j].value = grille[i][j].value*2
                            grille[i][j+1].value = null;
                            move = true
                        }
                    }
                } else { //droite
                    for (let j = 3; j > 0; j--) { //pour chaque colonnes
                        if (grille[i][j].value && grille[i][j].value === grille[i][j-1].value) { //si valeur colonne null & colonne suivante non null
                            grille[i][j].value = grille[i][j].value*2 //echange de valeur
                            grille[i][j-1].value = null;
                            move = true
                        }
                    }
                }
            }
        }
    }
    return move
}

function fusionVertical(haut) {
    let move = false
    for (let j = 0; j <= 3; j++) { //pour chaque colonnes
        if (!estColonneVide(j)) { //si colonne non vide
            for (let repeat = 0; repeat <= 2; repeat++) { //repetition max du decallage des cases
                if (haut) {
                    for (let i = 0; i < 3; i++) { //pour chaque lignes
                        if (grille[i][j].value && grille[i][j].value === grille[i+1][j].value) { //si valeur colonne null & colonne suivante non null
                            grille[i][j].value = grille[i][j].value*2; //echange de valeur
                            grille[i+1][j].value = null; //echange de valeur
                            move = true
                        }
                    }
                } else { //bas
                    for (let i = 3; i > 0; i--) { //pour chaque lignes
                        if (grille[i][j].value && grille[i][j].value === grille[i-1][j].value) { //si valeur colonne null & colonne suivante non null
                            grille[i][j].value = grille[i][j].value*2; //echange de valeur
                            grille[i-1][j].value = null; //echange de valeur
                            move = true
                        }
                    }
                }
            }
        }
    }
    return move
}

function afficherGrille() {
    let cases = document.querySelectorAll(".case")
    let actualCase = 0
    for (let i = 0; i <= 3; i++) { // i = ligne
        for (let j = 0; j <= 3; j++) { // j = colonne
            cases[actualCase].innerHTML = grille[i][j].value
            cases[actualCase].classList.remove('new')
            if (lastCase[0] === i && lastCase[1] === j) {
                cases[actualCase].classList.add('new') //last case
            } else {
                cases[actualCase].classList.remove('new') //last case
            }
            actualCase++
        }
    }
}

function estLigneVide(line) {
    for (let j = 0; j <= 3; j++) { //pour chaque colonne
        if(grille[line][j].value) { //si une colonne est pas vide
            return false //direct return false
        }
    }
    return true //sinon return true
}

function estColonneVide(column) {
    for (let i = 0; i <= 3; i++) { //pour chaque colonne
        if(grille[i][column].value) { //si une colonne est pas vide
            return false //direct return false
        }
    }
    return true //sinon return true
}

function estVictoire() {
    for (let i = 0; i <= 3; i++) { // i = ligne
        for (let j = 0; j <= 3; j++) { // j = colonne
            if (grille[i][j].value === 2048) {
                return true;
            }
        }
    }
    return false;
}

function estDefaite() {
    for (let i = 0; i <= 3; i++) { // i = ligne
        for (let j = 0; j <= 3; j++) { // j = colonne
            if (grille[i][j].value !== null) {
                return false; //s'il y a de la place on continu
            }
        }
    }
    return true;
}

/*************************************************************/

function MathRandomInt(min, max) {
    return Math.floor(Math.random() * (max+1)) + (min)
}