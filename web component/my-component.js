class MyComponent extends HTMLElement {
    connectedCallback(){
        this.innerHTML = `
            <style>
                p {
                    color: red;
                }
            </style>
            <P>My Component</P>
        `;
    }
    attributeChangedCallback() {

    }
    disconnectedCallback() {

    }
}
window.customElements.define("my-component", MyComponent);