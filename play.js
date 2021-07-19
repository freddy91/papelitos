
const db = firebase.firestore();

/* Varibales */

const words = document.getElementById('final-word');
const btnSi = document.getElementById('btn-si');
const btnNo = document.getElementById('btn-no');
const displayTimer = document.getElementById('time');

let arrayWords = [];

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

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = 0;
            console.log("Fin");
            btnSi.disabled = true;
			btnNo.disabled = true;
			document.body.style.backgroundColor = "rgba(255,0,0,0.3)";
        }
    }, 1000);

}


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


/*************************************************************/

/* Iniciar pagina */ /* Mostrar palabras */

window.addEventListener('DOMContentLoaded' , async (e) =>{

	const querySnapshot = await getTeams();
	const querySnapshotWords = await getWords();

	querySnapshotWords.forEach(doc =>{
		arrayWords.push(doc.data().word);
	})

	const random = Math.floor(Math.random() * arrayWords.length);
	words.innerHTML = arrayWords[random];
	startTimer(60, displayTimer);

})


/*************************************************************/

/* Botones */

async function acierto() {
	
	arrayWords.remove(words.innerHTML);
	const random = Math.floor(Math.random() * arrayWords.length);
	words.innerHTML = arrayWords[random];
	if(arrayWords.length == 0){
		words.innerHTML ="Ya no hay más palabras";
		btnSi.disabled = true;
		btnNo.disabled = true;
		const querySnapshotWords = await getWords();
		querySnapshotWords.forEach(doc =>{
			arrayWords.push(doc.data().word);
		})
	}
}

function fallo() {
	console.log(arrayWords);
	const palabra = words.innerHTML;
	if(arrayWords.length > 1){
		var random = Math.floor(Math.random() * arrayWords.length);
		while(arrayWords[random] == palabra){
		random = Math.floor(Math.random() * arrayWords.length);
		}

		words.innerHTML = arrayWords[random];
	}


	
	
}