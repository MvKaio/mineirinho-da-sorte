var field = null; // Div que recebe a cartela
var cards = null; // Array de classes
var atual = null; // Cartela que está sendo mostrada
var numtitle = null; // Elemento "Cartela #x"

function decrement(){
    atual = (localStorage.carts + atual - 1) % localStorage.carts;
    numtitle.innerText = `Cartela #${atual + 1}`;
    cards[atual].display();
}

function increment(){
    atual = (atual + 1) % localStorage.carts;
    numtitle.innerText = `Cartela #${atual + 1}`;
    cards[atual].display();
}

function set(id){
    cards[atual].nums[id-1] = !cards[atual].nums[id-1];

    let spot = document.getElementsByClassName('cartela')[0];
    spot = spot.getElementsByClassName('spot')[id-1];

    if(spot.classList.contains('uncheck')) spot.classList.remove('uncheck');
    if(spot.classList.contains('check')) spot.classList.remove('check');

    if(cards[atual].nums[id-1] == true){
        spot.classList.toggle('check');
    }
    else {
        spot.classList.toggle('uncheck');
    }
}

function sortear(){
    var ok = 1;

    for(let i = 0; i < cards.length; i += 1){
        
        cards[i].entries = new Array();

        for(let j = 0; j < 60; j += 1){
            if(cards[i].nums[j] == true){
                cards[i].entries.push(j+1);
            }
        }

        ok &= (cards[i].entries.length == 20);

        if(ok == false){
            alert(`Erro na Cartela #${i+1}: ${cards[i].entries.length}/20 números`);
            break;
        }
    }

    if(ok){

        if(localStorage.getItem('from') == 'home'){
            let trap = new Array(61);
            for(let i = 1; i <= 60; i+=1) numeros[i] = 0;
            localStorage.setItem('numeros', JSON.stringify(trap));
        }

        localStorage.setItem(`cartelas`, JSON.stringify(cards));
        window.document.location = './sorteio.html';
    }

}

class card{
    constructor(){
        this.nums = new Array(60);
        this.entries = new Array();
    }

    display(){
        field.innerHTML = "";
        for(let i = 1; i <= 60; i += 1){
            let spot = document.createElement('div');
            spot.classList.add('spot');
            spot.innerText = `${i}`;
            spot.onclick = function () { 
                set(i); 
            };
            field.appendChild(spot);
            if(this.nums[i-1] == 1){
                spot.classList.toggle('check');
            }
        }

    }
}

function init(e){
    field = document.querySelector(".cartela");

    numtitle = document.querySelector(".start .header");
    atual = 0;

    if(localStorage.getItem('from') == 'home'){
        cards = new Array();
        cards.length = localStorage.carts;

        for(var i = 0; i < cards.length; i += 1){
            cards[i] = new card();
        }
        
        cards[0].display();
    }
    else{
        cards = JSON.parse(localStorage.getItem('cartelas'));

        for(let i = 0; i < cards.length; i += 1){
            cards[i].display = function(){
                field.innerHTML = "";
                for(let i = 1; i <= 60; i += 1){
                    let spot = document.createElement('div');
                    spot.classList.add('spot');
                    spot.innerText = `${i}`;
                    spot.onclick = function () { 
                        set(i); 
                    };
                    field.appendChild(spot);
                    if(this.nums[i-1] == 1){
                        spot.classList.toggle('check');
                    }
                }
            }
        }
        cards[0].display();
    }
}

document.addEventListener('DOMContentLoaded', (e) => {
    init();
});