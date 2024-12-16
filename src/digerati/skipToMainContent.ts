/**
 * Skip to Main Content.
 * 
 * @author <cabal@digerati.design>
 */
export const skipToMainContent = () => {
    const trigger = document.querySelector('[dd-skip-to-main-content="trigger"]'),
        target = document.querySelector('[dd-skip-to-main-content="target"]');
    if (!trigger || !target) {
        return;
    }
    ['click', 'keypress'].forEach((event) => {
        trigger.addEventListener(event, (e) => {
            if (e.type === 'keydown' && e.which !== 13) {
                return;
            }
            e.preventDefault();
            target.setAttribute('tabindex', '-1');
            target.focus();
        });
    });
};

