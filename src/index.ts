import { skipToMainContent } from "$digerati/skipToMainContent";
import { currentYear } from "$digerati/currentYear";
import { openStreetMap } from "$goodDogVeterinaryCare/openStreetMap";

window.Webflow || [];
window.Webflow.push(() => {
  skipToMainContent();
  currentYear();
  openStreetMap();
});