let map = null;

window.initMap = function(country) {
    const mapContainer = document.getElementById('map-container');
    mapContainer.style.display = 'block';
    
    const latlng = country.latlng || 
                 (country.capitalInfo && country.capitalInfo.latlng) || 
                 [0, 0];
    
    if (!map) {
        map = L.map('map').setView(latlng, 4);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
    } else {
        map.setView(latlng, 4);
    }

    // Pulisci i marker precedenti
    map.eachLayer(layer => {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });

    // Aggiungi nuovo marker
    L.marker(latlng).addTo(map)
        .bindPopup(`<b>${country.name.common}</b>`)
        .openPopup();
};

// Nascondi la mappa all'inizio
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('map-container').style.display = 'none';
});