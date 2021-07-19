
const db = firebase.firestore();

/* Varibales */

const teamForm = document.getElementById('equipos-form');
const wordForm = document.getElementById('word-form');
const empezarForm = document.getElementById('empezar-form');



let arrayWords = [];

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

/* Iniciar pagina */

window.addEventListener('DOMContentLoaded' , async (e) =>{
	wordForm['word'].disabled = true;
	wordForm['btn-word'].disabled = true;

	const querySnapshot = await getTeams();
	const querySnapshotWords = await getWords();
	if(!(querySnapshot.empty)){

		querySnapshot.forEach(doc =>{
			teamForm['equipos'].value = doc.data().number;
		})

		querySnapshotWords.forEach(doc =>{
			arrayWords.push(doc.data().word);
		})

		total.innerHTML = arrayWords.length;

		teamForm['btn-equipos'].disabled = true;
		teamForm['equipos'].disabled = true;

		wordForm['word'].disabled = false;
		wordForm['btn-word'].disabled = false;
	}else{
		console.log("Si");
	}

})


/*************************************************************/

/* Definir equipos */


teamForm.addEventListener('submit' , async (e) =>{
	e.preventDefault();
	const numberTeams = teamForm['equipos'].value;
	const querySnapshot = await getTeams();

	if(numberTeams != "" && querySnapshot.empty){
		await saveTeam(numberTeams);
		teamForm.reset();
		teamForm['btn-equipos'].disabled = true;
		teamForm['equipos'].disabled = true;

		wordForm['word'].disabled = false;
		wordForm['btn-word'].disabled = false;

		
		querySnapshot.forEach(doc =>{
			teamForm['equipos'].value = doc.data().number;
		})

	}else{
		teamForm['equipos'].value = "Numero de equipos ya definido";
	}


})

/*************************************************************/


/* Guardar palabras */

wordForm.addEventListener('submit' , async (e) =>{
	e.preventDefault();
	const word = wordForm['word'].value;
	if(word != ""){
		await db.collection('wordsP').doc().set({
			word 
		})
	}

	wordForm.reset();
})

/*************************************************************/


/* Empezar juego */

empezarForm.addEventListener('submit' , async (e) =>{
	const pass = empezarForm['pass'].value;
	//if(pass == "123"){
		window.location.href = "juego.html";	
	//}

})

/*************************************************************/




