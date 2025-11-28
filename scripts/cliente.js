function setActive(id){
    const activeItem = document.querySelector(".active")
    activeItem.classList.remove("active") 
    activeItem.classList.remove("disabled") 
    
    const activateItem = document.getElementById(id)
    activateItem.classList.remove("disabled")
    activateItem.classList.active("active")
}