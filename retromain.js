let web = document.getElementById("name_field1");
let site = document.getElementById("name_field2")
let main = document.getElementById("name_field3")
let nav2 = document.querySelector(".nav2")
let link = document.querySelector("#link")

let mainval;

setInterval(update, 500)

function update() {
    mainval = main.value;
}

function write() {
    web.value = "www.mySearch.com";
    site.value = "mySearch"
}

function search() {
    if (mainval === "dino game") {
        link.href = "https://chromedino.com/"
    }else {
        nav2.classList.remove("is-active");
        alert("not found")
    }
}
write()
console.log("🔎")
