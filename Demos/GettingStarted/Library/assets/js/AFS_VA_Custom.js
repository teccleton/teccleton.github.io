function VA_DisableBookmarks()
{
    AllowBookmark = "N";
}
function VA_EnableBookmarks()
{
    AllowBookmark = "Y";
}

function VA_LessonLoad()
{
    try
    {
        var vbaControllerIsLoaded = vbaController.IsLoaded();
    }
    catch (err)
    {
        var script = document.createElement("script");
        script.src = "../cpExtFunctions.js";
        document.getElementsByTagName("head")[0].appendChild(script);
    }
}

function VA_Continue()
{
    vbaController.ContinueAssessment();
}