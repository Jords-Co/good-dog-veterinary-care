/**
 * Form Validation.
 * 
 * @author <cabal@digerati.design>
 */
export const formValidation = () => {
    class DigeratiFormValidation {
        /**
         * Create a New Instance.
         *
         * @return {void} 
         */
        constructor() {
            this.displayValidationErrorMessage = this.displayValidationErrorMessage.bind(this);
            this.getErrorElements = this.getErrorElements.bind(this);
            this.getErrorMessages = this.getErrorMessages.bind(this);
            this.getFormFieldType = this.getFormFieldType.bind(this);
            this.handleSubmitEvent = this.handleSubmitEvent.bind(this);
            this.init = this.init.bind(this);
            this.triggerFormFieldValidation = this.triggerFormFieldValidation.bind(this);
            this.validateEmailField = this.validateEmailField.bind(this);
            this.validateFormField = this.validateFormField.bind(this);
            this.validateRequiredField = this.validateRequiredField.bind(this);
        }

        /**
         * Display Validation Error Message.
         *
         * @param  {HTMLElement} formField    
         * @param  {string} errorMessage 
         *
         * @return {void}             
         */
        displayValidationErrorMessage(formField, errorMessage) {
            const formFieldType = this.getFormFieldType(formField),
                errorElements = this.getErrorElements(formField, formFieldType);
            errorElements.message.innerHTML = errorMessage;
            errorElements.message.style.display = 'block';
            errorElements.border.classList.add('is-invalid');
        }

        /**
         * Get Error Elements.
         *
         * @param  {HTMLElement} formField     
         * @param  {string} formFieldType 
         *
         * @return {Object}             
         */
        getErrorElements(formField, formFieldType) {
            let errorElements = {};
            if (formFieldType !== 'select') {
                if (formFieldType === 'textarea' && formField.name === 'h-captcha-response') {
                    /* hCaptcha */
                    errorElements.border = formField.parentElement;
                    errorElements.message = formField.parentElement.nextElementSibling;
                } else {
                    errorElements.border = formField;
                    errorElements.message = formField.nextElementSibling;
                }
            } else {
                errorElements.border = formField.parentElement.previousElementSibling;
                errorElements.message = formField.parentElement.parentElement.nextElementSibling;
            }
            return errorElements;
        }

        /**
         * Get Error Messages.
         *
         * @param  {HTMLElement} formField 
         *
         * @return {Object}         
         */
        getErrorMessages(formField) {
            const errorMessages = {},
                formFieldErrorMessagesAttr = formField.getAttribute('dd-error-messages');
            if (formFieldErrorMessagesAttr !== null) {
                for (let errorMessage of Object.entries(formFieldErrorMessagesAttr.split('|'))) {
                    let [key, value] = errorMessage[1].split(':');
                    errorMessages[key] = value;
                }
            }
            return errorMessages;
        }

        /**
         * Get Form Field Type.
         *
         * @param  {HTMLElement} formField 
         *
         * @return {string}           
         */
        getFormFieldType(formField) {
            let formFieldType = formField.getAttribute('type') || formField.tagName.toLowerCase();
            return formFieldType;
        }

        /**
         * Handle Subit Event.
         *
         * @param  {event} e 
         *
         * @return {void}   
         */
        handleSubmitEvent(e) {
            e.preventDefault();
            const submitButton = e.target,
                parentForm = submitButton.closest('form');
            const formFields = parentForm.querySelectorAll('input:not([type="submit"]), textarea, select');
            let formError = false;
            formFields.forEach((formField) => {
                const isValidField = this.validateFormField(formField);
                if (!isValidField) {
                    formError = true;
                }
            });
            if (!formError) {
                submitButton.removeEventListener('click', this.handleSubmitEvent);
                submitButton.removeEventListener('touchstart', this.handleSubmitEvent);
                submitButton.click();
            }
        }

        /**
         * Validate Email Field.
         *
         * @param  {HTMLElement} formField     
         * @param  {string} fieldValue    
         * @param  {string} errorMessages 
         *
         * @return {boolean}               
         */
        validateEmailField(formField, fieldValue, errorMessages) {
            let isValidField = true;
            if (fieldValue.length > 0) {
                isValidField = fieldValue.indexOf('@') !== -1 && fieldValue.indexOf('.') !== -1;
                if (!isValidField) {
                    let errorMessage = errorMessages.email === undefined
                        ? '"Email address" error message not defined'
                        : errorMessages.email;
                    this.displayValidationErrorMessage(formField, errorMessage);
                }
            }
            return isValidField;
        }

        /**
         * Validate Form Field.
         *
         * @param  {HTMLElement} formField 
         *
         * @return {boolean}           
         */
        validateFormField(formField) {
            let isValidField = true,
                fieldValue = formField.value.trim(),
                errorMessages = this.getErrorMessages(formField);
            /* Validate `required`` field */
            if (formField.getAttribute('required') !== null) {
                isValidField = this.validateRequiredField(formField, fieldValue, errorMessages);
                if (!isValidField) {
                    return false;
                }
            }
            /* Validate `email` field */
            if (formField.getAttribute('type') === 'email') {
                isValidField = this.validateEmailField(formField, fieldValue, errorMessages);
                if (!isValidField) {
                    return false;
                }
            }
            return isValidField;
        }

        /**
         * Validate Required Field.
         *
         * @param  {HTMLElement} formField     
         * @param  {string} fieldValue    
         * @param  {object} errorMessages 
         *
         * @return {boolean}               
         */
        validateRequiredField(formField, fieldValue, errorMessages) {
            let isValidField = fieldValue.length !== 0;
            if (!isValidField) {
                let errorMessage = errorMessages.required === undefined
                    ? '"Required" error message not defined'
                    : errorMessages.required;
                this.displayValidationErrorMessage(formField, errorMessage);
            }
            return isValidField;
        }

        /**
         * Trigger Form Validation.
         *
         * @param  {HTMLElement} formField 
         *
         * @return {void}           
         */
        triggerFormFieldValidation(formField) {
            const isValidField = this.validateFormField(formField);
            if (isValidField) {
                const formFieldType = this.getFormFieldType(formField),
                    errorElements = this.getErrorElements(formField, formFieldType);
                errorElements.message.innerHTML = '';
                errorElements.message.style.display = '';
                errorElements.border.classList.remove('is-invalid');
            }
        }

        /**
         * Initialise.
         *
         * @return {void} 
         */
        init() {
            const forms = document.querySelectorAll('form');
            forms.forEach((form) => {
                if (!form.getAttribute('novalidate')) {
                    /* Submit Button Event Listeners */
                    const submitButton = form.querySelector('input[type=submit]');
                    submitButton.addEventListener('click', this.handleSubmitEvent);
                    submitButton.addEventListener('touchstart', this.handleSubmitEvent);
                    /* Input and Textarea Field Event Listeners */
                    const inputAndTextareaFields = form.querySelectorAll('input:not([type="submit"]), textarea');
                    inputAndTextareaFields.forEach((formField) => {
                        formField.addEventListener('focus', () => {
                            formField.removeEventListener('blur', this.triggerFormFieldValidation);
                            formField.removeEventListener('keyup', this.triggerFormFieldValidation);
                            formField.addEventListener('blur', () => {
                                this.triggerFormFieldValidation(formField);
                            }, { passive: true });
                            formField.addEventListener('keyup', () => {
                                this.triggerFormFieldValidation(formField)
                            }, { passive: true });
                        });
                    });
                }
            });
            /* Form Submit IX Trigger Event Listeners */
            const formSubmitIxTriggers = document.querySelectorAll('[fs-formsubmit-element][data-animation-type="lottie"]');
            formSubmitIxTriggers.forEach((formSubmitIxTrigger) => {
                formSubmitIxTrigger.addEventListener('click', () => {
                    const parentSection = formSubmitIxTrigger.closest('section');
                    if (!parentSection) {
                        return;
                    }
                    parentSection.scrollIntoView({ behavior: 'smooth' });
                }, { passive: true });
            });
        }
    }
    const formValidation = new DigeratiFormValidation();
    formValidation.init();
};
