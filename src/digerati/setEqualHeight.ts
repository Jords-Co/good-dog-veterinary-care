/**
 * Equal Height Setter.
 * 
 * Adjusts the height of all slides with [dd-same-height="slide"] to match the tallest slide.
 */
export const setEqualHeight = () => {
    const selector = '[dd-equal="height"]';

    // Define the function to calculate and set equal heights
    const adjustHeights = () => {
        const slides = document.querySelectorAll<HTMLElement>(selector);
        console.log(slides);
        let maxHeight = 0;

        // Reset all slides to their natural height before calculating the tallest slide
        slides.forEach(slide => {
            slide.style.height = '';
            if (slide.offsetHeight > maxHeight) {
                maxHeight = slide.offsetHeight;
            }
        });

        // Set all slides to the height of the tallest slide
        slides.forEach(slide => {
            slide.style.height = maxHeight + 'px';
        });

        console.log(`Adjusted slide heights to ${maxHeight}px`);
    };

    // Run the adjustment function initially
    adjustHeights();

    // Re-calculate heights on window resize
    window.addEventListener('resize', adjustHeights);
};
