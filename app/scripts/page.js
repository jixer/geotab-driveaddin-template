
export default class SampleAddinPage {
    /** @type {string} */
    rootElemantLookup;

    /**
     * @constructor
     * @param {string} pluginHtmlRootDiv - ID of the root element in your app
     */
    constructor (pluginHtmlRootDiv) {
        this.rootElemantLookup = pluginHtmlRootDiv;
    }

    /**
     * Returns the root jQuery element
     * @returns {JQuery}
     */
    get Root() {
        return $('#sample');
    }

    /**
     * Get an element from our page
     * @param {string} query - the jquery expression to run
     * @returns {JQuery}
     */
    $(query) {
        return this.Root.find(query);
    }

    /** @returns {JQuery} */
    get SessionIdField() {
        return this.$("#sessionId");
    }

    /** @returns {JQuery} */
    get UsernameField() {
        return this.$("#username");
    }

    /** @returns {JQuery} */
    get DatabaseField() {
        return this.$("#database");
    }

    /** @returns {JQuery} */
    get ApiServerField() {
        return this.$("#apiServer");
    }

    /** @returns {JQuery} */
    get DeviceNameField() {
        return this.$("#deviceName");
    }

    /** @returns {JQuery} */
    get VinField() {
        return this.$("#vin");
    }

    /** @returns {JQuery} */
    get DeviceSpecificActionButton() {
        return this.$("#deviceSpecificAction");
    }
}