// JavaScript Document

//This function handles the locking of the next button if the student has not viewed the entire slide
function lockNext()
{
	btnNextName = [];
	//find next button on the current page and assign its name to variable
	for (var i = 0; i < slideElems.length; i++)
	{
		if (slideElems[i].n.toUpperCase().indexOf('NEXT') != -1)	{btnNextName.push(slideElems[i].n);}
	}
	
	//if this is the first time viewing this page, add event listener to update progress only when slide has been finished
	if (window.v_progress < window.v_currentSlide)
	{
		for(var i = 0; i < btnNextName.length; i++)
		{
			cp.hide(btnNextName[i]);
		}
		window.cpAPIEventEmitter.addEventListener("CPAPI_VARIABLEVALUECHANGED", checkSlideComplete, "cpInfoCurrentFrame");
	}
	//if this page has been visited to completion once before, just show the next button right away.
	else
	{
		for(var i = 0; i < btnNextName.length; i++)
		{
			cp.show(btnNextName[i]);
		}
	}
}

//This function checks if the slide has reached completion by comparing the current frame to the slides ending frame
function checkSlideComplete()
{
	//Allow 2 second difference in case of default 1.5 sec pause for some objects
	if (window.cpInfoCurrentFrame > (cSlideTimes.to - 60)) 
	{
		for(var i = 0; i < btnNextName.length; i++)
		{
			cp.show(btnNextName[i]);
		}
		window.v_progress = window.v_currentSlide;
		if (window.v_inMenu == 0) window.v_bookmark = window.v_currentSlide;
		window.cpAPIEventEmitter.removeEventListener("CPAPI_VARIABLEVALUECHANGED", checkSlideComplete, "cpInfoCurrentFrame");
	}
}