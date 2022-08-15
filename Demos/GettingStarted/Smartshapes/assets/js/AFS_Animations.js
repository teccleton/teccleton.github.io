// JavaScript Document

//Use this function to assign screenAnimations Array with all of the objects to be custom animated on the screen. Be sure to escape \'
//[{'mc_ID':'name_of_object', 'delay':'number_delay_in_seconds', 'currFrame':'frame_to_start_animation', 'frameCount':'frames_to_run', 'loop':'true_or_false'}]
function defineScreenAnimations(inputAnimations)
{
	screenAnimations = (inputAnimations != '' ? eval(inputAnimations) : []);
	console.log("Screen Animations Object: ");
	console.log(screenAnimations);
}

//clear all timers and set delayTimers to empty array
function clearAnimationTimers()
{
	var id = window.setTimeout(function() {}, 0);
	
	while (id--) {window.clearTimeout(id);}
	
	delayTimers = [];
}

//This function sets the delay of each animation to be run
function delayAnimations(pauseTime)
{
	//For each animation on the screen, set a timeout to runFrames based on the animation's delay time that was set 
	for (var i = 0; i < screenAnimations.length; i++)
	{
    	delayTimers.push(setTimeout( runFrames, (parseInt(screenAnimations[i].delay) - pauseTime)*1000, screenAnimations[i]));
	}
}

//This function runs the actually animation after a certain amount of time established by delayAnimations()
function runFrames(ani_mc)
{
	//change state to next frame and increment counter
	cp.changeState(ani_mc.mc_ID, "NewState" + ani_mc.currFrame++);

	//recursive call to runFrames until frames reach the end
    if ( ani_mc.currFrame <= ani_mc.frameCount )
    {
        setTimeout(runFrames, 50, ani_mc);
    }
	//if loop option has been set to true, restart the animation at frame 1 indefinitely
	else if ( ani_mc.loop == "true" )
	{
		ani_mc.currFrame = 1;
		setTimeout(runFrames, 50, ani_mc);
	}
}

function getObjectName(partialString)
{
	var objectName;
	for (var i = 0; i < slideElems.length; i++)
	{
		if (slideElems[i].n.toUpperCase().indexOf(partialString.toUpperCase()) != -1)
		{
			objectName = slideElems[i].n;
		}
	}
	return objectName;
}