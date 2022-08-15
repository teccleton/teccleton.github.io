// JavaScript Document

//This functions handles the updating of the progress bar at the bottom of each slide.
function updateProgressBar()
{	
	//Set v_currentSlide taking Title page into account (-1) this is used for progress bar and (x of x) displayed by progress bar
	window.v_currentSlide = window.cpInfoCurrentSlide - 1;
	
	var progressc, progress, container;
	for (var i = 0; i < slideElems.length; i++)
	{
		if (slideElems[i].n.toUpperCase().indexOf('PROGRESSBAR') != -1)			{progress = slideElems[i].n;}
		if (slideElems[i].n.toUpperCase().indexOf('PROGRESSCONTAINER') != -1)	{container = slideElems[i].n;}
	}
	//setInterval to ensure the components have loaded on the screen, otherwise function fails first try sometimes
	var interval = setInterval (function () 
	{
		if(document.getElementById(progress + 'c') && document.getElementById(container + 'c'))
		{
			progressc = document.getElementById(progress + 'c'); 	//changes need to be applied to the name ending with an additional c (set)
			progress  = document.getElementById(progress);		//Information can be obtained from the name without the additional c (get)
			container = document.getElementById(container);

			var cWidth  = parseInt(container.style.width);	//Get container width
			var cbWidth = 2 * (parseInt(progress.style.left) - parseInt(container.style.left));	//get width of container border

			//set the width of the progress bar based on total width is container minus borders in pixels, divided by total slides is how much each slide should
			//add to the width, multiplied by how many slides in we are is the width of the progress bar.
			progressc.style.width = Math.round(((cWidth-cbWidth)/window.v_totalSlides)*window.v_currentSlide) + "px";

			//once the progress bar has been updated successfully, interval is no longer needed, clear and set to null
			clearInterval(interval);
			interval = null;
		}
	}, 1, false);
}