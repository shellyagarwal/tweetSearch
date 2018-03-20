Raven.config('https://504763bf99e64e67a8123740d2b12e76@sentry.io/192709', {
            logger: 'my-logger',
            whitelistUrls: [
                /chrome-extension/
            ],
            ignoreErrors: [
                'fb_xd_fragment',
                /ReferenceError:.*/
            ],
            release: chrome.runtime.getManifest().version
        }).install();