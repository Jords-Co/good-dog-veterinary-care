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
        const marker = map.querySelector(['[dd-map="marker"]']);
        const locations = map.querySelectorAll(['[dd-map="location"]']);
        if (!marker || !locations) {
            return;
        }
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
            'map-container',
            mapMarkers,
            'streetMap',
            12,
            'https://cdn.prod.website-files.com/67606dd3484cbf8b6d8ecb18/6776820fb4847dea411fdfd6_map-marker.svg'
        ).then(() => {
            console.log('Map initialized!');
        });
    });
};