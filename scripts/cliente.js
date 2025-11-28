function setActive(id){
    // Current item

    // New Item
    const newActiveItem = document.getElementById(id)
    newActiveItem.classList.remove("disabled")
    newActiveItem.classList.add("active")
}