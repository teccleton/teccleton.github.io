// JavaScript Document

//This function initializes an appraisal to signal to the program that an appraisal has begun
function startAppraisal()
{
	window.v_inApp = 1;
	appraisalIntro = window.cpInfoCurrentSlide;
	window.cpAPIInterface.next();
}

//This function handles the loading of an appraisal question to the screen
function loadQuestion()
{
	if(window.v_inApp == 1)
	{
		//Load the appraisal question using v_currentQuestion as an index
		try {currentQuestion = appraisal.questions[window.v_currentQuestion - 1];}
		catch(e) {console.log(e.toString());}
	}
	else 
	{
		//Load the appraisal question using v_currentQuestion as an index
		try {currentQuestion = knowledgeCheck.questions[window.v_currentQuestion - 1];}
		catch(e) {console.log(e.toString());}
	}
	
	//Assign the actual display elements in the text fields with the retrieved value. If no value retrieved, assign empty string
	window.v_questionText = (currentQuestion.questionText ? currentQuestion.questionText : "");
	window.v_answerA = (currentQuestion.answerA ? currentQuestion.answerA : "");
	window.v_answerB = (currentQuestion.answerB ? currentQuestion.answerB : "");
	window.v_answerC = (currentQuestion.answerC ? currentQuestion.answerC : "");
	window.v_answerD = (currentQuestion.answerD ? currentQuestion.answerD : "");
	window.v_correct = (currentQuestion.correct ? currentQuestion.correct : "");
}

//This function handles the display of a question by showing the question components and hiding the feedback components
function displayQuestion()
{
	updateProgressBar();
	
	//Minor delay to allow for retrieval of slideElems
	var delayForData = setTimeout( function()
	{
		for (var i = 0; i < slideElems.length; i++)
		{
			//hide feedback, submit and next
			if (slideElems[i].n.toUpperCase().indexOf('FEEDBACK') != -1)	{cp.hide(slideElems[i].n);}
			if (slideElems[i].n.toUpperCase().indexOf('SUBMIT') != -1)		{cp.hide(slideElems[i].n);}
			if (slideElems[i].n.toUpperCase().indexOf('NEXT') != -1)		{cp.hide(slideElems[i].n);}
			
			if (slideElems[i].n.toUpperCase().indexOf('SUCCESS') != -1)		{cp.hide(slideElems[i].n);}
			if (slideElems[i].n.toUpperCase().indexOf('FAILURE') != -1)		{cp.hide(slideElems[i].n);}

			//Show question and answer text
			if (slideElems[i].n.toUpperCase().indexOf('QUESTION') != -1)	{cp.show(slideElems[i].n);}
			if (slideElems[i].n.toUpperCase().indexOf('ANSWERA') != -1)		{cp.show(slideElems[i].n);}
			if (slideElems[i].n.toUpperCase().indexOf('ANSWERB') != -1)		{cp.show(slideElems[i].n);}
			if (slideElems[i].n.toUpperCase().indexOf('ANSWERC') != -1)		
				{(window.v_answerC == "" ? cp.hide(slideElems[i].n) : cp.show(slideElems[i].n));}
			if (slideElems[i].n.toUpperCase().indexOf('ANSWERD') != -1)		
				{(window.v_answerD == "" ? cp.hide(slideElems[i].n) : cp.show(slideElems[i].n));}
			
			//Show bullets, hide C and D if no text is found (true or false question)
			if (slideElems[i].n.toUpperCase().indexOf('SELECTA') != -1)		{cp.show(slideElems[i].n);}
			if (slideElems[i].n.toUpperCase().indexOf('SELECTB') != -1)		{cp.show(slideElems[i].n);}
			if (slideElems[i].n.toUpperCase().indexOf('SELECTC') != -1)		
					{(window.v_answerC == "" ? cp.hide(slideElems[i].n) : cp.show(slideElems[i].n));}
			if (slideElems[i].n.toUpperCase().indexOf('SELECTD') != -1)
					{(window.v_answerD == "" ? cp.hide(slideElems[i].n) : cp.show(slideElems[i].n));}
			
			//Show the back button
			if (slideElems[i].n.toUpperCase().indexOf('BTN_BACK') != -1)		
			{
				window.v_inApp == 1 ? cp.hide(slideElems[i].n) : cp.show(slideElems[i].n);
			}
		}
	}, 50);
}

//This function handles the selection of a bullet and unselection of all other bullets
function selectBullet(chosen)
{
	for (var i = 0; i < slideElems.length; i++)
	{
		if (slideElems[i].n.toUpperCase().indexOf('SELECT') != -1)			cp.changeState(slideElems[i].n, "Normal");		//Change all bullets to empty
		if (slideElems[i].n.toUpperCase().indexOf('SELECT' + chosen) != -1)	cp.changeState(slideElems[i].n, "Selected");	//Change selected bullet to full
		if (slideElems[i].n.toUpperCase().indexOf('SUBMIT') != -1)			cp.show(slideElems[i].n);						//Show the submit button
	}
	
	//Set v_selected for comparison to correct answer
	window.v_selected = chosen;
}

//This function handles the submission of an appraisal question, displays feedback, and displays either continue button or retry button
function submitQuestion()
{
	try{SCORM_objAPI = SCORM_GrabAPI();}
	catch(e){console.log("SCORM API Not Found");}
	
	//Assign v_feedback, which is displayed in text field, with v_feedbackA, v_feedbackB, v_feedbackC, or v_feedbackD according to the selected answer.
	window.v_feedback = currentQuestion["feedback" + window.v_selected];
	
	if (window.v_inApp == 1) 
	{
		studentMax++;
	}
	
	for (var i = 0; i < slideElems.length; i++)
	{
		//Hide the question elements
		if (slideElems[i].n.toUpperCase().indexOf('SUBMIT') != -1)	cp.hide(slideElems[i].n);
		if (slideElems[i].n.toUpperCase().indexOf('QUESTION') != -1)	cp.hide(slideElems[i].n);
		if (slideElems[i].n.toUpperCase().indexOf('ANSWERA') != -1)	cp.hide(slideElems[i].n);
		if (slideElems[i].n.toUpperCase().indexOf('ANSWERB') != -1)	cp.hide(slideElems[i].n);
		if (slideElems[i].n.toUpperCase().indexOf('ANSWERC') != -1)	cp.hide(slideElems[i].n);
		if (slideElems[i].n.toUpperCase().indexOf('ANSWERD') != -1)	cp.hide(slideElems[i].n);
		if (slideElems[i].n.toUpperCase().indexOf('SELECTA') != -1)	cp.hide(slideElems[i].n);
		if (slideElems[i].n.toUpperCase().indexOf('SELECTB') != -1)	cp.hide(slideElems[i].n);
		if (slideElems[i].n.toUpperCase().indexOf('SELECTC') != -1)	cp.hide(slideElems[i].n);
		if (slideElems[i].n.toUpperCase().indexOf('SELECTD') != -1)	cp.hide(slideElems[i].n);
		
		//Show the feedback that was set earlier based on selection
		if (slideElems[i].n.toUpperCase().indexOf('FEEDBACK') != -1)	cp.show(slideElems[i].n);
		
		if (window.v_selected == window.v_correct)
		{
			if (slideElems[i].n.toUpperCase().indexOf('SUCCESS') != -1)	cp.show(slideElems[i].n);
			if (slideElems[i].n.toUpperCase().indexOf('FAILURE') != -1)	cp.hide(slideElems[i].n);
		}
		else
		{
			if (slideElems[i].n.toUpperCase().indexOf('SUCCESS') != -1)	cp.hide(slideElems[i].n);
			if (slideElems[i].n.toUpperCase().indexOf('FAILURE') != -1)	cp.show(slideElems[i].n);
		}
		
		//If the student is correct show the next button and hide the back button
		if (window.v_selected == window.v_correct || window.v_inApp == 1)
		{
			if (slideElems[i].n.toUpperCase().indexOf('BTN_BACK') != -1)	cp.hide(slideElems[i].n);
			if (slideElems[i].n.toUpperCase().indexOf('BTN_NEXT') != -1)	cp.show(slideElems[i].n);
		}
		//If the student is incorrect and not in an appraisal
		else
		{
			//Set v_retry to 1 to change the functionality of the back button
			window.v_retry = 1;
			//Show the back button and keep the next button hidden
			if (slideElems[i].n.indexOf('BTN_BACK') != -1)	cp.show(slideElems[i].n);
		}
	}
	
	if (window.v_selected == window.v_correct && window.v_inApp == 1) 
	{
		studentScore++;
	}
}

//This function handles the differentiation of the back button on the appraisal slides
function retryQuestion()
{
	//Default back behavior, go to previous slide
	if (window.v_retry == 0)
	{
		window.cpAPIInterface.previous();
	}
	//Behavior after choosing the incorrect answer, redisplay question
	else
	{
		displayQuestion();
		window.v_retry = 0;
	}
}

//This function finishes the appraisal and displays results to the user
function finishAppraisal()
{
	window.v_inApp = 0;
	
	loadScreen();
	
	if (cp.model.data["LSP_BG"].canvasPainterObject.visible == 0)
	{
		window.v_quizScore = studentScore;
		window.v_quizMax = studentMax;
		window.v_quizPercent = (studentScore/studentMax) * 100;
		window.v_quizMaster = AFSLessonInfo.masterScore;

		//Set pass fail message
		pass_fail = (window.v_quizPercent >= window.v_quizMaster ? 'pass' : 'fail');

		var delayForData = setInterval( function()
		{
			for (var i = 0; i < slideElems.length; i++)
			{
				if (slideElems[i].n.toUpperCase().indexOf('PASS_FAIL') != -1)	
				{
					cp.changeState(slideElems[i].n, pass_fail);
					if (cp.model.data[slideElems[i].n].currentState != 0)
					{
						clearInterval(delayForData);
						delayForData = null;
					}
				}
				if (slideElems[i].n.toUpperCase().indexOf('APP_RETAKE') != -1 && pass_fail == 'pass')	
				{
					cp.hide(slideElems[i].n);
				}
			}
		}, 1, false);

		try
		{
			SCORM_objAPI = SCORM_GrabAPI();
			SCORM_objAPI.LMSSetValue("cmi.core.score.min", 0);
			SCORM_objAPI.LMSSetValue("cmi.core.score.max", 100);
			SCORM_objAPI.LMSSetValue("cmi.core.score.raw", window.v_quizPercent);
			SCORM_objAPI.LMSSetValue("cmi.core.exit", "suspend");
			SCORM_objAPI.LMSCommit("");
		}
		catch(e)
		{
			console.log("SCORM API Not Found");
		}
	}
	
}

function nextQuestion()
{
	if (slideElems[i].n.toUpperCase().indexOf('BTN_NEXT') != -1)	cp.hide(slideElems[i].n);
	window.cpAPIInterface.next();
}

function restartAppraisal()
{
	window.v_quizScore = studentScore = 0;
	window.v_quizMax = studentMax = 0;
	window.v_quizPercent = 0;
	pass_fail = "";
	
	window.cpCmndGotoSlide = (appraisalIntro - 1);
	window.cpCmndResume = 1;
}