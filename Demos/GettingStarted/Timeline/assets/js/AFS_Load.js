// JavaScript Document

///This function initializes our interface to be able to run code on each slide enter
window.addEventListener( 'moduleReadyEvent', function ( e )
{       
	interfaceObj = e.Data;
	eventEmitterObj = interfaceObj.getEventEmitter();
	initializeEventListeners();
});

//This function initializes the event listener for each slide enter
function initializeEventListeners()
{               
	if ( interfaceObj )
	{
		if ( eventEmitterObj )
		{
			eventEmitterObj.addEventListener( 	'CPAPI_SLIDEENTER', 
												function ( e ) 
												{
													//Assign the captivate elements to the slideElems Array
													slideElems = e.Data.si; 
													//Assign the current slide name from the captivate data
													currentSlide = cp.model.data.project_main.slides.split(",");
													currentSlide = currentSlide[window.cpInfoCurrentSlide - 1];
													//Assign the frame start and end locations of current slide
													cSlideTimes = {from:cp.model.data[currentSlide].from, 
																	to:cp.model.data[currentSlide].to};			
												}
											);       
		}
	}
}

//This function will be called once on only the title slide. Use this function to initial any values needed.
function loadLesson()
{
	try{SCORM_objAPI = SCORM_GrabAPI();}
	catch(e){console.log("SCORM API Not Found");}
	
	loadPresets();
	
	//total slides -1 due to the title page.
	setTimeout(function () 
	{
		window.v_totalSlides = window.cpInfoSlideCount - 1;
		window.v_inApp = window.v_inMenu = 0;

		window.v_courseTitle = AFSLessonInfo.courseTitle;
		window.v_courseVersion = AFSLessonInfo.courseVersion;
		window.v_courseLocation = AFSLessonInfo.courseLocation;
		window.v_signatureBlock = AFSLessonInfo.signatureBlock;
		window.v_masterScore = AFSLessonInfo.masterScore;

		//for (var i = 0; i < slideElems.length; i++)
		//{
		//	if (slideElems[i].n.toUpperCase().indexOf('LSP') != -1) 
		//	{
		//		cp.hide(slideElems[i].n);
		//	}
		//}
		try
		{
			SCORM_objAPI.LMSSetValue("cmi.core.lesson_status", "incomplete");
			SCORM_objAPI.LMSSetValue("cmi.core.lesson_location", "Slide_1");
			SCORM_objAPI.LMSSetValue("cmi.core.score.max", "");
			SCORM_objAPI.LMSSetValue("cmi.core.score.min", "");
			SCORM_objAPI.LMSSetValue("cmi.core.score.raw", "");
			SCORM_objAPI.LMSSetValue("cmi.suspend_data", "");
			SCORM_objAPI.LMSSetValue("cmi.core.exit", "suspend");
			SCORM_objAPI.LMSCommit("");
		}
		catch(e)
		{
			console.log("SCORM API Not Found");
		}
		window.v_bookmark = window.v_progress = 0;
	}, 50);
}

//This function is called at the beginning of every normal slide. Sets the stage and updates progress and bookmarks accordingly
function loadScreen()
{
	try{SCORM_objAPI = SCORM_GrabAPI();}
	catch(e){console.log("SCORM API Not Found");}

	
	
	setTimeout(function () 
	{
		window.cpAPIInterface.pause();
		
		//Set v_currentSlide taking Title page into account (-1) this is used for progress bar and (x of x) displayed by progress bar
		window.v_currentSlide = window.cpInfoCurrentSlide - 1;
		
		//reset pause frame to the start frame of current slide and reset isPaused
		pauseFrame = cSlideTimes.from;
		isPaused = false;
		
		//If the screen was muted on the previous slide, keep the new slide muted and update the state of the mute button to reflect being muted
		if (window.cpCmndMute == 1)
		{
			for (var i = 0; i < slideElems.length; i++)
			{
				if (slideElems[i].n.toUpperCase().indexOf('MUTE') != -1) {cp.changeState(slideElems[i].n, "Muted");}
			}
		}
		
		//Hide retake button for failed screen
		//cp.hide('LSP_Retake_btn');
		
		//Clear any timers that may be remaining from previous slide
		clearAnimationTimers();
		
		//if (cp.model.data["LSP_BG"].canvasPainterObject.visible == 0)
		//{
			updateProgressBar();
			
			//If next button is locked down, call lockNext function to track progress, otherwise just set progress at slideEnter
			if (window.v_lockNext == "yes")
			{
				lockNext();
			}
			else if (window.v_inMenu == 1)
			{
				window.v_bookmark = menuLocation[0] - 1;
				if (window.v_progress < window.v_currentSlide) {window.v_progress = window.v_currentSlide;}
			}
			else if (window.v_progress < window.v_currentSlide)
			{
				window.v_bookmark = window.v_progress = window.v_currentSlide;
			}

			if (window.v_progress > window.v_currentSlide)
			{
				for (var i = 0; i < slideElems.length; i++)
				{
					if (slideElems[i].n.toUpperCase().indexOf('AUDIOBOX') != -1)	{cp.changeState(slideElems[i].n, "NewState1");}
				}
			}

			window.cpAPIInterface.play();
		
			//Run array of animations from start frame 0
			delayAnimations(0);
		//}
		//else 
		//{
		//	if (window.v_inApp == 1)
		//	{
		//		cp.changeState('LSP_BG', 'Lesson_Failed');
		//		cp.show('LSP_Retake_btn');
		//		cp.hide('LSP_Yes_btn');
		//		cp.hide('LSP_No_btn');
		//		try
		//		{
		//			SCORM_objAPI.LMSSetValue("cmi.core.lesson_status", "failed");
		//			SCORM_objAPI.LMSSetValue("cmi.core.exit", "suspend");
		//			SCORM_objAPI.LMSCommit("");
		//		}
		//		catch(e)
		//		{
		//			console.log("SCORM API Not Found");
		//		}
		//	}
		//}
		
	}, 50);
}