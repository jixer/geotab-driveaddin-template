export default class MobileDevice {
    static IOS = 0;
    static ANDROID = 1;
    static WINDOWS = 2;
    static UNSUPPORTED = -98;
    static UNKNOWN = -99;

    /**
     * Returns the appropriate device type based upon the device
     * @returns {number}
     */
    static getPlatform() {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        return this.getPlatformByUserAgent(userAgent);
    }

    /**
     * Returns the appropriate device type based upon the device
     * @param {string} userAgent - User agent string
     * @returns {number}
     */
    static getPlatformByUserAgent(userAgent) {
        if (/windows phone/i.test(userAgent)) {
            return MobileDevice.UNSUPPORTED;
          } else if (/android/i.test(userAgent)) {
              return MobileDevice.ANDROID;
          } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {            
              return MobileDevice.IOS;
          } else{
            return MobileDevice.UNKNOWN;
          }  
    }
}