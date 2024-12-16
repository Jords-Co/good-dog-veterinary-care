/**
 * Current Year.
 * 
 * @author <cabal@digerati.design>
 */
export const currentYear = () => {
    const target = document.querySelector('[dd-date="current-year"]');
    if (!target) {
        return;
    }
    const fullYear = new Date().getFullYear();
    target.innerText = fullYear.toString();
};

