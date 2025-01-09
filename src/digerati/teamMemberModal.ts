/**
 * Team Member Modal.
 * 
 * Dynamically populate Team Member Modal
 * with CMS Collection Item Properties
 * from corresponding Team Member Item.
 * 
 * @author <cabal@digerati.design>
 */
export const teamMemberModal = () => {
    const showModalLinks = document.querySelectorAll('[dd-modal="show"]'),
        hideModalLinks = document.querySelectorAll('[dd-modal="hide"]'),
        modal = document.querySelector('[dd-modal="modal"]');
    if (!showModalLinks || !hideModalLinks || !modal) {
        return;
    }
    showModalLinks.forEach((showModalLink) => {
        showModalLink.addEventListener('click', () => {
            let teamMember = showModalLink.parentElement?.parentElement?.parentElement?.parentElement?.parentElement;
            if (!teamMember) {
                return false;
            }
            console.log(teamMember);
            modal.querySelector(['[dd-modal="image"]']).src = teamMember.querySelector('[dd-tm="image"]').src;
            modal.querySelector(['[dd-modal="name"]']).innerText = teamMember.querySelector('[dd-tm="name"]').innerText;
            modal.querySelector(['[dd-modal="job-title"]']).innerText = teamMember.querySelector('[dd-tm="job-title"').innerText;
            modal.querySelector(['[dd-modal="biography"]']).innerText = teamMember.querySelector('[dd-tm="biography"]').innerText;
        }, { passive: true });
    });
};
