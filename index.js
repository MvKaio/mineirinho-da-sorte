const init = function(){
    let btn = document.querySelector(".form button");
    let input = document.querySelector("#numero");
    let carts = input.value;

    input.addEventListener('keyup', (e) => {
        if(e.keyCode === 13){
            e.preventDefault();
        
            document.querySelector(".form button").click();
        }
    });

    btn.addEventListener('click', () => {
        carts = input.value;
        localStorage.setItem('carts', carts);
        window.document.location = './cartelas.html';
    });
}

document.addEventListener('DOMContentLoaded', (e) => {
    init();
});