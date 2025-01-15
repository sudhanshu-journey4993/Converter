const BASE_URL =  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for(let select of dropdown){
    for(currCode in countryList){
        let newOption = document.createElement("Option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
     
    select.addEventListener("change", (evt) =>{
        updateFlag(evt.target);
    });
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src= newsrc;
}

btn.addEventListener("click",  async (evt) =>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    if(amtval === ""  || amtval < 1){
        amtval = 1;
        amount.value = "1";
    }
   
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
        let response = await (await fetch(URL)).json();
        let exchRate = response[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
        let convertedAmount = amtval * exchRate;
        msg.innerText = `${amtval} ${fromCurr.value} = ${convertedAmount} ${toCurr.value}`;

})