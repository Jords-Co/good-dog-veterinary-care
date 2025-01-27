/**
 * Basin Form.
 * 
 * Assign Entry Point URL to Action property of form.
 * 
 * @author <cabal@digerati.design>
 */
export const basinForm = () => {
    // Select all forms with the attribute data-basin-form="true"
    const basinForms = document.querySelectorAll<HTMLFormElement>('[dd-form="basin"]');

    basinForms.forEach(form => {

        console.log(form);

        // Retrieve necessary attributes from the form for API configuration
        const entryPointUrl = form.getAttribute('dd-form-entry-point-url');

        // Only proceed if both list ID and API key are provided
        if (!entryPointUrl) {
            console.warn('Entry Point URL not found');
            return;
        }

        form.setAttribute('action', entryPointUrl);

        form.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevent the default form submission

            // Collect form data
            const formData = new FormData(form);

            // Convert FormData to URL-encoded string
            const formBody = new URLSearchParams();
            for (const pair of formData) {
                formBody.append(pair[0], pair[1]);
            }

            console.log(formBody.toString());
            console.log(form.action);

            // Send the AJAX request to Basin
            fetch(form.action, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded', // Basin expects URL-encoded data
                },
                body: formBody.toString(),
            })
                .then(response => {
                    if (response.ok) {
                        return response.json(); // Assuming Basin returns JSON on success
                    } else {
                        throw new Error('Network response was not ok.');
                    }
                })
                .then(data => {
                    console.log('Response OK. Processing success...');
                    // Display the success message on successful submission
                    let customSuccessElement = form.parentElement?.querySelector('[dd-form="basin-success"]');
                    if (customSuccessElement instanceof HTMLElement) {
                        customSuccessElement.style.display = 'block';
                        console.log('Displayed custom success message.');
                    } else {
                        console.warn('Custom success element not found or not an HTMLElement.');
                    }
                })
                .catch(error => {
                    console.error('Error sending data to Basin:', error);
                    console.log(form.parentElement);
                    let customErrorElement = form.parentElement?.querySelector('[dd-form="basin-error"]');
                    if (customErrorElement instanceof HTMLElement) {
                        customErrorElement.style.display = 'block';
                        console.log('Displayed custom error message.');
                    } else {
                        console.warn('Custom error element not found or not an HTMLElement.');
                    }
                });
        });
    });
};