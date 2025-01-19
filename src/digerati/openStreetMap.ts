import "leaflet";

/**
 * Open Street Map Manager.
 * 
 * @returns 
 */
export const OpenStreetMapManager = () => {
    /**
     * Log
     * 
     * @param message  String
     */
    const log = (message) => {
        console.log(message);
    };
    /**
     * Get Map Instance.
     * 
     * @param mapId 
     * @returns 
     */
    const getMapInstance = (mapId) => {
        const openStreetMap = L.map(mapId, {
            zoomControl: false,
            scrollWheelZoom: false,
        });
        // openStreetMap.addControl(new L.Control.Fullscreen({ position: 'topright' }));
        openStreetMap.addControl(new L.Control.Zoom({
            position: 'bottomright'
        }));
        openStreetMap.on('focus', () => openStreetMap.scrollWheelZoom.enable());
        openStreetMap.on('blur', () => openStreetMap.scrollWheelZoom.disable());
        return openStreetMap;
    };
    /**
     * Get Icon.
     * 
     * @param mapMarkerUrl 
     * @returns 
     */
    const getIcon = (mapMarkerUrl) => L.icon({
        iconUrl: mapMarkerUrl,
        /*
        popupAnchor: [0, -50],
        iconSize: [37.5, 50],
        iconAnchor: [18.75, 50],
        */
        popupAnchor: [0, -41.5],
        iconSize: [63, 83],
        iconAnchor: [31.5, 41.5],
    });
    /**
     * Get Markers.
     * 
     * @param openStreetMap 
     * @param locations 
     * @param mapMarkerUrl 
     * @returns 
     */
    const getMarkers = (openStreetMap, locations, popUp, mapMarkerUrl) => {
        log('Get OpenStreetMap Markers');
        const mapIcon = getIcon(mapMarkerUrl);
        return locations.map((location) => {
            log(`Add [${location.title} (${location.latitude}, ${location.longitude})]`);
            log(popUp.outerHTML);
            return L.marker([location.latitude, location.longitude], { icon: mapIcon }).bindPopup(
                generatePopUpHtml(location, popUp),
                {
                    direction: 'right',
                    maxWidth: 344,
                    className: 'openstreetmap-popup'
                }
            ).on('click', (e) => {
                log(`Map Marker clicked, pan to: [${e.latlng.lat}], [${e.latlng.lng}]`);
                openStreetMap.panTo(new L.LatLng(e.latlng.lat, e.latlng.lng));
            });
        });
    };
    /**
     * Generate PopUp HTML
     * @param location 
     * @param popUp 
     * @returns 
     */
    const generatePopUpHtml = (location, popUp) => {
        const heading = popUp.querySelector('[dd-popup="location"]');
        const address = popUp.querySelector('[dd-popup="address"]');
        const link = popUp.querySelector('[dd-popup="link"]');
        heading.textContent = location.title;
        address.textContent = location.address;
        link.href = '/locations/' + location.slug;
        const popUpHtml = popUp.outerHTML.replace('hide', '');
        console.log(popUpHtml);
        return popUpHtml;
    }
    /**
     * Display Map.
     * 
     * @param locations 
     * @param markerGroup 
     * @param openStreetMap 
     * @param leafletProviderUrl 
     * @param zoomLevel 
     */
    const displayMap = (locations, markerGroup, openStreetMap, leafletProviderUrl, zoomLevel) => {
        log('Display OpenStreetMap');
        if (locations.length > 1 && markerGroup.getBounds().isValid()) {
            openStreetMap.fitBounds(markerGroup.getBounds(), { padding: [50, 50] });
        } else {
            openStreetMap.setView(
                [parseFloat(locations[0].latitude), parseFloat(locations[0].longitude)],
                zoomLevel
            );
        }
        openStreetMap.addLayer(L.tileLayer(leafletProviderUrl, {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            minZoom: 0,
            maxZoom: 20,
        }));
    };

    /**
     * Initialise Open Street Map.
     * 
     * @param mapId
     * @param locations 
     * @param popUp
     * @param leafletProviderUrl
     * @param zoomLevel 
     * @param mapMarkerUrl 
     * @returns 
     */
    const initialiseOpenStreetMap = (mapId, locations, popUp, leafletProviderUrl, zoomLevel, mapMarkerUrl) => {
        return new Promise((resolve) => {
            log(`Initialising OpenStreetMap (${mapId})]`);
            const openStreetMap = getMapInstance(mapId);
            const markers = getMarkers(openStreetMap, locations, popUp, mapMarkerUrl);
            const markerGroup = L.featureGroup(markers).addTo(openStreetMap);
            displayMap(locations, markerGroup, openStreetMap, leafletProviderUrl, zoomLevel);
            resolve();
        });
    };
    return {
        initialiseOpenStreetMap,
    };
};