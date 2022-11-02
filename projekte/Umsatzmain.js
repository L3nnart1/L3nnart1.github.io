let monate = document.getElementById("monate");
const verkfpreis = document.getElementById("verkaufspreis")
let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");
let maxverkäufe = document.querySelector("#antwort");
let gewinnsum = document.querySelector("#gewinnsumme");
let umasatzsum = document.querySelector("#umsatzsumme");
let square = document.querySelector("#verkäufe");
let gewinnsquare = document.querySelector("#gewinn");
let slider = document.querySelector("#myRange");
let nummer = document.querySelector("#nummer");
let monatsAnzeige = document.querySelector("#monateAnzeige");
let vPreis = document.querySelector("#vPreis");
let resetBtn = document.querySelector("#reset");
const herstellungskosten = document.querySelector("#Herstellungspreis");
canvas.style.background = "#222632";

canvas.width = 600;
canvas.height = 600;

numb = 645.99;

let dist = 30;
let checker = 200;
let säulen = [];
let anzahl = -1;

function txtchange(){
    antwort.innerText = verkfpreis.value;
}

function rechner(){
    anzahl += 1;
    let gewinn = verkfpreis.value - herstellungskosten.value;
    let monatsgewinn = 1800;
    let verkäufe = (monate.value * monatsgewinn) / verkfpreis.value;
//    console.log(monate.value * 1 === NaN)
    
    if (monate.value * 1 === NaN || verkfpreis.value * 1 == NaN){
        alert("Du musst Zahlen eingeben");
        return;
    }
    maxverkäufe.innerText = `MaximaleVerkäufe = ${Math.floor(verkäufe)}`;
    gewinnsum.innerText = `Gewinn = ${Math.floor(verkäufe * gewinn)}€`
    umasatzsum.innerText = `Umsatz = ${Math.floor(verkäufe * verkfpreis.value)}€`

    function draw(){
        if (verkfpreis.value < herstellungskosten.value){
            alert("Der Verkaufspreis ist zu niedrig!")
        }
        if (monate.value > 12){
            alert("Das Jahr hat nur 12 Monate!")
        }
        if (monate.value < 1){
            alert("Du brauchst mindestens einen Monat für die berechnung!")
        }
        let säulenH = (verkäufe * gewinn) * -1;
        if (checker - verkfpreis.value != 200 && checker - monate.value != 200 && verkfpreis.value > herstellungskosten.value && monate.value < 13 && monate.value > 0){
            ctx.fillStyle = "black";
            ctx.fillRect(dist,600,50,- (verkäufe * gewinn / 27));
            säulen.push({v:verkäufe ,h:säulenH, m:monate.value, vP:verkfpreis.value});
            dist += 72;
        }
    }
    draw();
    console.log(säulen);
}
function legende(){
    let counter = 0;
    let counter2 = 0;
    for (let i = 600; i > 0; i -= 37.5) {
        if (counter === 2){
            counter = 0;
            ctx.fillRect(0,i,15,4);
        }
        ctx.fillStyle = "black";
        ctx.fillRect(1,i,10,2);
        if (counter2 === 5){
            ctx.fillStyle = "#505fa0";
            ctx.fillRect(0,i,15,4);
            counter2 = 0;
            ctx.fillStyle = "black"
        }
        counter += 1;
        counter2 += 1;
    }
}
legende();

function data(){
    let vlue = slider.value
    if (slider.value > anzahl){
        vPreis.innerText = null;
        square.innerText = null;
        gewinnsquare.innerText = null;
        monatsAnzeige.innerText = null;
        maxverkäufe.innerText = null;
        umasatzsum.innerText = null;
        gewinnsum.innerText = null;
    }
    nummer.innerText = (`Säule ${vlue +++ 1}`)
    square.innerText = (`Verkäufe: ${Math.floor(säulen[slider.value].v)}`);
    gewinnsquare.innerText = (`Gewinn: ${Math.floor((säulen[slider.value].h) * -1)}€`);
    monatsAnzeige.innerText = (`Monate: ${säulen[slider.value].m}`);
    vPreis.innerText = (`Verkaufspreis: ${säulen[slider.value].vP}€`)
}
function reset(){
    säulen = [];
    ctx.fillStyle = "#222632";
    ctx.fillRect(0,0,600,600);
    ctx.fillStyle = "black";
    legende();
    dist = 30;
    vPreis.innerText = null;
    nummer.innerText = null;
    square.innerText = null;
    gewinnsquare.innerText = null;
    monatsAnzeige.innerText = null;
    slider.value = 0;
    maxverkäufe.innerText = null;
    umasatzsum.innerText = null;
    gewinnsum.innerText = null;
    anzahl = -1;
}
