window.onload = () => {
// 1. Obtener elementos del DOM
const inputBusqueda = document.getElementById('buscadorGifs');
const btnBuscar = document.getElementById('btnBuscar');
const contenedorGifs = document.getElementById('contenedorGifs');
const urlApi = 'https://api.giphy.com/v1/gifs/search?';
const apiKey = 'zUuCpwjDZasq0o4Zu2pgsNUNxskFNjKq';

// 2. Función para mostrar GIFs
function mostrarGifs(data) {
  contenedorGifs.innerHTML = ''; // Limpiar resultados anteriores
  if (data.data.length === 0) {
    contenedorGifs.innerHTML = `<p class="no-results">No se encontraron GIFs para la búsqueda.</p>`;
    return;
  }
  data.data.forEach(gif => {
    // Crear elementos HTML
    const gifContainer = document.createElement('div');
    const img = document.createElement('img');;

    // Configurar elementos
    img.src = gif.images.fixed_height.url;
    img.alt = gif.title;
    img.classList.add('gif-item');

    // Ensamblar componentes
    gifContainer.appendChild(img);
    contenedorGifs.appendChild(gifContainer);
  });
}

// 3. Función para manejar la búsqueda
btnBuscar.addEventListener('click', async () => {
  const terminoBusqueda = inputBusqueda.value.trim();
  
  if (!terminoBusqueda) {
    alert('Por favor ingresa un término de búsqueda');
    return;
  }

  try {
    const response = await fetch(
      `${urlApi}api_key=${apiKey}&q=${terminoBusqueda}&limit=60`
    );
    
    if (!response.ok) throw new Error('Error en la petición');
    
    const data = await response.json();
    mostrarGifs(data);
    
  } catch (error) {
    console.error('Error:', error);
    contenedorGifs.innerHTML = `<p class="error">Error al cargar GIFs: ${error.message}</p>`;
  }
});
};