import { skipToMainContent } from "$digerati/skipToMainContent";
import { currentYear } from "$digerati/currentYear";
import { openStreetMap } from "$goodDogVeterinaryCare/openStreetMap";
import { teamMemberModal } from "$digerati/teamMemberModal";
import { collectionSplitter } from "$digerati/collectionSplitter";
import { klaviyoForm } from "$digerati/klaviyoForm";

window.Webflow || [];
window.Webflow.push(() => {
  skipToMainContent();
  collectionSplitter();
  openStreetMap();
  teamMemberModal();
  currentYear();
  klaviyoForm();
});