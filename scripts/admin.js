// Change the setting currently changing


function SetActive(element){
    const currentChoice = document.getElementsByClassName("active")[0]
    currentChoice.classList.remove("active")
    currentChoice.classList.add("disabled")

    const newChoice = document.getElementById(element)
    newChoice.classList.remove("disabled")
    newChoice.classList.add("active")

    //Get class for us to show
    var displayId = "show-"+element
    const currentInfo = document.getElementById(displayId)
    currentInfo.classList.remove("hide-info")
    currentInfo.classList.add("show-info")

    // Hide the previous one
    const lastInfo = document.getElementsByClassName("show-info")[0]
    lastInfo.classList.remove("show-info")
}