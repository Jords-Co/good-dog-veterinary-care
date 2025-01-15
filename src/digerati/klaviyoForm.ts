/**
 * Kalviyo Form.
 * 
 * Initializes Klaviyo form handling for email only.
 * Processes form submissions and sends email data to Klaviyo.
 * 
 * @author <cabal@digerati.design>
 */
export const klaviyoForm = () => {
    // Select all forms with the attribute dd-form="klaviyo"
    const klaviyoForms = document.querySelectorAll<HTMLFormElement>('[dd-form="klaviyo"]');

    klaviyoForms.forEach(form => {

        console.log(form);

        // Retrieve necessary attributes from the form for API configuration
        const listId = form.getAttribute('dd-form-list-id');
        const apiKey = form.getAttribute('dd-form-api-key');

        // Only proceed if both list ID and API key are provided
        if (!listId || !apiKey) {
            console.warn('List ID and API Key not found');
            return;
        }
        // Add event listener for form submission
        form.addEventListener('submit', event => {
            event.preventDefault(); // Prevent default form submission
            event.stopPropagation();         // Stop the event from bubbling up to parent handlers

            // Extract form data
            const formData = new FormData(form);
            const email = formData.get('email');

            // Validate that an email was provided
            if (!email) {
                console.error('Error: Email is required.');
                return;
            }

            // Prepare the attributes object with the email
            const attributes = { email };

            console.log(attributes);

            // Set up the options for the Klaviyo API request
            const options = {
                method: 'POST',
                headers: {
                    revision: '2023-08-15',
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    data: {
                        type: 'subscription',
                        attributes: {
                            // Use custom_source attribute from form's data-name attribute
                            custom_source: form.getAttribute('data-name'),
                            profile: {
                                data: {
                                    type: 'profile',
                                    attributes: attributes
                                }
                            }
                        },
                        relationships: {
                            list: {
                                data: {
                                    type: 'list',
                                    id: listId// Use list ID from form attribute
                                }
                            }
                        }
                    }
                })
            };

            console.log(options);

            // Make the API call to Klaviyo using fetch
            console.log('Sending data to Klaviyo...', { url: 'https://a.klaviyo.com/client/subscriptions/?company_id=' + apiKey, options });

            fetch(
                'https://a.klaviyo.com/client/subscriptions/?company_id=' + apiKey,
                options
            ).then(response => {
                console.log('Received response from Klaviyo:', response);
                form.style.display = 'none';
                if (response.ok) {
                    console.warn('Response not OK. Processing error response...');
                    // Check for a non-successful response
                    return response.json().then(err => {
                        console.error('Error details:', err);
                        return Promise.reject(err);
                    });
                } else {
                    console.log('Response OK. Processing success...');
                    // Display the success message on successful submission
                    let customSuccessElement = form.parentElement?.querySelector('[dd-form="success"]');
                    if (customSuccessElement instanceof HTMLElement) {
                        customSuccessElement.style.display = 'block';
                        console.log('Displayed custom success message.');
                    } else {
                        console.warn('Custom success element not found or not an HTMLElement.');
                    }
                }
            }).catch(err => {
                console.error('Error sending data to Klaviyo:', err);
                let customErrorElement = form.parentElement?.querySelector('[dd-form="error"]');
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