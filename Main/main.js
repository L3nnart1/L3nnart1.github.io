
const hamburger = document.querySelector(".hamburger");
const mobile_nav = document.querySelector(".mobile-nav");
const home_link = document.querySelector(".homelink");

hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("is-active");
    mobile_nav.classList.toggle("is-active");
    home_link.classList.toggle("is-active")
});
const oben = document.querySelector(".oben");
const unten = document.querySelector(".unten");
let arr = [0,0];
let count = 0;
let count2 = 0

function change() {
    console.log("hi")
    const obenstyle = getComputedStyle(oben);
    oben.style.setProperty("color", "black")
    console.log({obenstyle})
};
window.addEventListener("scroll", () => {
    const Scrolled = window.scrollY;

    if (Scrolled > 19) {
        oben.classList.remove("at-top");
        unten.classList.remove("at-end");
    }

    if (Scrolled < 20) {
//       oben.style.setProperty("margin-left", `0px`);
//       unten.style.setProperty("margin-left", `0px`);
        oben.classList.add("at-top");
        unten.classList.add("at-end");
        count = 0;
        count2 = 0;
    }

    if (window.matchMedia("(max-width: 767px").matches) {
        arr.push(Scrolled);
        arr.splice(0,1);
    
        if (arr[1] > 19 && arr[1] < 1000){
            if (arr[0] < arr[1]) {
                count += 4;
                count2 -= 4;
                console.log(count)
            }
            if (arr[0] > arr[1]){
                if (count > 0) {
                    count -= 5;
                    count2 += 5;
                }
            }
            oben.style.setProperty("margin-left", `${count}px`);
            unten.style.setProperty("margin-left", `${count2}px`);
        };
        if (Scrolled === 0) {
            oben.style.setProperty("margin-left", "0px");
            unten.style.setProperty("margin-left", "0px");
            count = 0;
            count2 = 0;
        }
    }
    else{
        if (Scrolled < 600) {
            arr.push(Scrolled);
            arr.splice(0,1);
            
            if (arr[1] > 19 && arr[1] < 1000){
                if (arr[0] < arr[1]) {
                    count += 5;
                    count2 -= 5;
                }
                if (arr[0] > arr[1]){
                    if (count > 0) {
                        count -= 6;
                        count2 += 6;
                    }
                }
                oben.style.setProperty("margin-left", `${count}px`);
                unten.style.setProperty("margin-left", `${count2}px`);
            };   
        }
    }
});

const Lander = document.querySelector(".Landertxt")

if (navigator.vendor.startsWith('Apple')) {
    Lander.classList.add('is-active');
    oben.classList.add("apple");
    unten.classList.add("apple")
}
