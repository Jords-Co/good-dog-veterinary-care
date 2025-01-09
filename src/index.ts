import { skipToMainContent } from "$digerati/skipToMainContent";
import { currentYear } from "$digerati/currentYear";
import { openStreetMap } from "$goodDogVeterinaryCare/openStreetMap";
import { teamMemberModal } from "$digerati/teamMemberModal";

window.Webflow || [];
window.Webflow.push(() => {
  skipToMainContent();
  currentYear();
  openStreetMap();
  teamMemberModal();
});