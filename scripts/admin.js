// Change the setting currently changing


function SetActive(element){
    const currentChoice = document.getElementsByClassName("active")
    currentChoice.classList("active","disabled")

    const newChoice = document.getElementById(element)
    newChoice.classList("disabled","active")
}