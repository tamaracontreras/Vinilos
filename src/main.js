import { labelsList, filterData, orderDataByName, artistsList, filterByArtist } from './dataFunctions.js'
import { renderOptions, renderItems } from './view.js'
import { data } from './data/dataset.js'

const selectLabels = document.querySelector("#select-filter")
const selectArtists = document.querySelector("#select-artist")
const selectOrden = document.querySelector("#select-sort")
const cardsList = document.querySelector("#root")
const searchInput = document.querySelector("#search")
const clearButton = document.querySelector('[data-testid="button-clear"]')

// Variables globales
let resultadosActuales = data
let filtroLabel = ""
let filtroArtist = ""
let filtroTexto = ""

// Renderizar filtros
selectLabels.innerHTML = renderOptions(labelsList(data))
selectArtists.innerHTML = renderOptions(artistsList(data))

// Función que aplica todos los filtros
const aplicarFiltros = () => {
  resultadosActuales = data
  if (filtroLabel) resultadosActuales = filterData(resultadosActuales, filtroLabel)
  if (filtroArtist) resultadosActuales = filterByArtist(resultadosActuales, filtroArtist)
  if (filtroTexto) {
    resultadosActuales = resultadosActuales.filter(vinilo =>
      vinilo.Title.toLowerCase().includes(filtroTexto) ||
      vinilo.Artist.toLowerCase().includes(filtroTexto) ||
      vinilo.Label.toLowerCase().includes(filtroTexto)
    )
  }

  // Aplicar orden si hay seleccionado
  if (selectOrden.value) {
    resultadosActuales = orderDataByName(resultadosActuales, selectOrden.value)
  }

  cardsList.innerHTML = renderItems(resultadosActuales)
}

// Eventos de filtros
selectLabels.addEventListener("change", (e) => {
  filtroLabel = e.target.value
  aplicarFiltros()
})

selectArtists.addEventListener("change", (e) => {
  filtroArtist = e.target.value
  aplicarFiltros()
})

searchInput.addEventListener("input", (e) => {
  filtroTexto = e.target.value.toLowerCase()
  aplicarFiltros()
})

selectOrden.addEventListener("change", () => {
  aplicarFiltros()
})

// Botón limpiar
clearButton.addEventListener('click', () => {
  filtroLabel = ""
  filtroArtist = ""
  filtroTexto = ""
  selectLabels.value = ""
  selectArtists.value = ""
  selectOrden.value = ""
  searchInput.value = ""
  resultadosActuales = data
  cardsList.innerHTML = renderItems(resultadosActuales)
})

// Ordenar por artista al cargar
resultadosActuales = orderDataByName(data, "az")
cardsList.innerHTML = renderItems(resultadosActuales)
