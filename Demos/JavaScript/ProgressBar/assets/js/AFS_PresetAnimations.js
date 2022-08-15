// ITUPresets.js
var presetCount = 0;
var currentPreset = [];

function loadPresets()
{
	while (true)
	{
		if(window["preset" + (presetCount+1)])
		{
			presetCount++;
		}
		else
		{
			break;
		}
	}

	for (var i = 1; i <= presetCount; i++)
	{
		currentPreset = [];
		currentPreset = window["preset" + i].split('$');
		currentPreset[0] = currentPreset[0].split('|');
		currentPreset[1] = currentPreset[1].split('|');
		addPresetListener(currentPreset, ("preset" + i));
	}

	function addPresetListener(preset, ndx)
	{
		window.addEventListener("mouseover", function(e)
		{
			if (e.target.id.indexOf(ndx) != -1)
			{
				var interval = setInterval(function()
				{
					if (document.getElementById(e.target.id + "c"))
					{
						var objc = document.getElementById(e.target.id + "c");
						var obj  = document.getElementById(e.target.id);

						objc.style.transition = "all " + preset[0][0] + "s";
						objc.style.WebkitTransition = "all " + preset[0][0] + "s";
						objc.style.top = (parseInt(objc.style.top) + parseInt(preset[0][1])) + "px";
						objc.style.left = (parseInt(objc.style.left) + parseInt(preset[0][2])) + "px";
						objc.style.width = (parseInt(objc.style.width) + parseInt(preset[0][5])) + "px";
						objc.style.height = (parseInt(objc.style.height) + parseInt(preset[0][6])) + "px"; 
						objc.style.opacity = parseFloat(preset[0][7]);
						objc.style.transform = "scale(" + preset[0][3] + "," + preset[0][4] + ") rotate(" + preset[0][8] + "deg)";
						clearInterval(interval);
						interval = null;
						console.log(ndx + " mouseover");
					}
				}, 1, false);
			}
		}, false);

		window.addEventListener("mouseout", function(e)
		{
			if(e.target.id.indexOf(ndx) != -1)
			{
				var interval = setInterval(function()
				{
					if (document.getElementById(e.target.id + "c"))
					{
						var objc = document.getElementById(e.target.id + "c");
						var obj = document.getElementById(e.target.id);

						objc.style.transition = "all " + preset[0][0] + "s";
						objc.style.WebkitTransition = "all " + preset[0][0] + "s";
						objc.style.top = (parseInt(objc.style.top) - parseInt(preset[0][1])) + "px";
						objc.style.left = (parseInt(objc.style.left) - parseInt(preset[0][2])) + "px";
						objc.style.width = (parseInt(objc.style.width) - parseInt(preset[0][5])) + "px";
						objc.style.height = (parseInt(objc.style.height) - parseInt(preset[0][6])) + "px";
						objc.style.opacity = 1; 
						objc.style.transform = "scaleX(1) scaleY(1)";
						clearInterval(interval);
						interval = null;
						console.log(ndx + " mouseout");
					}
				}, 1, false);
			}
		}, false);

		window.addEventListener("mousedown", function(e)
		{
			if (e.target.id.indexOf(ndx) != -1)
			{
				var interval = setInterval(function()
				{
					if (document.getElementById(e.target.id + "c"))
					{
						var objc = document.getElementById(e.target.id + "c");
						var obj  = document.getElementById(e.target.id);

						objc.style.transition = "all " + preset[1][0] + "s";
						objc.style.WebkitTransition = "all " + preset[1][0] + "s";
						objc.style.top = (parseInt(objc.style.top) + parseInt(preset[1][1])) + "px";
						objc.style.left = (parseInt(objc.style.left) + parseInt(preset[1][2])) + "px";
						objc.style.width = (parseInt(objc.style.width) + parseInt(preset[1][5])) + "px";
						objc.style.height = (parseInt(objc.style.height) + parseInt(preset[1][6])) + "px"; 
						objc.style.opacity = parseFloat(preset[1][7]);
						objc.style.transform = "scale(" + preset[1][3] + "," + preset[1][4] + ") rotate(" + preset[1][8] + "deg)";
						clearInterval(interval);
						interval = null;
						console.log(ndx + " mousedown");
					}
				}, 1, false);
			}
		}, false);

		window.addEventListener("mouseup", function(e)
		{
			if (e.target.id.indexOf(ndx) != -1)
			{
				var interval = setInterval(function()
				{
					if (document.getElementById(e.target.id + "c"))
					{
						var objc = document.getElementById(e.target.id + "c");
						var obj  = document.getElementById(e.target.id);

						objc.style.transition = "all " + preset[1][0] + "s";
						objc.style.WebkitTransition = "all " + preset[1][0] + "s";
						objc.style.top = (parseInt(objc.style.top) - parseInt(preset[1][1])) + "px";
						objc.style.left = (parseInt(objc.style.left) - parseInt(preset[1][2])) + "px";
						objc.style.width = (parseInt(objc.style.width) - parseInt(preset[1][5])) + "px";
						objc.style.height = (parseInt(objc.style.height) - parseInt(preset[1][6])) + "px"; 
						objc.style.opacity = parseFloat(preset[0][7]);
						objc.style.transform = "scale(" + preset[0][3] + "," + preset[0][4] + ") rotate(" + preset[0][8] + "deg)";
						clearInterval(interval);
						interval = null;
						console.log(ndx + " mouseup");
					}
				}, 1, false);
			}
		}, false);
	}
}