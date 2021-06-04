var price = [];
var contador = 0;

function pesquisa() {
    removeDiv();
    reajustar();
    var p, q;
    var input = document.getElementById("searchbar").value;
    p = input.split(" ").join("+");
    q = input.split(" ").join("%20");
    sendReqSaldao(p);
    sendReqCasa(q);
}


function removeDiv() {
    var remove = document.querySelectorAll(".divHome");
    remove.forEach(function (rem) {
        rem.parentNode.removeChild(rem);
    });
}


function reajustar() {
    $("header.top").animate({
        padding: "2% 0"
    });
}

function rasparSaldao(documento) {
    var imgs = documento.querySelectorAll(".product-img1");
    var ps = documento.querySelectorAll(".text-right");
    var preco = documento.querySelectorAll(".s-preco");
    var parcela = documento.querySelectorAll(".s-sem-juros");
    var logo = documento.querySelector(".logo");
    var link2 = documento.querySelectorAll(".product-image");
    var cont = 1;
    for (let i = 0; i < 3; i++) {
        var divHTML = document.querySelector(".destaques_uni");
        var divCelular = document.createElement("div");
        var img = document.createElement("img");
        var divNome = document.createElement("div");
        var divPreco = document.createElement("div");
        var link = document.createElement("a");
        var divLogo = document.createElement("div");
        divCelular.setAttribute("class", "divHome");
        divCelular.setAttribute("id", preco[i].innerHTML.substr(0, preco[i].innerHTML.indexOf(',')).replace(/\D+/g, ''));
        price[contador] = preco[i].innerHTML.substr(0, preco[i].innerHTML.indexOf(',')).replace(/\D+/g, '');
        img.setAttribute("class", "imgNew");
        divNome.setAttribute("class", "divNome");
        divPreco.setAttribute("class", "divPreco");
        divLogo.setAttribute("class", "divLogo");
        link.setAttribute("class", "link");
        link.target = "_blank";
        img.src = imgs[i].src;
        divNome.innerHTML = ps[cont].innerHTML;
        if (preco[i].innerHTML.substr(0, preco[i].innerHTML.indexOf(',')).replace(/\D+/g, '')) {
            divPreco.innerHTML = preco[i].innerHTML + " à vista ou " + parcela[i].innerHTML;
        }
        else {
            divPreco.innerHTML = "Produto indisponível no momento";
        }
        divLogo.innerHTML = logo.innerHTML;
        link.appendChild(img);
        link.appendChild(divNome);
        link.appendChild(divPreco);
        divCelular.appendChild(link);
        divCelular.appendChild(divLogo);
        divHTML.appendChild(divCelular);
        link2[i].target = "_blank";
        link2[i].href = link2[i].href;
        link.href = link2[i].href;
        cont = cont + 7;
        contador = contador + 1;
    }
}

function rasparCasa(documento) {
    var imgs = documento.querySelectorAll(".nm-product-img");
    var ps = documento.querySelectorAll(".nm-product-name");
    var preco = documento.querySelectorAll(".nm-price-value");
    var parcela = documento.querySelectorAll(".nm-installment-container");
    var link2 = documento.querySelectorAll(".nm-product-img-link");
    var logo = "https://www.whatsrel.com.br/wp-content/uploads/2018/11/casaevideo-1520952054-logopng.png";
    for (let i = 0; i < 3; i++) {
        var divHTML = document.querySelector(".destaques_uni");
        var divCelular = document.createElement("div");
        var img = document.createElement("img");
        var divNome = document.createElement("div");
        var divPreco = document.createElement("div");
        var link = document.createElement("a");
        var divLogo = document.createElement("img");
        divCelular.setAttribute("class", "divHome");
        divCelular.setAttribute("id", preco[i].innerHTML.substr(0, preco[i].innerHTML.indexOf(',')).replace(/\D+/g, ''));
        price[contador] = preco[i].innerHTML.substr(0, preco[i].innerHTML.indexOf(',')).replace(/\D+/g, '');
        img.setAttribute("class", "imgNew");
        divNome.setAttribute("class", "divNome");
        divPreco.setAttribute("class", "divPreco");
        divLogo.setAttribute("class", "divLogo");
        link.setAttribute("class", "link");
        link.target = "_blank";
        img.src = imgs[i].src;
        divNome.innerHTML = ps[i].innerHTML;
        divPreco.innerHTML = preco[i].innerHTML + " à vista ou " + parcela[i].innerHTML;
        divLogo.src = logo;
        link.appendChild(img);
        link.appendChild(divNome);
        link.appendChild(divPreco);
        divCelular.appendChild(link);
        divCelular.appendChild(divLogo);
        divHTML.appendChild(divCelular);
        link2[i].target = "_blank";
        link2[i].href = link2[i].href;
        link.href = link2[i].href;
        contador = contador + 1;
    }
}

function sendReqSaldao(p) {
    fetch("https://cors-anywhere.herokuapp.com/https://www.saldaodainformatica.com.br/procurar?controller=search&orderby=position&orderway=desc&search_query=" + p)
        .then(resp => resp.text())
        .then(pg => {
            let dom = new DOMParser();
            let documento = dom.parseFromString(pg, "text/html");
            rasparSaldao(documento);
        })
        .catch(e => document.write(e));
}

function sendReqCasa(q) {
    fetch("https://cors-anywhere.herokuapp.com/https://busca.casaevideo.com.br/busca?q=" + q)
        .then(resp => resp.text())
        .then(pg => {
            let dom = new DOMParser();
            let documento = dom.parseFromString(pg, "text/html");
            rasparCasa(documento);
        })
        .catch(e => document.write(e));
}

function evento() {
    document.querySelector("#botao").addEventListener("click", pesquisa);
}

window.onload = evento;