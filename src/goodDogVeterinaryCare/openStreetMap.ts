import { OpenStreetMapManager } from "$digerati/openStreetMap";

/**
 * Open Street Map.
 * 
 * @author <cabal@digerati.design>
 */
export const openStreetMap = () => {
    const target = document.querySelectorAll('[dd-map="openstreetmap"]');
    if (!target) {
        return;
    }
    target.forEach((map) => {
        const mapId = map.getAttribute('id');
        const locations = map.querySelectorAll(['[dd-map="location"]']);
        const leafletProvider = map.querySelector(['[dd-leaflet-provider]']);
        const marker = map.querySelector(['[dd-map="marker"]']);
        if (!locations || !leafletProvider || !marker) {
            return;
        }
        const leafletProviderUrl = leafletProvider.getAttribute('dd-leaflet-provider');
        const mapMarkers = [];
        marker.remove();
        locations.forEach((location) => {
            let title = location.getAttribute(['dd-location-title']);
            let address = location.getAttribute(['dd-location-address']);
            let latitude = location.getAttribute(['dd-location-latitude']);
            let longitude = location.getAttribute(['dd-location-longitude']);
            if (!title || !address || !latitude || !longitude) {
                return;
            }
            location.remove();
            mapMarkers.push({
                title: title,
                address: address,
                latitude: latitude,
                longitude: longitude
            });
        });
        const mapManager = OpenStreetMapManager();
        mapManager.initialiseOpenStreetMap(
            mapId,
            mapMarkers,
            leafletProviderUrl,
            12,
            'https://cdn.prod.website-files.com/67606dd3484cbf8b6d8ecb18/677eaebf644dd758036e8b73_map-marker.svg'
        ).then(() => {
            console.log('Map initialized!');
        });
    });
};