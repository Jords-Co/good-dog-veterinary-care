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
     * Get Satellite Tile Layer.
     * 
     * @returns 
     */
    const getSatelliteTileLayer = () => L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
        maxZoom: 18,
    });
    /**
     * Get Street Map Tile Layer.
     * 
     * @returns 
     */
    const getStreetMapTileLayer = () => L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://openstreetmap.org" target="_blank">OpenStreetMap</a>',
        maxZoom: 18,
    });
    /**
     * Get Roads and Labels Tile Layer.
     * @returns 
     */
    const getRoadsAndLabelsTileLayer = () => L.tileLayer('https://{s}.tile.openstreetmap.se/hydda/roads_and_labels/{z}/{x}/{y}.png', {
        attribution: 'Tiles courtesy of <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Sweden</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
    });
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
        popupAnchor: [0, -100],
        iconSize: [75, 100],
        iconAnchor: [37.5, 100],
    });
    /**
     * Get Markers.
     * 
     * @param openStreetMap 
     * @param locations 
     * @param mapMarkerUrl 
     * @returns 
     */
    const getMarkers = (openStreetMap, locations, mapMarkerUrl) => {
        log('Get OpenStreetMap Markers');
        const mapIcon = getIcon(mapMarkerUrl);
        return locations.map((location) => {
            log(`Add [${location.title} (${location.latitude}, ${location.longitude})]`);
            return L.marker([location.latitude, location.longitude], { icon: mapIcon }).bindPopup(
                `<div class="address"><strong>${location.title}</strong><address>${location.address}</address></div>`,
                { direction: 'right', maxWidth: 300, className: 'openstreetmap-popup' }
            ).on('click', (e) => {
                log(`Map Marker clicked, pan to: [${e.latlng.lat}], [${e.latlng.lng}]`);
                openStreetMap.panTo(new L.LatLng(e.latlng.lat, e.latlng.lng));
            });
        });
    };
    /**
     * Display Map.
     * 
     * @param locations 
     * @param markerGroup 
     * @param openStreetMap 
     * @param satellite 
     * @param streetMap 
     * @param roadsAndLabels 
     * @param defaultType 
     * @param zoomLevel 
     */
    const displayMap = (locations, markerGroup, openStreetMap, satellite, streetMap, roadsAndLabels, defaultType, zoomLevel) => {
        log('Display OpenStreetMap');
        if (locations.length > 1 && markerGroup.getBounds().isValid()) {
            openStreetMap.fitBounds(markerGroup.getBounds(), { padding: [50, 50] });
        } else {
            openStreetMap.setView(
                [parseFloat(locations[0].latitude), parseFloat(locations[0].longitude)],
                zoomLevel
            );
        }
        switch (defaultType) {
            case 'satellite':
                openStreetMap.addLayer(satellite);
                break;
            case 'streetMap':
                openStreetMap.addLayer(streetMap);
                break;
            case 'roadsAndLabels':
                openStreetMap.addLayer(satellite);
                openStreetMap.addLayer(roadsAndLabels);
                break;
        }
    };
    /**
     * Generate Type Selector.
     * 
     * @param mapId 
     * @param openStreetMap 
     * @param satellite 
     * @param streetMap 
     * @param roadsAndLabels 
     * @param defaultType 
     */
    const generateTypeSelector = (mapId, openStreetMap, satellite, streetMap, roadsAndLabels, defaultType) => {
        log('Generate OpenStreetMap Type Selector');
        const container = document.createElement('ul');
        container.className = 'openstreetmap-type-selector';
        const types = [
            {
                label: 'Map',
                value: 'streetMap'
            },
            {
                label: 'Satellite',
                value: 'satellite'
            },
        ];
        types.forEach((type) => {
            const listItem = document.createElement('li');
            const label = document.createElement('label');
            const input = document.createElement('input');
            const span = document.createElement('span');
            input.type = 'radio';
            input.value = type.value;
            input.name = 'openstreetmap-type';
            if (defaultType === type.value) {
                input.checked = true;
            }
            input.addEventListener('change', () => {
                log(`OpenStreetMap Type Selector [${type.value}]`);
                switch (type.value) {
                    case 'streetMap':
                        openStreetMap.removeLayer(satellite);
                        openStreetMap.removeLayer(roadsAndLabels);
                        openStreetMap.addLayer(streetMap);
                        break;
                    case 'satellite':
                        openStreetMap.removeLayer(streetMap);
                        openStreetMap.removeLayer(roadsAndLabels);
                        openStreetMap.addLayer(satellite);
                        break;
                    case 'roadsAndLabels':
                        openStreetMap.removeLayer(streetMap);
                        openStreetMap.addLayer(satellite);
                        openStreetMap.addLayer(roadsAndLabels);
                        break;
                }
            });
            span.textContent = type.label;
            label.appendChild(input);
            label.appendChild(span);
            listItem.appendChild(label);
            container.appendChild(listItem);
        });
        document.getElementById(mapId).appendChild(container);
    };

    /**
     * Initialise Open Street Map.
     * 
     * @param mapId
     * @param locations 
     * @param defaultType 
     * @param zoomLevel 
     * @param mapMarkerUrl 
     * @returns 
     */
    const initialiseOpenStreetMap = (mapId, locations, defaultType, zoomLevel, mapMarkerUrl) => {
        return new Promise((resolve) => {
            log(`Initialising OpenStreetMap (${mapId}), [${defaultType}]`);
            const satellite = getSatelliteTileLayer();
            const streetMap = getStreetMapTileLayer();
            const roadsAndLabels = getRoadsAndLabelsTileLayer();
            const openStreetMap = getMapInstance(mapId);
            const markers = getMarkers(openStreetMap, locations, mapMarkerUrl);
            const markerGroup = L.featureGroup(markers).addTo(openStreetMap);
            displayMap(locations, markerGroup, openStreetMap, satellite, streetMap, roadsAndLabels, defaultType, zoomLevel);
            generateTypeSelector(mapId, openStreetMap, satellite, streetMap, roadsAndLabels, defaultType);
            resolve();
        });
    };
    return {
        initialiseOpenStreetMap,
    };
};