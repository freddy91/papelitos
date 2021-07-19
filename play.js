
const db = firebase.firestore();

/* Varibales */

const words = document.getElementById('final-word');
const btnSi = document.getElementById('btn-si');
const btnNo = document.getElementById('btn-no');
const btnTime = document.getElementById('btn-time');
const displayTimer = document.getElementById('time');
const title = document.getElementById('title');

let arrayWords = [];
let arrayTeams= [];
let arrayPuntos = [];
let nTeams = 0;
var j = 0;
var puntos = 0;

/*************************************************************/

/* Funciones auxiliares */

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};


/*************************************************************/

/* Acciones base de datos */
	
	/* Equipos */

	const saveTeam = (number) =>
		db.collection('teams').doc().set({
				number 
		});

	const getTeams = () => db.collection('teams').get();


	/* Palabras */

	const saveWord = (word) =>
		db.collection('wordsP').doc().set({
				word 
		});

	const getWords = () => db.collection('wordsP').get();

	/* Puntiaciones */

	const savePuntos = (equipo,puntos) =>
		db.collection('puntos').doc().set({
			equipo,
			puntos
		})

	const getPuntos = () => db.collection('puntos').get();


/*************************************************************/

/* Iniciar pagina */ /* Mostrar palabras */

window.addEventListener('DOMContentLoaded' , async (e) =>{

	const querySnapshot = await getTeams();
	const querySnapshotWords = await getWords();

	btnSi.disabled = true;
	btnNo.disabled = true;

	querySnapshotWords.forEach(doc =>{
		arrayWords.push(doc.data().word);
	})

	querySnapshot.forEach(doc =>{
		nTeams = doc.data().number;
	})

	for(i=0 ; i<nTeams ; i++){
		arrayTeams.push("Equipo " + (i+1));
	}


	const random = Math.floor(Math.random() * arrayWords.length);
	words.innerHTML = arrayWords[random];
})


/*************************************************************/

/* Botones */

async function acierto() {
	savePuntos(title.innerHTML , words.innerHTML);
	arrayWords.remove(words.innerHTML);
	const random = Math.floor(Math.random() * arrayWords.length);
	words.innerHTML = arrayWords[random];
	if(arrayWords.length == 0){
		words.innerHTML ="Ya no hay más palabras";
		btnSi.disabled = true;
		btnNo.disabled = true;

		/*const pruebas = db.collection('puntos' , 
						ref => ref.where('equipo' , '==' , 'Equipo 1'));

		console.log(pruebas);*/

		const querySnapshotWords = await getWords();
		querySnapshotWords.forEach(doc =>{
			arrayWords.push(doc.data().word);
		})



	}
}

function fallo() {
	const palabra = words.innerHTML;
	if(arrayWords.length > 1){
		var random = Math.floor(Math.random() * arrayWords.length);
		while(arrayWords[random] == palabra){
		random = Math.floor(Math.random() * arrayWords.length);
		}

		words.innerHTML = arrayWords[random];
	}
}

function tiempo(){
	var timeleft = 5;
	if(j == nTeams){
		j = 0;
	}
	title.innerHTML = arrayTeams[j];
	j= j+1;

	btnTime.disabled = true;
	btnSi.disabled = false;
   	btnNo.disabled = false; 
	document.body.style.backgroundColor = "rgba(0,0,0,0)";
    var downloadTimer = setInterval(function(){
    timeleft--;
    document.getElementById("time").textContent = timeleft;
    if(timeleft <= 0){
		clearInterval(downloadTimer);
    	btnSi.disabled = true;
    	btnNo.disabled = true;
    	btnTime.disabled = false; 
    	document.body.style.backgroundColor = "rgba(255,0,0,0.4)";
;

    }

    },1000);


}

	
