/**
 * Collection Splitter.
 * 
 * Splits a list of items in half.
 * 
 * @author <cabal@digerati.design>
 */
export const collectionSplitter = () => {
    const target = document.querySelector('[dd-splitter="list-wrapper"]');
    if (!target) {
        console.warn('Target not found.');
        return;
    }

    // Select items with the correct attribute selector syntax
    const itemsNodeList = target.querySelectorAll('[dd-splitter="list-item"]');
    const totalItems = itemsNodeList.length;

    // If no items found, exit early
    if (totalItems === 0) return;

    const perSplit = Math.ceil(totalItems / 2);

    // Clone the entire list including its content
    const duplicate = target.cloneNode(true);

    // Insert the duplicate right after the original list in the DOM
    target.parentNode.insertBefore(duplicate, target.nextSibling);

    // Convert NodeLists to Arrays for easier manipulation
    const originalItems = Array.from(target.querySelectorAll('[dd-splitter="list-item"]'));
    const duplicateItems = Array.from(duplicate.querySelectorAll('[dd-splitter="list-item"]'));

    // For the original list, remove items after the first half
    originalItems.slice(perSplit).forEach(item => item.remove());

    // For the duplicate list, remove items before the second half
    duplicateItems.slice(0, perSplit).forEach(item => item.remove());
    Webflow.require('ix2').init();
};