// JavaScript Document

//This function handles the play and pause functionality while changing the appearance of the button itself
function playPause()
{
	//if the course is already paused when clicked
	if(isPaused)
	{
		window.cpAPIInterface.play();										//Play the course
		try {document.getElementsByTagName("video")[0].play();}				//Play the embedded video if there is one
		catch(e) {console.log(e.toString());}
		delayAnimations((pauseFrame-cSlideTimes.from)/window.cpInfoFPS);	//Restart Animation delays from the pause time
		isPaused = false;													//Set isPaused boolean to false
		for (var i = 0; i < slideElems.length; i++)							//Change pause button back to Pause Symbol
		{
			if (slideElems[i].n.toUpperCase().indexOf('PAUSE') != -1) {cp.changeState(slideElems[i].n, "Normal");}
		}
	}
	//if the course is currently being played when clicked
	else
	{
		window.cpAPIInterface.pause();								//Pause the course
		try {document.getElementsByTagName("video")[0].pause();}	//Pause the embedded video if there is one
		catch(e) {console.log(e.toString());}
		clearAnimationTimers();										//Stop and clear all custom animation timers
		pauseFrame = window.cpInfoCurrentFrame;						//Set pauseFrame to the frame in which pause was clicked
		isPaused = true;											//Set isPaused boolean to true
		for (var i = 0; i < slideElems.length; i++)					//Change pause button to Play symbol to indicate the need to continue
		{
			if (slideElems[i].n.toUpperCase().indexOf('PAUSE') != -1) 	{cp.changeState(slideElems[i].n, "btnPlay");}
		}
	}
}

//This function handles the process for starting an individual slide over from the beginning, audio and animations included.
function replayScreen()
{
	//Use captivate command to navigate back to the first frame of the slide
	window.cpCmndGotoFrameAndResume = cSlideTimes.from;
	//Reset the pauseFrame to the first frame of the slide
	pauseFrame = cSlideTimes.from;
	//Change all animated objects back to the Normal default state
	for(var i = 0; i < screenAnimations.length; i++)
	{
		screenAnimations[i].currFrame = 1;
		cp.changeState(screenAnimations[i].mc_ID, "Normal");
	}
	//If Replay was clicked while the course was paused
	for (var i = 0; i < slideElems.length; i++)
	{
		if (slideElems[i].n.toUpperCase().indexOf('PAUSE') != -1) 		{cp.changeState(slideElems[i].n, "Normal");}
		if (slideElems[i].n.toUpperCase().indexOf('AUDIOBOX') != -1) 	{cp.changeState(slideElems[i].n, "Normal");}
	}
	isPaused = 0;
	//Clear and restart all animation timers
	clearAnimationTimers();
	try {document.getElementsByTagName("video")[0].load();document.getElementsByTagName("video")[0].play();}	//Play the embedded video if there is one
	catch(e) {console.log(e.toString());}
	delayAnimations(0);
}

//This function handles the muting of the audio as well as the changing of the mute button accordingly
function muteScreen()
{
	//If the screen is already muted...
	if (window.cpCmndMute == 1)
	{
		//Unmute the screen
		window.cpCmndMute = 0;
		//Change Mute button back to default
		for (var i = 0; i < slideElems.length; i++)
		{
			if (slideElems[i].n.toUpperCase().indexOf('MUTE') != -1) {cp.changeState(slideElems[i].n, "Normal");}
		}
	}
	//If the screen is not already muted
	else
	{
		//Mute the screen
		window.cpCmndMute = 1;
		//Change the mute button to the "muted" image
		for (var i = 0; i < slideElems.length; i++)
		{
			if (slideElems[i].n.toUpperCase().indexOf('MUTE') != -1) {cp.changeState(slideElems[i].n, "Muted");}
		}
	}
}