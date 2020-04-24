function init(){
	let divs = document.querySelectorAll(".case");
	for(i=0; i < divs.length; i++){
		divs[i].addEventListener("click", selection);
	}
}

function selection(event){
	let caseClick = event.currentTarget;
	let caseVide = document.body.querySelector(".vide");

	if (caseClick === " ") {
		return;
	}

	caseVide.innerHTML = caseClick.innerHTML;
	caseVide.className = "case";
	caseClick.innerHTML = " ";
	caseClick.className = "vide";

	console.log(caseClick.innerHTML);
}