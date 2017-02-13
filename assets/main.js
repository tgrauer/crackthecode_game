var answer = document.getElementById('answer').value;
var attempt = document.getElementById('attempt').value;
var guess_row = document.getElementById('results').getElementsByClassName('guess')[0];
var results = document.getElementById('results').getElementsByClassName('results')[0];
var attempts_left=10;
var code = document.getElementById('code').getElementsByTagName('strong')[0];
var revealCode;
var input = document.getElementById('user-guess');
var points=0;
var level = 1;
var pointsHolder=document.getElementById('points').getElementsByTagName('span')[0];
var levelHolder=document.getElementById('level').getElementsByTagName('span')[0];
var codelength=3;
var multiplier=100;
var notincode=[];

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
	var guess_html = '<div class="col-xs-12 guessrow"><b>' + input + '</b></div>';
	var results_html= '<div class="col-xs-12 guessrow">';

	for(var i=0;i<input.length;i++){
		if(input.charAt(i)==answer.charAt(i)){
			results_html += '<span><i class="fa fa-check" aria-hidden="true"></i></span>';
			correct++;
		}else if(answer.indexOf(input.charAt(i)) > -1){
			results_html += '<span><i class="fa fa-exchange" aria-hidden="true"></i></span>';
		}else{

			if(notincode.indexOf(input.charAt(i)) === -1) {
				notincode.push(input.charAt(i));
			}
			
			results_html += '<span><i class="fa fa-times" aria-hidden="true"></i></span>';
		}
	}

	results_html += '</div>';
	guess_row.innerHTML += guess_html;
	results.innerHTML += results_html;
	notincode.sort();
	document.getElementsByClassName('notincode')[0].innerHTML=notincode;
	document.getElementsByClassName('notincode')[0].style.display='block';
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
	document.getElementsByClassName('notincode')[0].style.display='none';
	document.getElementById('guessing-div').style.display='block';
	level++;
	codelength++;
	levelHolder.innerHTML=' '+level;
	code.innerHTML="";
	notincode=[];

	for(var i=0;i<codelength;i++){
		code.innerHTML+='?';
	}

	var guessedRows = document.getElementsByClassName('guessrow');
	while (guessedRows[0]) {
	    guessedRows[0].parentNode.removeChild(guessedRows[0]);
	}

	setHiddenFields();
}

function charslefttoenter(){
	
	var charsleft=codelength-input.value.length;
	document.getElementsByClassName('charsleft')[0].innerHTML=charsleft+ ' more character(s)';

	if(charsleft==0){
		document.getElementsByClassName('charsleft')[0].style.display='none';
	}else if(charsleft < 0){
		charsleft=Math.abs(charsleft);
		document.getElementsByClassName('charsleft')[0].style.display='block';
		document.getElementsByClassName('charsleft')[0].innerHTML='Remove '+charsleft+ ' character(s)';
	}
	else{
		document.getElementsByClassName('charsleft')[0].style.display='block';
	}
}


