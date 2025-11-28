function setActive(id){
    // Current item
    const previousItem = document.getElementsByClassName("active")[0]
    previousItem.classList.remove("active")
    previousItem.classList.add("disabled")

    const currentlyDisplaying = document.getElementsByClassName("show")
    currentlyDisplaying.classList.remove("show")
    currentlyDisplaying.classList.add("no-show")

    // New Item
    const newActiveItem = document.getElementById(id)
    newActiveItem.classList.remove("disabled")
    newActiveItem.classList.add("active")

    
}