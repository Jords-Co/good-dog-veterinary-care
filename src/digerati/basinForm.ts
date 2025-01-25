/**
 * Basin Form.
 * 
 * Populate form action with Basin Entry Point URL
 * 
 * @author <cabal@digerati.design>
 */
export const basinForm = () => {
    // Select all forms with the attribute dd-form="klaviyo"
    const basinForms = document.querySelectorAll<HTMLFormElement>('[dd-form="basin"]');

    basinForms.forEach(form => {

        console.log(form);

        // Retrieve necessary attributes from the form for API configuration
        const entryPointUrl = form.getAttribute('dd-form-entry-point-url');

        // Only proceed if the entry point UTL is provided
        if (!entryPointUrl) {
            console.warn('Entry Point URL not found');
            return;
        }
        form.setAttribute('action', entryPointUrl);
    });
};