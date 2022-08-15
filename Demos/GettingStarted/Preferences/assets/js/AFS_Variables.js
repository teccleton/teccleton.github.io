// JavaScript Document

var interfaceObj; 				//Interface Object to store Captivate Data
var	eventEmitterObj;			//Event Emitter for Captivate
var	slideElems; 				//Array holding all of the elements in a slide

var	currentQuestion;			//Current appraisal question object
var	pauseFrame;					//Holds frame location of when the slide was paused
var	isPaused;					//Boolean value to determine if slide is currently paused
var	currentSlide;				//Name of the Current Slide
var	cSlideTimes;				//Holds the starting frame and ending frame of current slide
var	btnNextName = [];			//Holds the current slide's next button name for various purposes
var	pass_fail;

var screenAnimations = [];		//Array of custom animation objects to be run on the current screen
var delayTimers = [];			//Array of timers holding times that custom animations should run

var menuLocation  = [];			//Array of Menu Location to handle navigating back to menu
var menuBtnNames  = [];			//Array of Menu Button Names on current menu to determine if menu is completed
var menuTypeArray = [];			//Array for storing whether each menu is 'onscreen' or 'offscreen' to determine behavior
var menuDepth = 0;				//Current depth of nested menu objects

var beginLesson = 0;

var studentScore = 0;
var studentMax = 0;

var appraisalIntro = 0;