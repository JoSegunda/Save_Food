function setActive(id){
    // Current item
    const previousItem = document.getElementsByClassName("active")[0]
    previousItem.classList.remove("active")
    previousItem.classList.add("disabled")

    // New Item
    const newActiveItem = document.getElementById(id)
    newActiveItem.classList.remove("disabled")
    newActiveItem.classList.add("active")

    // remove current description
    const currentlyDisplaying = document.getElementsByClassName("show")[0]
    currentlyDisplaying.classList.remove("show")
    currentlyDisplaying.classList.add("no-show")
    // Adding new description
    var show = "show-"+id
    const newDisplay = document.getElementById(show)
    newDisplay.classList.remove("no-show")
    newDisplay.classList.add("show")
}