let elementos = [];
document.addEventListener("DOMContentLoaded", function(e){
    const url = `https://japceibal.github.io/emercado-api/cats_products/${localStorage.getItem("catID")}.json`;
    query(url).then(function(objeto){
        if(objeto.status === 'ok'){
            elementos = objeto.data;
            imprimir(elementos.products);
            const descCat = document.getElementById('categoria');
            descCat.innerHTML+=`<p>Descripcion de la categoria ${elementos.catName}</p>`
        }
    })

    document.getElementById('filter').addEventListener("click", ()=>{
        showSpinner();
        let min = document.getElementById('min').value != '' ? parseInt(document.getElementById('min').value) : 0;
        let max = document.getElementById('max').value != '' ? parseInt(document.getElementById('max').value) : 9999999999;
        const arrayFiltrada = elementos.products.filter(x => x.cost >= min && x.cost <= max);
        imprimir(arrayFiltrada);
        hideSpinner();
    })

    document.getElementById('rise').addEventListener("click", ()=> {
        showSpinner();
        const arrayFiltrada = elementos.products.sort((a, b) => a.cost - b.cost)
        imprimir(arrayFiltrada);
        hideSpinner();
    })

    document.getElementById('downrise').addEventListener("click", ()=> {
        showSpinner();
        const arrayFiltrada = elementos.products.sort((a, b) => b.cost - a.cost)
        imprimir(arrayFiltrada);
        hideSpinner();
    })

    document.getElementById('relevant').addEventListener("click", ()=> {
        showSpinner();
        const arrayFiltrada = elementos.products.sort((a, b) => a.soldCount - b.soldCount)
        imprimir(arrayFiltrada);
        hideSpinner();
    })
})

function query(url){
    let result = {}
    showSpinner();
    return fetch(url)
    .then(response =>{
        if(response.ok){
            return response.json();
        }else{
            throw Error(response.statusText);
        }
    })
    .then(function(response){
        result.status = 'ok';
        result.data = response;
        hideSpinner();
        return result;
    })
    .catch(function(error) {
        result.status='error';
        result.data=error;
        hideSpinner();
        return result;
    })
}



function imprimir(array){
    let contenidoAgregadoHtml="";
    for(let i = 0;i<array.length; i++){
        let producto = array[i];
            contenidoAgregadoHtml +=`
            <div class="row" onclick="setProductIndex(${i}, ${producto.id})">
            <div class="col-3">
            <img src=${producto.image} alt="" class="border border-dark img-fluid">
            </div>
            <div class="col-9 border border-dark">
            <div class="col d-flex justify-content-between">
                <p>${producto.name} - U$D ${producto.cost}</p>
                <p>Vendidos: ${producto.soldCount}</p>
            </div>
            <div class="col"><p>${producto.description}</p></div>
            </div>
            </div>
            `
    }

    document.getElementById("contenedor").innerHTML = contenidoAgregadoHtml;
}


function setProductIndex(index, id){
    localStorage.setItem("productIndex", index);
    localStorage.setItem("productID", id);
    window.location = "product-info.html";
}