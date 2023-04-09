import { posts } from "./database.js";

function render(array) {
    const postList = document.querySelector(".posts__list")

    postList.innerHTML = ''

    for(let i = 0; i < array.length; i++) {
        const post = array[i]

        const card = createCard(post)

        postList.appendChild(card)
    }
}

function createCard(post) {
    const li = document.createElement("li")
    li.classList.add("list__items")

    const divPost = document.createElement("div")
    divPost.classList.add("profile__box")

    const img = document.createElement("img")
    img.classList.add("box__image")
    img.src = post.img
    img.alt = "Profile Picture"

    const divUser = document.createElement("div")
    divUser.classList.add("box__profile")

    const h3 = document.createElement("h3")
    h3.classList.add("profile__title")
    h3.innerText = post.user

    const pUser = document.createElement("p")
    pUser.classList.add("profile__texte")
    pUser.innerText = post.stack

    const h2 = document.createElement("h2")
    h2.classList.add("items__title")
    h2.innerText = post.title

    const pPost = document.createElement("p")
    pPost.classList.add("items__text")
    pPost.innerText = post.text

    const divButton = document.createElement("div")
    divButton.classList.add("items__button")

    const button = document.createElement("button")
    button.classList.add("button__post")
    button.innerText = "Abrir post"
    button.dataset.postId = post.id

    const imgHeart  = document.createElement("img")
    imgHeart.classList.add("heart__like")
    imgHeart.src = "./src/assets/img/heart.svg"


    const span = document.createElement("span")
    span.classList.add("box__like")
    span.innerText = " " + post.likes
    
    
    divUser.append(h3, pUser)
    divPost.append(img, divUser)

    divButton.append(button, imgHeart, span)

    li.append(divPost, h2, pPost, divButton)

    return li  
}


function showPostModal(array) {
    const modalController = document.querySelector(".modal-item__controller")
    const buttons = document.querySelectorAll(".posts__list > .list__items > .items__button > .button__post")

    for(let i = 0; i < buttons.length; i++){
        const button = buttons[i]

        button.addEventListener("click", (event) => {
            
            modalController.innerHTML = ''
            modalController.innerHTML = "<button class='button__close'>X</button"
            
            
            const post = findPost(array, event.target.dataset.postId)
            const modalCard = createCard(post)
            
            const modalList = document.createElement("ul")

            modalList.appendChild(modalCard)
            modalController.appendChild(modalList)

            modalController.showModal()  

            closeModal()
        })
    }
}

function findPost(array, id) {
    let post = {}

    for(let i = 0; i < array.length; i++){
        if(array[i].id == id){
            post = array[i]

            return post
        }
    }
}


function closeModal() {
    const buttonClose = document.querySelector(".button__close")
    const modalController = document.querySelector(".modal-item__controller")

    buttonClose.addEventListener("click", () => {
        modalController.close()
    })
}



render(posts)
showPostModal(posts)