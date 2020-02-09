export class ZElementButton extends HTMLElement {
    // Specify which attributes are to be observed by attributeChangedCallback
    static get observedAttributes() {
        return ["style", "title", "disabled", "active", "role"];
    }
    static get is() {
        return 'z-ui-btn';
    }
    static get template() {
        return `
        <style>
            :host-context(z-ui-btn[disabled=true]) .z-ui-btn {
                color: white;
                background: grey;
                border: 1px solid lightgrey;
                cursor: not-allowed;
            }
            :host-context(.z-ui-btn--active) .z-ui-btn {
                color: white;
                background: #145085;
                border: 1px solid #145085;
                cursor: not-allowed;
            }
            .z-ui-btn {
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                overflow: visible;
                text-transform: none;
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                padding: 10px 15px;
                height: -webkit-fit-content;
                height: -moz-fit-content;
                height: fit-content;
                cursor: pointer;
                font-family: Lato, sans-serif;
                font-weight: 400;
                font-style: 1rem;
                line-height: 1.15;
                margin: 0;
                -webkit-transition: color .25s, background-color .15s;
                transition: color .25s ease, background-color .15s ease;
                color: #fff;
                background-color: #2081d4;
                border: 1px solid #2081d4;
                -webkit-box-align: center;
                -ms-flex-align: center;
                align-items: center;
            }[]
        </style>
        <button class="z-ui-btn">
            <slot></slot>
        </button?
        `
    }
    constructor() {
        super(); // establish the correct prototype chain and this value before any further code is run
        this.attachShadow({mode: 'open'});
        this.componentTagName = ZElementButton.is;
        this.StateBemModifiers = {
            "active": "--active",
            "disabled": "--disabled"
        }
        console.log("element constructed");
    }
    // Invoked on append to document-connected element - added
    // Can be called multiple times if the element is removed and re-added to the DOM,
    // so you may need to check for this , or undo changes in a disconnectdCallback()
    connectedCallback(){
        console.log("element added to the DOM");
        this.shadowRoot.innerHTML = ZElementButton.template;
        this.active = false;
        this.disabled = false;
        // this.setAttribute("active", this.active);
        this.setAttribute("role", "button");
        this._$button = this.shadowRoot.querySelector(`.${this.componentTagName}`);
        this._addEventListeners();
    }
    // invoked each time the custom element is disconnected from the DOM - teardown 
    disconnectedCallback() {
        console.log("element removed from the DOM");
        // if element is disconnected between keydown and keyup events it's preserved.
        if (this.hasAttribute("active")) {
            this.removeAttribute("active");
        }
    }
    // invoked each time an element is moved to a new document
    adoptedCallback() {
        console.log("element moved to a new document");
    }
    // invoked each time an element's attribute is added, removed or changed
    // specify which attributes to observe for changes in static get observedAttributes
    attributeChangedCallback(attrName, oldValue, newValue) {
        console.log("attribute changed");
        function valueHasChanged() {
            return oldValue !== newValue ? true : false;
        }
        // if new value is null
        console.log(`new value is ${typeof newValue}`);
        // change this to object map lookup if the switch gets long or remove if cases are not needed
        if (valueHasChanged()) {
            // update the state
            // update the classes
            if (newValue === null || newValue === "false") {
                // remove clases for attrName
                this.classList.remove(`${this.componentTagName}${this.StateBemModifiers[attrName]}`);
                // update state
                this[attrName] = false;
                console.log(this[attrName]);

            } else if (newValue === "true") {
                // add class for attrName
                this.classList.add(`${this.componentTagName}${this.StateBemModifiers[attrName]}`);
                // update state
                this[attrName] = true;
                console.log(this[attrName]);
            }
        }
    }
    get stateIsDisabled() {
        console.log("getting state disabled");
        return this.disabled;
    }
    /**
     * @param {boolean} newValue - sets disabled attribute state
     */
    set stateToDisabled(newValue) {
        console.log("setting state to disabled");
        if(newValue === false) {
            this.removeAttribute("disabled");
        } else if(newValue === true) {
            this.setAttribute("disabled", true);
            this._$button.setAttribute("disabled", true);
        } else {
            this._errorHandler();
        }
    }
    get stateIsActive() {
        console.log("getting state active");
        return this.active;
    }
    /**
     * @param {boolean} newValue - sets active state
     */
    set stateToActive(newValue) {
        if(newValue === false) {
            this.removeAttribute("active");
        } else if(newValue === true) {
            this.setAttribute("active", true);
        } else {
            this._errorHandler();
        }
    }
    _addEventListeners() {
        this._$button.addEventListener("click", this.handleEvtClick);
    }
    _errorHandler() {
        console.error(`Parameter passed to setter of component ${this.componentTagName} is not of type boolean`);
    }
    handleEvtClick(e) {
        console.log(e);
    }
}
window.customElements.define(ZElementButton.is, ZElementButton);