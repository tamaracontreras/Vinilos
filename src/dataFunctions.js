// Obtener lista de sellos únicos ordenados
export const labelsList = (vinilos) => {
  const labels = vinilos.map(v => v.Label)
  return Array.from(new Set(labels)).sort((a, b) => a.localeCompare(b))
}

// Obtener lista de artistas únicos ordenados
// Obtener lista de artistas únicos, ordenados alfabéticamente
// y dejando los que no tienen Catalog al final
export const artistsList = (vinilos) => {
  const artists = vinilos.map(v => v.Artist)
  // sacamos duplicados
  const uniqueArtists = Array.from(new Set(artists))
  // ordenamos alfabéticamente ignorando mayúsculas/minúsculas
  return uniqueArtists.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
}


// Filtrar por sello (los que no tienen sello van al final, resto ordenado A–Z)
export const filterData = (vinilos, label) => {
  const resultado = label
    ? vinilos.filter(v => v.Label && v.Label.trim() === label.trim())
    : vinilos

  return resultado.slice().sort((a, b) => {
    const labelA = a.Label ? a.Label.trim().toLowerCase() : ""
    const labelB = b.Label ? b.Label.trim().toLowerCase() : ""

    if (!labelA) return 1
    if (!labelB) return -1

    return labelA.localeCompare(labelB)
  })
}


// Filtrar por artista (si hay artista → ordenar por título, si no → por artista)
export const filterByArtist = (vinilos, artist) => {
  const resultado = artist
    ? vinilos.filter(v => v.Artist === artist)
    : vinilos

  return resultado.slice().sort((a, b) => {
    return artist
      ? a.Title.localeCompare(b.Title)   // si es un solo artista, ordena por título
      : a.Artist.localeCompare(b.Artist) // si son varios artistas, ordena por artista
  })
}

// Ordenar por título (A–Z o Z–A) sin mutar array original
export const orderDataByName = (vinilos, orden) => {
  const ordenados = vinilos.slice().sort((a, b) =>
    a.Title.localeCompare(b.Title)
  )

  return orden === "desc" ? ordenados.reverse() : ordenados
}
