

/**
 * This function applies changes to the border of the label when
 * the input is focused.
 * It can not be controlled from css since input is a child of the label, and 
 * a child can not change styles to a father selector in css
 */
export const eventListenerSearchbar = () => {
    const inputS = document.querySelector(".searchbar-input");
    const label = document.querySelector(".searchbar-label");
    inputS?.addEventListener("focus", () => {
        label?.classList.add("active-label-searchbar");
    })
    inputS?.addEventListener("blur", () => {
        label?.classList.remove("active-label-searchbar");
    })
}