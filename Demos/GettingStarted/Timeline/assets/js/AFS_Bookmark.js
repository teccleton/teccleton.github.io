// JavaScript Document

function ITUExitLesson()
{
	try{SCORM_objAPI = SCORM_GrabAPI();}
	catch(e){console.log("SCORM API Not Found");}
	
	var Complete_State = (ITULessonInfo.lastLesson == 'true' ? 'Course_Complete' : 'Lesson_Complete');
	
	//cp.show('LSP_BG');
	//cp.show('LSP_ITU_Logo');
	//cp.show('LSP_Menu_btn');
	
	if (window.v_inApp == 1)
	{
		pass_fail = 'fail';
	}
	
	if (pass_fail == 'pass')
	{
		//cp.changeState('LSP_BG', Complete_State);
		try{SCORM_objAPI.LMSSetValue("cmi.core.lesson_status", "passed");}
		catch(e){console.log("SCORM API Not Found");}
	}
	else if (pass_fail == 'fail')
	{
		//cp.changeState('LSP_BG', 'Lesson_Failed');
		//cp.show('LSP_Retake_btn');
		try{SCORM_objAPI.LMSSetValue("cmi.core.lesson_status", "failed");}
		catch(e){console.log("SCORM API Not Found");}
	}
	else
	{
		if (window.cpInfoCurrentSlide == window.cpInfoSlideCount)
		{
			//cp.changeState('LSP_BG', Complete_State);
			try{SCORM_objAPI.LMSSetValue("cmi.core.lesson_status", "completed");}
			catch(e){console.log("SCORM API Not Found");}
		}
		else
		{
			//cp.changeState('LSP_BG', 'Lesson_Incomplete');
			try{SCORM_objAPI.LMSSetValue("cmi.core.lesson_status", "incomplete");}
			catch(e){console.log("SCORM API Not Found");}
		}
	}
	
	try
	{
		SCORM_objAPI.LMSSetValue("cmi.core.exit", "suspend");
		SCORM_objAPI.LMSCommit("");
	}
	catch(e)
	{
		console.log("SCORM API Not Found");
	}
}

function resumeLesson()
{
	var Complete_State = (ITULessonInfo.lastLesson == 'true' ? 'Course_Complete' : 'Lesson_Complete');
	var lessonStatus;
	try{lessonStatus = SCORM_objAPI.LMSGetValue("cmi.core.lesson_status");}
	catch(e){console.log("SCORM API Not Found");}
		
	if(lessonStatus == "incomplete")
	{
		//for (var i = 0; i < slideElems.length; i++)
		//{
		//	if (slideElems[i].n.indexOf('LSP') != -1) 
		//	{
		//		cp.hide(slideElems[i].n);
		//	}
		//}
		
		window.cpCmndGotoSlide = window.v_bookmark;
		window.cpCmndResume = 1;
	}
	else 
	{
		//cp.hide('LSP_Yes_btn');
		//cp.hide('LSP_No_btn');
		if (lessonStatus == "completed" || lessonStatus == "passed")
		{
			//cp.changeState('LSP_BG', Complete_State);
		}
		else if (lessonStatus == "failed")
		{
			//cp.changeState('LSP_BG', 'Lesson_Failed');
		}
		//cp.show('LSP_Retake_btn');
	}
}

function courseMenu()
{
	/*try
	{
		SCORM_objAPI = SCORM_GrabAPI();
		SCORM_objAPI.LMSSetValue("cmi.core.exit", "suspend");
		SCORM_objAPI.LMSCommit("");
	}
	catch(e)
	{
		console.log("SCORM API Not Found");
	}
	location = location;
	try
	{
		window.top.location.reload();
	}
	catch(e)
	{
		location.reload();
	}*/
	try
	{
		SCORM_objAPI = SCORM_GrabAPI();
		SCORM_objAPI.LMSCommit("");
		SCORM_objAPI.LMSFinish("");
	}
	catch(e)
	{
		console.log("SCORM API Not Found");
	}
	window.close();
}

function restartLesson()
{
	var allElements;
	var allSlides = cp.model.data.project_main.slides.split(",");
	
	for (var i = 0; i < allSlides.length; i++)
	{
		allElements = cp.model.data[ allSlides[i] ].si;
		for (var j = 0; j < allElements.length; j++)
		{
			try
			{
				cp.changeState(allElements[j].n, cp.model.data[allElements[j].n].stl[0].stn);
			}
			catch(e)
			{
				console.log(e);
			}
		}
	}

	window.cpCmndGotoSlide = 0;
	window.cpCmndResume = 1;
}