let myLinks = [];

const inputBtn = document.querySelector("#input-btn");
const tabBtn = document.querySelector("#tab-btn")
const delBtn = document.querySelector("#delete-btn");
const inputEl = document.querySelector("#input-el");
const ulEl = document.querySelector("#ul-el");

const linksFromLocalStorage = JSON.parse(localStorage.getItem("link"))

const render = (e) => {
    let listItems ="";
    for (let i = 0; i < e.length; i++) {
        listItems += `<li><a target="_blank" href="${e[i]}"> ${e[i]}</a></li>`
    }
    ulEl.innerHTML = listItems
}

if (linksFromLocalStorage) {
    myLinks = linksFromLocalStorage
    render(myLinks)
}

inputBtn.addEventListener("click", function() {
    myLinks.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("link", JSON.stringify(myLinks))
    render(myLinks)
})

tabBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLinks.push(tabs[0].url);
        localStorage.setItem("link", JSON.stringify(myLinks))
        render(myLinks)
    })
})


delBtn.addEventListener("dblclick", function(){
    localStorage.clear();
    myLinks = [];
    render(myLinks)
})
 


