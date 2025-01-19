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
        const popUp = map.querySelector(['[dd-map="popup"]']);
        if (!locations || !leafletProvider || !marker || !popUp) {
            return;
        }
        const leafletProviderUrl = leafletProvider.getAttribute('dd-leaflet-provider');
        const mapMarkers = [];
        marker.remove();
        locations.forEach((location) => {
            let title = location.getAttribute(['dd-location-title']);
            let slug = location.getAttribute(['dd-location-slug']);
            let address = location.getAttribute(['dd-location-address']);
            let latitude = location.getAttribute(['dd-location-latitude']);
            let longitude = location.getAttribute(['dd-location-longitude']);
            if (!title || !slug || !address || !latitude || !longitude) {
                return;
            }
            location.remove();
            mapMarkers.push({
                title: title,
                slug: slug,
                address: address,
                latitude: latitude,
                longitude: longitude
            });
        });
        const mapManager = OpenStreetMapManager();
        mapManager.initialiseOpenStreetMap(
            mapId,
            mapMarkers,
            popUp,
            leafletProviderUrl,
            12,
            'https://cdn.prod.website-files.com/67606dd3484cbf8b6d8ecb18/677ff959ad561f9c8be26bc0_map-marker.svg'
        ).then(() => {
            console.log('Map initialized!');
        });
    });
};