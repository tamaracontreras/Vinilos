export const renderOptions = (labels) => {
  let options = '<option value="">-- Todos --</option>'
  labels
  .slice() // clonamos para no modificar el array original
  .sort((a, b) => a.localeCompare(b)) // orden alfabético
  labels.forEach(l => {
    options += `<option value="${l}">${l}</option>`
  })
  return options
}



export const renderItems = (vinilos) => {
  let cards = ''
  vinilos.forEach(vinilo => {
    cards += `
      <li class="vinilo-card">
        <img src="${vinilo.imageUrl}" alt="Portada del álbum ${vinilo.Title}">
        <div class="vinilo-info">
          <h3>${vinilo.Title}</h3>
          <p class="artist">${vinilo.Artist}</p>
          <div class="details">
            <span><strong>Catálogo:</strong> ${vinilo.Catalog}</span>
            <span><strong>Formato:</strong> ${vinilo.Format}</span>
            <span><strong>Sello:</strong> ${vinilo.Label}</span>
            <span><strong>Año:</strong> ${vinilo.Released}</span>
          </div>
        </div>
      </li>
    `
  })
  return `<ul class="vinilos-grid">${cards}</ul>`
}

