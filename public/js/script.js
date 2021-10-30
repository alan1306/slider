window.onload = function(){
    slideOne();
    slideTwo();
}

let sliderOne = document.getElementById("slider-1");
let sliderTwo = document.getElementById("slider-2");
let displayValOne = document.getElementById("range1");
let displayValTwo = document.getElementById("range2");
let minGap = 0;
let sliderTrack = document.querySelector(".slider-track");
let sliderMaxValue = document.getElementById("slider-1").max;
function slideOne(){
    if(parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap){
        sliderOne.value = parseInt(sliderTwo.value) - minGap;
    }
    displayValOne.textContent = sliderOne.value;
    fillColor();
}
function slideTwo(){
    if(parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap){
        sliderTwo.value = parseInt(sliderOne.value) + minGap;
    }
    displayValTwo.textContent = sliderTwo.value;
    fillColor();
}
function getList(){
    console.log("button clicked");
    var ul=document.getElementById("nameList")
    ul.innerHTML="";
    fetch('/get-data/'+sliderOne.value+'/'+sliderTwo.value)
    .then((data)=>data.json())
    .then((result)=>result.map((each)=>{
        var li=document.createElement('li')
        li.appendChild(document.createTextNode(each));
        ul.appendChild(li);
    }));
}
function fillColor(){
    percent1 = (sliderOne.value / sliderMaxValue) * 1000;
    percent2 = (sliderTwo.value / sliderMaxValue) * 1000;
    sliderTrack.style.background = `linear-gradient(to right, #dadae5 ${percent1}% , #3264fe ${percent1}% , #3264fe ${percent2}%, #dadae5 ${percent2}%)`;
}