import { skipToMainContent } from "$digerati/skipToMainContent";
import { currentYear } from "$digerati/currentYear";

window.Webflow || [];
window.Webflow.push(() => {
  skipToMainContent();
  currentYear();
});