let elementos = [];

document.addEventListener("DOMContentLoaded", function(e){
    const url = "https://japceibal.github.io/emercado-api/cats_products/101.json";
    query(url).then(function(objeto){
        if(objeto.status === 'ok'){
            elementos = objeto.data;
            imprimir(elementos.products);
            const descCat = document.getElementById('categoria');
            descCat.innerHTML+=`<p>Descripcion de la categoria ${elementos.catName}</p>`
        }
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
        <div class="row">
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
/*function showCategoriesList(elementos){
    let htmlContentToAppend = "";

    for(let i = 0; i < elementos.length; i++){ 
        let category = elementos[i];
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + category.imgSrc + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ category.name +`</h4> 
                        <p> `+ category.description +`</p> 
                        </div>
                        <small class="text-muted">` + category.productCount + ` artículos</small> 
                    </div>

                </div>
            </div>
        </div>
        `
        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
}*/