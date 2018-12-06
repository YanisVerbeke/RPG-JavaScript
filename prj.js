//Declaration objet & Variable

var monPerso = {
	nom : "",
	force : 10,
	agilite : 10,
	endurance : 100,
	pv : 100
} ;

var bourse = 0;
var raredrop;
var inventaire = {
	potionForce :0,
	potionAgi : 0,
	potionEndu : 0,
	potionSoinMineur : 0,
	potionSoinMajeur : 0
} ;
var introMonstre="";
var tabScore=[];


/**********Disparition  des secteurs en fonction du moment dans le tour de jeu. ************/

const starthide = document.getElementById("startgame");
starthide.style.display = "block";

//bouton combat cache avant le lancement du jeu.
const hide = document.getElementById("startcombat"); //bouton taper
hide.style.display = "none";

const goshop = document.getElementById("monstreMortBoutique"); //bouton aller au shop
goshop.style.display = "none";

const showshop = document.getElementById("shop"); //le shop
showshop.style.display = "none";

const stuff = document.getElementById("stuff"); //stat et ce qu'on a dans les sacs
stuff.style.display = "none";

const inventoryTurn = document.getElementById("inventory"); // la possibilite d'utiliser ce qu'il y a dans le sac
inventoryTurn.style.display = "none";


// voir stat de son perso.


var statperso = document.getElementById("showstat").display = monPerso;

//Creation monstre et combat


var monstre = {
	force : 5,
	endurance : 7,
	nom : ""
};

// Variable servant a l'incrementation des stats des monstres.
var numTour = 0;

//Refresher pour voir a chaque utilisation de X variable les changements en direct par le joueur.

function statRefresher(){
	document.getElementById("vieJoueur").innerHTML="PV : " +monPerso.pv;
	document.getElementById("forceJoueur").innerHTML="Force : "+monPerso.force;
	document.getElementById("agiJoueur").innerHTML="Agilite : "+monPerso.agilite;
	document.getElementById("enduJoueur").innerHTML="Endurance : "+monPerso.endurance;
}

function statMonsterRefresher(){
	document.getElementById("nomMonstre").innerHTML=monstre.nom;
	document.getElementById("forceMonstre").innerHTML="Force du monstre : " +monstre.force;
	document.getElementById("enduMonstre").innerHTML="Endurance du monstre : " +monstre.endurance;

}


function refreshInventory(){
	document.getElementById("money").innerHTML=bourse;
	document.getElementById("mineur").innerHTML=inventaire.potionSoinMineur;
	document.getElementById("majeur").innerHTML=inventaire.potionSoinMajeur;
	document.getElementById("force").innerHTML=inventaire.potionForce;
	document.getElementById("agi").innerHTML=inventaire.potionAgi;
	document.getElementById("endu").innerHTML=inventaire.potionEndu;
}


// Cycle jour / Nuit

var timer;
cycle = document.getElementById("CycleJourNuit");
cycle.innerHTML="Vous arrivez de nuit, attention les monstres sont plus dangereux dans la nuit noire.";
function Cycle(){
	var nuit = true;
	clearInterval(timer);
	timer = setInterval(function() {
		nuit = !nuit;
		if (nuit){
			monstre.force++;
			statMonsterRefresher();
			cycle.innerHTML="Il fait nuit, les monstres sont plus forts.";
		}
		else {
			monstre.force--;
			statMonsterRefresher();
			cycle.innerHTML="De jour les monstres sont moins dangereux."
		}
	},45000);
}


// Start du jeu




function getName(){
	monPerso.nom = document.getElementById("nomperso").value;
	document.getElementById("nomperso").value="";
	document.getElementById("nom").innerHTML=monPerso.nom;
	console.log(monPerso.nom);
	return false;

}


function startGame(){
	inventoryTurn.style.display = "none";
	document.getElementById("nom").innerHTML=monPerso.nom;
	refreshInventory();
	statRefresher();
	 document.getElementById("CycleJourNuit").innerHTML ="Il fait jour";
	 document.getElementById("CycleJourNuit").innerHTML ="C'est la nuit, les monstres sont plus dangereux";

	if(monPerso.nom==""){
		alert("Vous avez besoin d'un nom de personnage pour jouer");

		return false;
	}

	else{
		//Si il y a un pseudo lorsqu'on lance le jeu = affiche inventaire, PV & Stats actuelle, se refresh a chaque modif.
		Cycle();
		    hide.style.display = "block";
	        stuff.style.display = "block";
	        startgame.style.display = "none";


		monstre.force = 5+ (1*numTour);
		monstre.endurance = 7 + (1*numTour);		
		
		var nameList = ["Gollum", "un Sith","un Dalek","un Vampire","un Loup-Garou","un Dragon","un Zombie","une Ghoul","les Pillar Men","Kevin", "Dio", "un Saiyan","Jacques Chirac", "la Liche","La Tarrasque", "le Balrog de Morgoth, fils d'Arathorn, heritier du trône du Gondor, père de Gandalf le Peu Clair","Obi-Wan Kenobi", "42", "ta femme lorsque tu rentres bourre a 6h du matin avec 36 appels en absence", "ton gosse qui a decide de fumer pour etre aware", "Chuck Norris", "Jean-Claude Van Damme", "Darth Vader de la planète Vulcain", "Biff Tannen", "la mort, elle même", "Trump", "ta mere lorsque tu lui dis que tu veux passer ton permis moto", "Jul", "l'heure, parce qu'il est 5h du mat quand j'ecris ça", "le JDG", "Richard Aldana", "la vie", "Voldemort", "Sauron", "Arthas", "random orc#2775717279", "un peon", "un joueur de League of Legends qui veut te 1v1midmate", "un mec qui passait sans doute par la par hasard", "un petit poussin mignon", "Thibaud", "toi-meme (wow c'est meta ça)", "Geralto de Riviero", "une sorciere malfaisante", "les etudiants de la coding a 12h30 et qu'ils ont pas le droit d'aller bouffer", "la voiture de Maxime", "Venom", "ta nana une fois par mois", "Un Rattata", 'McFly et Carlito'];
		var introList =["vient rechercher son precieux.", "execute l'ordre 66.","extermine des choses.","arrive avec un  pare soleil.","cherche à s'attraper la queue.","vous fait sentir votre inferiorite.","marche lentement vers vous. Tres lentement...","vous attaque","sortent de leur tombeau *epic trap astec music start playing*","carry le sprint.", "arrete le temps.", "a une puissance superieur a 9000 unites.","vient sauver la France.", "pratique des rituels sataniques.","mange ton monde.", "n'a aucun sens.","has the High Ground", "est universel", "fait ses valises (elle en a encore pour 3 bonnes heures).", "te repproche d'etre trop vieux pour comprendre.", "recode le jeu pour te defoncer.", "ecarte les jambes.", "n'aime pas le sable.", "vous regarde de travers.", "vient te latter la gueule.", "construit un mur.", "te propose une bicyclette", "''chante''", "a terrasse Kevin.", "te gueule dessus.", "va vous coller une grosse tatane.", "te remet a ta place.", "veut te prendre ton nez.", "prepare ses fiancailles.", "entretien Frostmourne.", "vous attaque.", "termine son travail.", "utilise sa co comme excuse.", "vous regarde.", "sors une hache de ses plumes.", "main support sur LoL.", "te rappelle que tu es seul.", "joue du banjo.", "n'a pas l'air tres gentille.", "se rebellent.", "n'a pas fait son controle technique.", "veut vous manger le cerveau.", "n'est pas dans un bon mood.", "sauvage apparait.", "effectuent le DAB."];
		var randomName = Math.floor(Math.random()*nameList.length);
		monstre.nom = nameList[randomName];
		introMonstre = introList[randomName];
		document.getElementById("intro").innerHTML = monstre.nom + " " + introMonstre;
		console.log(" ");
		console.log("Vie : "+monstre.endurance);
		console.log("Nom : "+monstre.nom);
		console.log("Force : "+monstre.force);
		console.log("Endu : "+monstre.endurance);
		statMonsterRefresher();
	}
} 


//Fait les rands de combat, l'initiative etant, au debut a 90% de chance pour l'adversaire, on a preferer s'orienter vers un système
//de "Chance" permettant  au joueur de taper deux fois d'affiler si il en a la chance, pouvant donner un avantage.

//Relance la fonction a chaque clic jusqu'a la mort du personnage ou du monstre.

function Taper(){

	let initiative=Math.floor(Math.random()*100)+1;

	console.log(" ");
	console.log("Ini : "+initiative);
	console.log("PV perso : "+monPerso.pv);
	console.log("PV monstre : "+monstre.endurance );

	if(initiative<=monPerso.agilite) {
		if(monPerso.pv>0) {
			monstre.endurance  = monstre.endurance -monPerso.force;
			statMonsterRefresher();
			if(monstre.endurance  > 0){
				monPerso.pv = monPerso.pv - monstre.force;
				statRefresher();
			}
			else{
				raredrop = Math.floor(Math.random()*10);
				monstreMort();
			}
		} 
		else if(monPerso.pv<=0) {
			persoMort();
		}

	} 

	else if (initiative > monPerso.agilite){
		if(monstre.endurance >0) {
			monPerso.pv = monPerso.pv - monstre.force;
			statRefresher();
			if(monPerso.pv > 0){
				monstre.endurance  = monstre.endurance  - monPerso.force;
				statMonsterRefresher();
			}
			else{
				persoMort();
			}
		} 
		else if(monstre.endurance <=0) {
			raredrop = Math.floor(Math.random()*10);
			
			monstreMort();
		}	}
}

function goShop(){
	showshop.style.display = "block";
	return Boutique();

}

function monstreMort() {
	bourse = bourse +3 ;
	document.getElementById("money").innerHTML=bourse;
	if(raredrop > 0) {
			alert("Vous avez vaincu "+monstre.nom+" ! Vous gagnez 3 pièces d'or.");
	} 	else {
			alert("Vous avez vaincu "+monstre.nom+" ! Vous gagnez 3 pièces d'or et une potion de soin.");
			inventaire.potionSoinMineur++;
	}
	hide.style.display = "none";
	goshop.style.display = "block";

}

var savePseudo;
var saveScore;

function persoMort() {
	alert("Vous avez ete vaincu par "+monstre.nom+"...");
	savePseudo = monPerso.nom;
	saveScore = numTour;
	reset();
	
}






function useSoinMineur(){
	if (monPerso.pv < monPerso.endurance && inventaire.potionSoinMineur >= 1){
		monPerso.pv = monPerso.pv + 10;
		inventaire.potionSoinMineur--;
		if (monPerso.pv > monPerso.endurance){
			monPerso.pv = monPerso.endurance;
		}
		document.getElementById("mineur").innerHTML=inventaire.potionSoinMineur;
		statRefresher();

	}

	else if (monPerso.pv == monPerso.endurance && inventaire.potionSoinMineur >= 1){
		alert ("Vous êtes full vie, la potion n'est pas utilisé");
	}
	else if (monPerso.pv <= 0 && potionSoinMineur >= 1){
		alert ("vous êtes mort, tricheur");
	}

}

function useSoinMajeur(){
	if (monPerso.pv < monPerso.endurance && inventaire.potionSoinMajeur >= 1){
		monPerso.pv = monPerso.pv + 20;
		inventaire.potionSoinMajeur--;
		if (monPerso.pv > monPerso.endurance){
			monPerso.pv = monPerso.endurance;
		}
		document.getElementById("majeur").innerHTML=inventaire.potionSoinMajeur;
		statRefresher();
	}
	
	else if (monPerso.pv == monPerso.endurance && inventaire.potionSoinMajeur >= 1){
		alert ("Vous êtes full vie, la potion n'est pas utilisé");
	}
	else if (monPerso.pv <= 0 && potionSoinMajeur >= 1){
		alert ("vous êtes mort, alors que vous aviez une potion majeure, lol noob");
	}
}

function achatPotionMaj(){
	if (bourse >=5){
		bourse = bourse - 5;
		inventaire.potionSoinMajeur++;
	}
	else{
		alert("Ta pas assez de pognon gamin, retourne tuer des rats puants des egouts ou rackette ton voisin, c'est toi qui vois")
	}
	document.getElementById("money").innerHTML=bourse;
	document.getElementById("majeur").innerHTML=inventaire.potionSoinMajeur;
}

function achatPotionFor(){
	if (bourse >=2){
		bourse = bourse - 2;
		inventaire.potionForce++;
	}
	else{
		alert("Je sais que ta un physique de crevette, mais va falloir encore bosser pour te permettre cette potion, crevette");
	}
	document.getElementById("money").innerHTML=bourse;
	document.getElementById("force").innerHTML=inventaire.potionForce;
}

function achatPotionAgi(){
	if (bourse >=2){
		bourse = bourse - 2;
		inventaire.potionAgi++;
		alert ("Avec cette potion on va t'appeler Andre de Sousa");
	}
	else{
		alert("La dernière fois que j'ai vu un mec aussi agile que toi on l'appelait la planche");
	}
	document.getElementById("money").innerHTML=bourse;
	document.getElementById("agi").innerHTML=inventaire.potionAgi;
}

function achatPotionEndu(){
	if (bourse >=2){
		bourse = bourse - 2;
		inventaire.potionEndu++;
	}
	else{
		alert("Ta l'air mal en point, c'est dommage que tu n'ais pas assez de thune.");
	}
	document.getElementById("money").innerHTML=bourse;
	document.getElementById("endu").innerHTML=inventaire.potionEndu;
}

function useForce(){
	if(inventaire.potionForce >=1){
		monPerso.force++;
		inventaire.potionForce--;

	}
	document.getElementById("money").innerHTML=bourse;
	document.getElementById("force").innerHTML=inventaire.potionForce;
	statRefresher();
}

function useAgi(){
	if(inventaire.potionAgi >=1){
		monPerso.agilite++;
		inventaire.potionAgi--;
	}
	document.getElementById("money").innerHTML=bourse;
	document.getElementById("agi").innerHTML=inventaire.potionAgi;
	statRefresher();
		
}

function useEndu(){
	if(inventaire.potionEndu >=1){
		monPerso.endurance++;
		inventaire.potionEndu--;
	}
	document.getElementById("money").innerHTML=bourse;
	document.getElementById("endu").innerHTML=inventaire.potionEndu;
	statRefresher();
}

function Boutique(){

goshop.style.display = "none";
	refreshInventory();

}

function leaveBoutique(){
	Inventaire();
}

function Inventaire(){

	showshop.style.display = "none";
	inventoryTurn.style.display = "block";

	if (inventaire.potionSoinMineur){

	}


	numTour++;
	refreshInventory()

}

function nextTurn(){

		inventoryTurn.style.display = "none";
		startGame();
}

function reset() {


	AddScore();
	AfficherTab();

	monPerso = {
	nom : "",
	force : 10,
	agilite : 10,
	endurance : 100,
	pv : 100
	} ;
	bourse = 0;
	inventaire = {
	potionForce :0,
	potionAgi : 0,
	potionEndu : 0,
	potionSoinMineur : 0,
	potionSoinMajeur : 0
	} ;
	monstre = {
	force : 5,
	endurance : 7,
	nom : ""
	};
	numTour = 0;

	starthide.style.display = "block";
	hide.style.display = "none";
	goshop.style.display = "none";
	showshop.style.display = "none";
	stuff.style.display = "none";
	inventoryTurn.style.display = "none";

	introMonstre="";
	document.getElementById("intro").innerHTML = monstre.nom + " " + introMonstre;

}


function AddScore() {
	var obj = {pseudo : savePseudo, score : saveScore};
	tabScore.push(obj);
	tabScore.sort((a,b)=> b.score - a.score);
		if(tabScore.length > 5){
			tabScore.pop();
		}
	AfficherTab();
}

function AfficherTab(){
	var html = '<table>';
		for (let item of tabScore) {
			html += '<tr>';
				for (let myKey of Object.keys(item)) {
					console.log(item[myKey]);
					html += '<td>' + item[myKey] + '</td>';
				}
			html += '</tr>';
		}
	html += '</table>';
	document.getElementById("monTableau").innerHTML = html;
}














