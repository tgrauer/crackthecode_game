let answer = document.getElementById('answer').value;
let attempt = document.getElementById('attempt').value;
let results = document.getElementById('results');
let attempts_left=10;
let code = document.getElementById('code').getElementsByTagName('strong')[0];
let revealCode;
let input = document.getElementById('user-guess');
let progress='';
let points=0;
let level = 1;
let pointsHolder=document.getElementById('points').getElementsByTagName('span')[0];
let levelHolder=document.getElementById('points').getElementsByTagName('span')[1];
let codelength=3;
let multiplier=100;

if(answer=='' || attempt==''){
	 setHiddenFields();
}

function setHiddenFields(){
	multiplier='1';
	for(var i=0;i<codelength;i++){
		multiplier+='0';
	}

	multiplier= parseFloat(multiplier);

	answer=Math.floor(Math.random(0,1)*multiplier);
	answer=answer.toString();
	attempt=0;
	attempts_left=10;
	while(answer.length<codelength){
		answer='0'+answer;
	}
	document.getElementById('answer').value=answer;
	document.getElementById('user-guess').focus();
	console.log(answer);
}

function guess() {

	// code.innerHTML="";

	if(!validateInput(input.value)){
		return false;
	}else{
		attempt++;
	}
	
	if(getResults(input.value)){
		document.getElementById('message').innerHTML='YOU WIN !!!!';
		document.getElementById('message').className='message alert alert-success';
		levelOver(true);
	}else if(attempt>=10){
		document.getElementById('message').innerHTML='GAME OVER !!!!';
		document.getElementById('message').className='message alert alert-danger';
		levelOver(getResults(input.value));
	}else{
		attempts_left--;
		document.getElementById('message').style.display='block';
		document.getElementById('message').innerHTML=attempts_left+ " Attempts left";
		if(!document.getElementById('message').classList.contains('alert')){
			document.getElementById('message').className +=' alert';
			document.getElementById('message').className +=' alert-danger';
		}	
	}

	document.getElementById('user-guess').value='';
	document.getElementById('user-guess').focus();
	document.getElementById('message').style.display='block';
}

function validateInput(guess){
		
	if(guess.length==codelength){	

		document.getElementById('message').innerHTML='';
		return true;
	}else{
		
		document.getElementById('user-guess').focus();
		document.getElementById('message').className +=' alert';
		document.getElementById('message').className +=' alert-danger';
		document.getElementById('message').innerHTML="This code for this level is "+ codelength +" characters long.";
		return false;
	}
}

function getResults(input){
	var correct=0;
	var html = '<div class="row guessrow"><div class="col-xs-6"><b>' + input + '</b></div><div class="col-xs-6">';

	for(var i=0;i<input.length;i++){
		if(input.charAt(i)==answer.charAt(i)){
			html += '<span class="glyphicon glyphicon-ok"></span>';
			correct++;
		}else if(answer.indexOf(input.charAt(i)) > -1){
			html += '<span class="glyphicon glyphicon-transfer"></span>';
		}else{
			html += '<span class="glyphicon glyphicon-remove"></span>';
		}
	}

	html += '</div></div>';
	results.innerHTML += html;
	
	if(correct==input.length){
		return true;
	}else{
		return false;
	}
}

function levelOver(gameover){
	var points_earned=attempts_left*100 *level;
	points=points+points_earned;
	pointsHolder.innerHTML=points;

	if(gameover){
		code.className+=' success';
		document.getElementById('nextlevel-div').style.display='block';
		document.getElementsByClassName('points_earned')[0].innerHTML=points_earned +' POINTS';
	}else{
		code.className+=' failure';
		document.getElementById('replay-div').style.display='block';
	}

	code.innerHTML=answer;
	document.getElementById('guessing-div').style.display='none';
}

function nextlevel(){
	
	code.classList.remove("success");

	document.getElementById('message').innerHTML="";
	document.getElementById('message').classList.remove("alert");
	document.getElementById('message').classList.remove("alert-success");
	document.getElementById('nextlevel-div').style.display='none';
	document.getElementById('guessing-div').style.display='block';
	level++;
	codelength++;
	levelHolder.innerHTML=' '+level;
	code.innerHTML="";

	for(var i=0;i<codelength;i++){
		code.innerHTML+='?';
	}

	var guessedRows = document.getElementsByClassName('guessrow');
	while (guessedRows[0]) {
	    guessedRows[0].parentNode.removeChild(guessedRows[0]);
	}

	setHiddenFields();

}
