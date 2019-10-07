import SampleAddinPage from './page';
import MobileDevice from './helpers/mobile-device';

export default class SampleAddin {
    /** @type {SampleAddinPage} */
    _page;

    /** @type {SampleAddinPage} */
    _username;


    /**
     * @constructor
     * @param {string} pluginHtmlRootDiv - ID of the root element in your app
     */
    constructor(pluginHtmlRootDiv) {
        this._page = new SampleAddinPage(`#${pluginHtmlRootDiv}`); // prefix w/ '#'
    }

    /**
     * initialize() is called only once when the Add-In is first loaded. Use this function to initialize the
     * Add-In's state such as default values or make API requests (MyGeotab or external) to ensure interface
     * is ready for the user.
     * @param {object} freshApi - The GeotabApi object for making calls to MyGeotab.
     * @param {object} freshState - The page state object allows access to URL, page navigation and global group filter.
     * @param {function} initializeCallback - Call this when your initialize route is complete. Since your initialize routine
     *        might be doing asynchronous operations, you must call this method when the Add-In is ready
     *        for display to the user.
     */
    initialize(freshApi, freshState, initializeCallback) {
        // MUST call initializeCallback when done any setup
        initializeCallback();      
    }

    /**
     * focus() is called whenever the Add-In receives focus.
     *
     * The first time the user clicks on the Add-In menu, initialize() will be called and when completed, focus().
     * focus() will be called again when the Add-In is revisited. Note that focus() will also be called whenever
     * the global state of the MyGeotab application changes, for example, if the user changes the global group
     * filter in the UI.
     *
     * @param {object} freshApi - The GeotabApi object for making calls to MyGeotab.
     * @param {object} freshState - The page state object allows access to URL, page navigation and global group filter.
     */
    focus(freshApi, freshState) {
        // Get the session for the logged in user
        freshApi.getSession((credentials, server) => {
            // Store in private members
            this._username = credentials.userName;

            // Use jQuery via SamplePage to update fields
            this._page.SessionIdField.text(credentials.sessionId);
            this._page.UsernameField.text(this._username);
            this._page.DatabaseField.text(credentials.database);
            this._page.ApiServerField.text(server);
    
            // Get the device for this user
            freshApi.call('Get', {
                typeName: 'Device',
                search: {
                    id: freshState.device.id
                }
            }, result => {
                let device = result[0];  

                // Use jQuery via SamplePage to update fields
                this._page.DeviceNameField.text(device.name);
                this._page.VinField.text(device.vehicleIdentificationNumber);

                // Wire up button handler
                this._page.DeviceSpecificActionButton.click(this._doSomeDeviceSpecificAction.bind(this));
    
                
                // show main content
                this._page.Root.removeClass('hidden');
            }, err => {
                console.error(err);
            });
        });
    }

    /**
     * blur() is called whenever the user navigates away from the Add-In.
     *
     * Use this function to save the page state or commit changes to a data store or release memory.
     *
     * @param {object} freshApi - The GeotabApi object for making calls to MyGeotab.
     * @param {object} freshState - The page state object allows access to URL, page navigation and global group filter.
     */
    blur() {
        // hide main content
        this._page.Root.addClass('hidden');
    }

    /**
     * This function will do some device specific action
     * @returns {undefined}
     * @summary 
     * Also an example of how to take advantage of async for promises
     */
    async _doSomeDeviceSpecificAction() {
        const platformType = await this._getGetPlatformAsync();
        let deviceStr;
        switch (platformType) {
            case MobileDevice.ANDROID:
                deviceStr = 'an Android'
                break;
            case MobileDevice.IOS:
                deviceStr = 'an iOS';
                break;
            case MobileDevice.WINDOWS:
                deviceStr = 'a Windows';
                break;
            default:
                deviceStr = 'a unknown';
                break;
        }

        alert(`Hello ${this._username}, you are using ${deviceStr} device`);
    }

    /**
     * This is just a wrapper, but here to provide promise to show example of async in _doSomeDeviceSpecificAction
     * @returns {Promise<number>}
     */
    _getGetPlatformAsync() {
        return new Promise((resolve) => {
            resolve(MobileDevice.getPlatform());
        });
    }
}