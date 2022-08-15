// JavaScript Document

//This function is called upon entering a menu
function enterMenu(menuType)
{
	setTimeout(function() 
	{
		window.v_lockNext = 'no';
		window.v_inMenu = 1;
			
		//If this is the first time navigating to the menu, initialize
		if(menuLocation.indexOf(window.cpInfoCurrentSlide) == -1)
			initializeMenu(menuType);
			
		loadScreen();
		
		//Check for Menu Completion to enable the next button and move on
		checkMenuCompletion();
		
		//If the menu is an 'onscreen' menu, hide the popup portion upon entering screen
		menuPopupClose();
		
		for (var i = 0; i < slideElems.length; i++)
		{
			if (slideElems[i].n.toUpperCase().indexOf('MENUCONTINUE') != -1)	{cp.hide(slideElems[i].n);}
			if (slideElems[i].n.toUpperCase().indexOf('MENUPREVIOUS') != -1)	{cp.hide(slideElems[i].n);}
		}
		
	}, 50);
}

//This function initializes the menu by setting the type, return slide location, and pushed button names to check for completions
function initializeMenu(menuType)
{
	//Add current slide to list of menu locations in case of nested menus
	if (typeof menuLocation[menuDepth] === 'undefined')
	{
		menuLocation.push(window.cpInfoCurrentSlide);
	}
	//push menuType, provided by developer, to the array for determining behavior. ('onscreen' or 'offscreen')
	if (typeof menuTypeArray[menuDepth] === 'undefined')
	{
		menuTypeArray.push(menuType);
	}
	//Push all Buttons to an array that start with the name 'MenuOption', use this array to check completion status
	if (typeof menuBtnNames[menuDepth] === 'undefined')
	{
		menuBtnNames.push([]);
		for (var i = 0; i < slideElems.length; i++)
		{
			if (slideElems[i].n.toUpperCase().indexOf('MENUOPTION') != -1)
			{
				menuBtnNames[menuDepth].push(slideElems[i].n);
			}
		}
		//console.log(menuBtnNames[menuDepth]);
	}
	menuDepth++;
}

//This function checks the menu slide for completion status by checking the state of each individual button
function checkMenuCompletion()
{
	var menuComplete;	//Holds the boolean for if the menu has been completed
	
	btnNextName = [];
	//Find the name of the next button and save it to variable
	for (var i = 0; i < slideElems.length; i++)
	{
		if (slideElems[i].n.toUpperCase().indexOf('NEXT') != -1)	{btnNextName.push(slideElems[i].n);}
	}
	
	//initialize menuComplete as true before checking buttons
	menuComplete = true;
	//Check each button for the default Normal state, this indicates it has not been visited
	for (var i = 0; i < menuBtnNames[menuDepth-1].length; i++)
	{
		if (cp.model.data[ menuBtnNames[menuDepth-1][i] ].currentState == 0)
		{
			menuComplete = false;	//If one or more button has not been visited, menuComplete is false
		}
	}
	
	//Hide or show the next button obtained earlier based on whether menuComplete is true or false
	if (menuComplete == true) 
	{
		for(var i = 0; i < btnNextName.length; i++)
		{
			cp.show(btnNextName[i]);
		}
	}
	else
	{
		for(var i = 0; i < btnNextName.length; i++)
		{
			cp.hide(btnNextName[i]);
		}
	}
}

//This function handles the popup and navigation for 'onscreen' and 'offscreen' menus respectively
function selectMenuOption(menuTarget)
{
	//If menu is 'offscreen' a number is provided to navigate to that portion of the course
	if (menuTypeArray[menuDepth - 1] == 'offscreen')
	{
		window.cpCmndGotoSlide = (menuTarget - 1);
		window.cpCmndResume = 1;
	}
	//If menu is 'onscreen' a string is provided that changes the state of all MenuPopup objects
	else if (menuTypeArray[menuDepth - 1] == 'onscreen')
	{
		for (var i = 0; i < slideElems.length; i++)
		{
			if (slideElems[i].n.toUpperCase().indexOf('MENUPOPUP') != -1)
			{
				cp.show(slideElems[i].n);
				cp.changeState(slideElems[i].n, "NewState" + menuTarget);
			}
			//Also shows the close button if there is one
			if (slideElems[i].n.toUpperCase().indexOf('MENUCLOSE') != -1)
			{
				cp.show(slideElems[i].n);
			}
		}
		
		if (menuTarget.toString().indexOf("_") != -1)
		{
			for (var i = 0; i < slideElems.length; i++)
			{
				if (slideElems[i].n.toUpperCase().indexOf('MENUCONTINUE') != -1)	{cp.show(slideElems[i].n);}
			}
		}
		else
		{
			//console.log("no _");
			for (var i = 0; i < slideElems.length; i++)
			{
				if (slideElems[i].n.toUpperCase().indexOf('MENUCONTINUE') != -1)	{cp.hide(slideElems[i].n);}
				if (slideElems[i].n.toUpperCase().indexOf('MENUPREVIOUS') != -1)	{cp.hide(slideElems[i].n);}
			}
		}	
		//Check for Menu Completion to enable the next button and move on
		checkMenuCompletion();
	}
}

function onscreenMenuContinue()
{
	var stateNames = getMenuStateNames();
	var underscore = window.v_menuOption.indexOf("_");
	var temp = window.v_menuOption.substring(0, (underscore + 1)) + (parseInt(window.v_menuOption.substring(underscore + 1)) + 1);
	var temp2 = window.v_menuOption.substring(0, (underscore + 1)) + (parseInt(window.v_menuOption.substring(underscore + 1)) + 2);
	
	//Comment Here
	if (stateNames.indexOf("NewState" + temp) != -1)
	{
		for (var i = 0; i < slideElems.length; i++)
		{
			if (slideElems[i].n.toUpperCase().indexOf('MENUPOPUP') != -1)
			{
				cp.show(slideElems[i].n);
				cp.changeState(slideElems[i].n, "NewState" + temp);
			}
			if (slideElems[i].n.toUpperCase().indexOf('MENUPREVIOUS') != -1)	{cp.show(slideElems[i].n);}
		}
		window.v_menuOption = temp;
	}
	
	//Comment Here
	if (stateNames.indexOf("NewState" + temp2) != -1)
	{
		for (var i = 0; i < slideElems.length; i++)
		{
			if (slideElems[i].n.toUpperCase().indexOf('MENUCONTINUE') != -1)	{cp.show(slideElems[i].n);}
		}
	}
	else
	{
		for (var i = 0; i < slideElems.length; i++)
		{
			if (slideElems[i].n.toUpperCase().indexOf('MENUCONTINUE') != -1)	{cp.hide(slideElems[i].n);}
		}
	}
}

function onscreenMenuPrevious()
{
	var stateNames = getMenuStateNames();
	var underscore = window.v_menuOption.indexOf("_");
	var temp = window.v_menuOption.substring(0, (underscore + 1)) + (parseInt(window.v_menuOption.substring(underscore + 1)) - 1);
	var temp2 = window.v_menuOption.substring(0, (underscore + 1)) + (parseInt(window.v_menuOption.substring(underscore + 1)) - 2);
	
	//Comment Here
	if (stateNames.indexOf("NewState" + temp) != -1)
	{
		for (var i = 0; i < slideElems.length; i++)
		{
			if (slideElems[i].n.toUpperCase().indexOf('MENUPOPUP') != -1)
			{
				cp.show(slideElems[i].n);
				cp.changeState(slideElems[i].n, "NewState" + temp);
			}
			if (slideElems[i].n.toUpperCase().indexOf('MENUCONTINUE') != -1)	{cp.show(slideElems[i].n);}
		}
		window.v_menuOption = temp;
	}
	if (stateNames.indexOf("NewState" + temp2) != -1)
	{
		for (var i = 0; i < slideElems.length; i++)
		{
			if (slideElems[i].n.toUpperCase().indexOf('MENUPREVIOUS') != -1)	{cp.show(slideElems[i].n);}
		}
	}
	else
	{
		for (var i = 0; i < slideElems.length; i++)
		{
			if (slideElems[i].n.toUpperCase().indexOf('MENUPREVIOUS') != -1)	{cp.hide(slideElems[i].n);}
		}
	}
}

function OnscreenMenuNextOption()
{
	var optionCount = menuBtnNames[menuDepth-1].length;
	window.v_menuOption = (window.v_menuOption == optionCount ? 1 : window.v_menuOption + 1);
	selectMenuOption(window.v_menuOption);
	cp.changeState(menuBtnNames[menuDepth-1][v_menuOption - 1], "Visited");
}

function OnscreenMenuPreviousOption()
{
	var optionCount = menuBtnNames[menuDepth-1].length;
	window.v_menuOption = (window.v_menuOption == 1 ? optionCount : window.v_menuOption - 1);
	selectMenuOption(window.v_menuOption);
	cp.changeState(menuBtnNames[menuDepth-1][v_menuOption - 1], "Visited");
}

//This function closes the popup for an 'onscreen' menu by hiding all related components and itself
function menuPopupClose()
{
	for (var i = 0; i < slideElems.length; i++)
	{
		if (slideElems[i].n.toUpperCase().indexOf('MENUCLOSE') != -1) 	{cp.hide(slideElems[i].n);}
		if (slideElems[i].n.toUpperCase().indexOf('MENUPOPUP') != -1)	{cp.changeState(slideElems[i].n, "Normal");}
	}
}

//This function is used when the end of an 'offscreen' menu option navigation path has been reached
//to return to the menu slide that was saved at initialization
function returnToMenu()
{
	window.cpCmndGotoSlide = (menuLocation[menuDepth - 1] - 1);
	window.cpCmndResume = 1;
}

//This function handles leaving a menu after completion, or even leaving a menu by going to previous slide
function leaveMenu(nextSlide)
{
	menuLocation.pop();
	menuTypeArray.pop();
	menuBtnNames.pop();
	menuDepth--;
	
	window.cpCmndGotoSlide = (nextSlide - 1);
	window.cpCmndResume = 1;
	
	if (menuLocation.length == 0)
	{
		window.v_inMenu = 0;
	}
}

function getMenuStateNames()
{
	var stateNames = [];
	for (var i = 0; i < slideElems.length; i++)
	{
		if (slideElems[i].n.toUpperCase().indexOf('MENUPOPUP') != -1)	
		{
			for (var j = 0; j < cp.model.data[slideElems[i].n].stl.length; j++)
			{
				stateNames.push(cp.model.data[slideElems[i].n].stl[j].stn);
			}
		}
	}
	return stateNames;
}