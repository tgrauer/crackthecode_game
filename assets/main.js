let answer = document.getElementById('answer').value;
let attempt = document.getElementById('attempt').value;
let results = document.getElementById('results');
let attempts_left=10;
let code = document.getElementById('code').getElementsByTagName('strong')[0];
let input = document.getElementById('user-guess');

if(answer=='' || attempt==''){
	 setHiddenFields();
}

function setHiddenFields(){
	answer=Math.floor(Math.random(0,1)*10000);
	answer=answer.toString();
	attempt=0;
	while(answer.length<4){
		answer='0'+answer;
	}
	document.getElementById('answer').value=answer;
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
		showAnswer(true);
	}else if(attempt>=10){
		document.getElementById('message').innerHTML='YOU LOSE !!!!';
		showAnswer(getResults(input.value));
	}else{
		attempts_left--;
		document.getElementById('message').innerHTML=attempts_left+ " Attempts left";
		if(!document.getElementById('message').classList.contains('alert')){
			document.getElementById('message').className +=' alert';
			document.getElementById('message').className +=' alert-danger';
		}	
	}

	document.getElementById('user-guess').value='';
	document.getElementById('user-guess').focus();
}

function validateInput(guess){
	if(guess.length==4){		
		document.getElementById('message').innerHTML='';
		return true;
	}else{
		document.getElementById('user-guess').focus();
		document.getElementById('message').className +=' alert';
		document.getElementById('message').className +=' alert-danger';
		document.getElementById('message').innerHTML="Guesses must be exactly 4 characters long.";
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

function showAnswer(gameover){

	if(gameover){
		code.className+=' success';
	}else{
		code.className+=' failure';
	}

	code.innerHTML=answer;
	document.getElementById('replay-div').style.display='block';
	document.getElementById('guessing-div').style.display='none';
}
