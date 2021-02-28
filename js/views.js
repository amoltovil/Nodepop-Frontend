export const noDataView = () => {
  return `<div class="card">
  <div class="card-content">
  <div class="media">
   <div class="media-content">
     <p class="title is-4"> ¡¡No se han encontrado resultados!! </p>
   </div>
 </div>`
}

export const anuncioView = (anuncio, verDetalle) =>{
   
    let deleteButtonHTML = '';
    let editButtonHTML ='';
    if (!verDetalle) {
      if (anuncio.canBeDeleted) {
        deleteButtonHTML ='<button class ="button btn_borrar is-danger is-small">Eliminar</button>'
      }
    } else {
      deleteButtonHTML ='';
    }

    let detalleButtonHTML = '';
    if (verDetalle) {
      detalleButtonHTML ='<button class ="button btn_detalle is-primary is-small">Detalle</button>'
    } else {
      detalleButtonHTML = '';
    }
    
    let imgHTML = '';
    if (anuncio.image) {
      imgHTML = `<div class="card-image">
      <figure class="image is-5by3">
      <img src="${anuncio.image}" alt="Placeholder image">
      </figure>
      </div>`;
    }

    let typeAd ='';
    if (anuncio.venta === true) {
      typeAd ='Artículo a la Venta'
    }
    else {
      typeAd ='Compra / Se Busca'
    }
    
    let emailPropAdHTML ='';
    if (anuncio.author) {
      emailPropAdHTML = `<a href="mailto:${anuncio.author}">${anuncio.author}</a>`;
    }

    let descAnuncioHTML='';
    if (anuncio.desc) {
      descAnuncioHTML =  `<p class="subtitle is-6"> Descripción: ${anuncio.desc}</p>`;
    }

    return `<div class="card">
       <div class="card-content">
       <div class="media">
        <div class="media-content">
          <p class="title is-4">${anuncio.nombre}</p>
        </div>
      </div>
  
      <div class="content">
       <p class="subtitle is-6"> ${typeAd} </p>
        ${descAnuncioHTML}
       <p class="subtitle is-6"> Precio: ${anuncio.precio} €</p>
       <p class="subtitle is-6"> Contacte con ${emailPropAdHTML} </p>
       <p class="subtitle is-6"> Tags: ${anuncio.tags} </p>
        <time datetime=${anuncio.date}>Fecha Ult. Modificación: ${anuncio.date.split("T")[0]}</time>
        <br>
        ${detalleButtonHTML}
        ${deleteButtonHTML}
      </div>
    </div>
    ${imgHTML}
  </div>`;
};

export const errorView = (errorMessage) => {
    return `<article class="message is-danger">
    <div class="message-header">
      <p>Error</p>
      <button class="delete" aria-label="delete"></button>
    </div>
    <div class="message-body">
      ${errorMessage}
    </div>
  </article>`;
};

export const successView = (successMessage) => {
  return `<article class="message is-success">
  <div class="message-header">
    <p>Sucess</p>
    <button class="delete" aria-label="delete"></button>
  </div>
  <div class="message-body">
    ${successMessage}
  </div>
</article>`;
};

// Paginación con el nº de páginas según el nº de anuncios
export const pagesView = (pageNumber) => {
  return `<a class="pagination-link" aria-label="Goto page ${pageNumber}">${pageNumber}</a>` 
};

export const anuncioDetView = (anuncio) => {
  
  let deleteButtonHTML = '';
  if (anuncio.canBeDeleted) {
    deleteButtonHTML ='<button class ="button btn_borrar is-danger">Borrar</button>'
  }

  let imgHTML = '';
  if (anuncio.image) {
    imgHTML = `<div class="card-image">
    <figure class="image is-5by3">
    <img src="${anuncio.image}" alt="Placeholder image">
    </figure>
    </div>`;
  }

  let typeAd ='';
  if (anuncio.venta === true) {
    typeAd ='Artículo a la Venta'
  }
  else {
    typeAd ='Compra / Se Busca'
  }
    
  let emailPropAdHTML ='';
  if (anuncio.author) {
    emailPropAdHTML = `<a href="mailto:${anuncio.author}">${anuncio.author}</a>`;
  }

  let descAnuncioHTML='';
  if (anuncio.desc) {
    descAnuncioHTML =  `<p class="subtitle is-6"> Descripción: ${anuncio.desc}</p>`;
  }

  return `<div class="card">
       <div class="card-content">
       <div class="media">
        <div class="media-content">
          <p class="title is-4">${anuncio.nombre}</p>
        </div>
      </div>
  
      <div class="content">
       <p class="subtitle is-5"> ${typeAd} </p>
        ${descAnuncioHTML}
       <p class="subtitle is-6"> Precio: ${anuncio.precio} €</p>
       <p class="subtitle is-6"> Contacte con ${emailPropAdHTML} </p>
       <p class="subtitle is-6"> Tags: 
        <a href="#"> ${anuncio.tags}</a> </p>
        <time datetime=${anuncio.date}>Fecha Ult. Modificación: ${anuncio.date.split("T")[0]} </time>
        <br>
        ${deleteButtonHTML}
      </div>
    </div>
    ${imgHTML}
  </div>`;
};