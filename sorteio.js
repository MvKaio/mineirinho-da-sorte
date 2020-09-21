var cartelas = null;
var active = null; // Cartela ativa na secao Todas
var best = null; // Melhor cartela
var numeros = null; // Numeros sorteados so far
var numtitile = 0; // Title da secao Todas

function editar(){
    localStorage.setItem('numeros', JSON.stringify(numeros));
    localStorage.setItem('from','!home');
    window.document.location = "cartelas.html"
}

function decrement(){
    active = (cartelas.length + active - 1) % cartelas.length;
    numtitle.innerText = `Cartela #${active + 1}`;
    cartelas[active].display(document.querySelector("#todas .field"));
}

function increment(){
    active = (active + 1) % cartelas.length;
    numtitle.innerText = `Cartela #${active + 1}`;
    cartelas[active].display(document.querySelector("#todas .field"));
}

function sorteia(id){
    numeros[id] = !numeros[id];

    let spot = document.getElementById("sorteio");
    spot = spot.getElementsByClassName("spot")[id - 1]; 

    let field = document.querySelector("#melhor .field");

    let anterior = cartelas.melhor();

    let on = null;

    if(numeros[id]){
        spot.classList.add("checked");

        for(let i = 0; i < cartelas.length; i += 1){
            cartelas[i].poe(id);
        }
    }
    else{
        spot.classList.remove("checked");

        for(let i = 0; i < cartelas.length; i += 1){
            cartelas[i].tira(id);
        }
    }

    if(anterior == cartelas.melhor()){
        
        on = cartelas[anterior].indexOf(id);
        if(on != -1){
            spot = field.getElementsByClassName('spot')[on];

            if(spot.classList.contains('uncheck')) spot.classList.remove('uncheck');
            if(spot.classList.contains('checked')) spot.classList.remove('checked');
            if(spot.classList.contains('check')) spot.classList.remove('check');

            if(numeros[id]){
                spot.classList.toggle('check');
            }
            else {
                spot.classList.toggle('uncheck');
            }
        }

    }
    else{
        cartelas[cartelas.melhor()].display(field);
    }
    
    field = document.querySelector("#todas .field");
    on = cartelas[active].indexOf(id);
    if(on == -1) return;
    spot = field.getElementsByClassName('spot')[on];

    if(spot.classList.contains('uncheck')) spot.classList.remove('uncheck');
    if(spot.classList.contains('checked')) spot.classList.remove('checked');
    if(spot.classList.contains('check')) spot.classList.remove('check');

    if(numeros[id]){
        spot.classList.toggle('check');
    }
    else {
        spot.classList.toggle('uncheck');
    }

}

function init(e){
    active = 0;

    cartelas = JSON.parse(localStorage.getItem('cartelas'));

    for(let i = 0; i < cartelas.length; i += 1){
        cartelas[i].display = function(field){
            field.innerHTML = "";
            for(let i = 0; i < 20; i += 1){
                let spot = document.createElement('div');
                spot.classList.add('spot');
                spot.innerText = `${this.entries[i]}`;
                if(numeros[this.entries[i]] != 0){
                    spot.classList.add('check');
                }
                field.appendChild(spot);
            }
        }
        cartelas[i].indexOf = function(id){
            let l = 0;
            let r = 19;
            while(l < r){
                let m = l + Math.floor((r - l)/2);

                if(this.entries[m] >= id)
                    r = m;
                else l = m + 1;
            }
            if(this.entries[l] == id) return l;
            return -1;
        }
        cartelas[i].sorte = 0;
        cartelas[i].poe = function(id){
            let l = 0;
            let r = 19;
            while(l < r){
                let m = l + Math.floor((r - l)/2);

                if(this.entries[m] >= id)
                    r = m;
                else l = m + 1;
            }
            if(this.entries[l] == id) this.sorte += 1;
        }
        cartelas[i].tira = function(id){
            let l = 0, r = 19;
            while(l < r){
                let m = l + Math.floor((r - l)/2);

                if(this.entries[m] >= id)
                    r = m;
                else l = m + 1;
            }
            if(this.entries[l] == id) this.sorte -= 1;
        }
    }

    cartelas.melhor = function(){
        let ans = -1, id = -1;
        for(let i = 0; i < this.length; i += 1){
            if(this[i].sorte > ans){
                ans = this[i].sorte;
                id = i;
            }
        }
        return id;
    }

    let field = document.querySelector("#sorteio .field");

    numeros = JSON.parse(localStorage.getItem('numeros'));

    for(let i = 1; i <= 60; i += 1){
        let spot = document.createElement('div');
        spot.classList.add('spot');
        spot.innerText = `${i}`;
        spot.onclick = function () { 
            sorteia(i); 
        };

        if(numeros[i]){
            spot.classList.add('checked');
        }

        field.appendChild(spot);
    }

    field = document.querySelector("#melhor .field");
    cartelas[0].display(field);

    field = document.querySelector("#todas .field");
    cartelas[0].display(field);

    numtitle = document.querySelector("#todas .title");
    numtitle.innerText = "Cartela #1";
    
    for(let i = 1; i <= 60; i += 1){
        if(numeros[i] == true){
                for(let j = 0; j < cartelas.length; j += 1){
                    cartelas[j].poe(i);
                }
        }
    }
}

document.addEventListener('DOMContentLoaded', (e) => {
    init();
});