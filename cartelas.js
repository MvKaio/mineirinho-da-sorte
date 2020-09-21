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
    cards[atual].display();
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
            alert(`A Cartela #${i+1} possui ${cards[i].entries.length} números`);
            break;
        }
    }

    if(ok){
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
            spot.id = `${i}`
            spot.innerText = `${i}`;
            spot.onclick = function () { 
                let arg = i;
                set(arg); 
            };
            if(this.nums[i-1] == 1){
                spot.classList.add('checked');
            }
            field.appendChild(spot);
        }

    }

    size(){
        let ans = 0;
        for(let i = 0; i < 60; i += 1){
            if(this.nums[i] == 1)
                ans += 1;
        }
        return ans;
    }

}

function init(e){
    field = document.querySelector(".cartela");

    numtitle = document.querySelector(".start .header");
    atual = 0;
    cards = new Array();
    cards.length = localStorage.carts;

    for(var i = 0; i < cards.length; i += 1){
        cards[i] = new card();
    }
    
    cards[0].display();
}

document.addEventListener('DOMContentLoaded', (e) => {
    init();
});