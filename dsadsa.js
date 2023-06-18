window.isMobile = !1;
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    window.isMobile = !0
}
window.isiOS = !1;
if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    window.isiOS = !0
}
window.isiOSVersion = '';
if (window.isiOS) {
    var version = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
    if (version !== null) {
        window.isiOSVersion = [parseInt(version[1], 10), parseInt(version[2], 10), parseInt(version[3] || 0, 10)]
    }
}
function t_throttle(fn, threshhold, scope) {
    var last;
    var deferTimer;
    threshhold || (threshhold = 250);
    return function() {
        var context = scope || this;
        var now = +new Date();
        var args = arguments;
        if (last && now < last + threshhold) {
            clearTimeout(deferTimer);
            deferTimer = setTimeout(function() {
                last = now;
                fn.apply(context, args)
            }, threshhold)
        } else {
            last = now;
            fn.apply(context, args)
        }
    }
}
function t397_init(recid) {
    var rec = document.getElementById('rec' + recid);
    if (!rec)
        return;
    var allRecords = document.getElementById('allrecords');
    var tildaMode = allRecords ? allRecords.getAttribute('data-tilda-mode') : '';
    var tildaLazyMode = allRecords ? allRecords.getAttribute('data-tilda-lazy') : '';
    var tabs = rec ? rec.querySelectorAll('.t397__tab') : [];
    if (tildaMode !== 'edit' && tildaMode !== 'preview') {
        t397_scrollToTabs(recid)
    }
    Array.prototype.forEach.call(tabs, function(tab, i) {
        tab.setAttribute('data-tab-index', i);
        tab.addEventListener('click', function(e) {
            var targetTab = e.target.closest('.t397__tab');
            if (targetTab && targetTab.classList.contains('t397__tab_active') && !e.isTrusted)
                return;
            var activeTab = rec.querySelector('.t397__tab_active');
            if (activeTab)
                activeTab.classList.remove('t397__tab_active');
            targetTab.classList.add('t397__tab_active');
            t397_removeUrl();
            var tabNumber = i + 1;
            if (tildaMode !== 'edit' && tildaMode !== 'preview' && tabNumber && typeof history.replaceState !== 'undefined') {
                try {
                    window.history.replaceState('', '', window.location.href + '#!/tab/' + recid + '-' + tabNumber)
                } catch (err) {}
            }
            t397_alltabs_updateContent(recid);
            t397_updateSelect(recid);
            var hookBlocks = targetTab.getAttribute('data-tab-rec-ids').split(',');
            var event = document.createEvent('Event');
            event.initEvent('displayChanged', !0, !0);
            var hooksCopy = hookBlocks.slice();
            hooksCopy.forEach(function(recid) {
                var currentRec = document.getElementById('rec' + recid);
                if (!currentRec)
                    return;
                var recordType = currentRec.getAttribute('data-record-type');
                if (recordType === '395' || recordType === '397') {
                    var selector = '.t' + recordType + '__tab_active';
                    var activeIDs = currentRec.querySelector(selector).getAttribute('data-tab-rec-ids');
                    activeIDs = activeIDs.split(',');
                    hookBlocks = hookBlocks.concat(activeIDs)
                }
            });
            hookBlocks.forEach(function(curRecid) {
                var currentRec = document.getElementById('rec' + curRecid);
                if (!currentRec)
                    return;
                var currentRecChildren = currentRec.querySelectorAll('.t-feed, .t-store, .t-store__product-snippet, .t117, .t121, .t132, .t223, .t226, .t228, .t229, .t230, .t268, .t279, .t341, .t346, .t347, .t349, .t351, .t353, .t384, .t385, .t386, .t396, .t400, .t404, .t409, .t410, .t412, .t418, .t422, .t425, .t428, .t433, .t448, .t456, .t477, .t478, .t480, .t486, .t498, .t504, .t506, .t509, .t511, .t517, .t518, .t519, .t520, .t532, .t533, .t538, .t539, .t544, .t545, .t552, .t554, .t569, .t570, .t577, .t592, .t598, .t599, .t601, .t604, .t605, .t609, .t615, .t616, .t650, .t659, .t670, .t675, .t686, .t688, .t694, .t698, .t700, .t726, .t728, .t730, .t734, .t738, .t740, .t744, .t754, .t760, .t762, .t764, .t774, .t776, .t778, .t780, .t786, .t798, .t799, .t801, .t813, .t814, .t822, .t826, .t827, .t829, .t842, .t843, .t849, .t850, .t851, .t856, .t858, .t859, .t860, .t881, .t889, .t902, .t912, .t923, .t937, .t958, .t959, .t979, .t982, .t983, .t989, .t994, .t1067, .t1068, .t1069, .t1070, .t1071, .t1072, .t1053');
                Array.prototype.forEach.call(currentRecChildren, function(child) {
                    child.dispatchEvent(event)
                });
                var displayChangedBlock = currentRec.querySelector('[data-display-changed="true"]');
                if (displayChangedBlock)
                    displayChangedBlock.dispatchEvent(event)
            });
            var galaxyEffectBlocks = document.querySelectorAll('.t826');
            Array.prototype.forEach.call(galaxyEffectBlocks, function(galaxyEffectBlock) {
                galaxyEffectBlock.dispatchEvent(event)
            });
            t397_startUpdateLazyLoad(targetTab);
            if (window.lazy === 'y' || tildaLazyMode === 'yes') {
                t_onFuncLoad('t_lazyload_update', function() {
                    t_lazyload_update()
                })
            }
        })
    });
    if (tabs.length) {
        t397_alltabs_updateContent(recid);
        t397_updateContentBySelect(recid);
        var bgColor = rec ? rec.style.backgroundColor : '#ffffff';
        var bgColorTargets = rec.querySelectorAll('.t397__select, .t397__firefoxfix');
        Array.prototype.forEach.call(bgColorTargets, function(target) {
            target.style.background = bgColor
        })
    }
    document.addEventListener('click', function(e) {
        if (e.target.closest('[href*="#!/tab/' + recid + '"]')) {
            var currentLink = e.target.closest('[href*="#!/tab/' + recid + '"]');
            var hash = currentLink.hash;
            t397_scrollToTabs(recid, hash)
        }
    })
}
function t397_alltabs_updateContent(recid) {
    var rec = document.getElementById('rec' + recid);
    if (!rec)
        return;
    var tabs = Array.prototype.slice.call(rec.querySelectorAll('.t397__tab:not(.t397__tab_active)'));
    var activeTab = rec.querySelector('.t397__tab_active');
    var select = rec.querySelector('.t397__select');
    if (!activeTab)
        return;
    var hookBlocks = activeTab.getAttribute('data-tab-rec-ids').split(',');
    var noActive = [];
    var popupBlocks = [190, 217, 312, 331, 358, 364, 365, 390, 702, 706, 746, 750, 756, 768, 862, 868, 890, 945, 1013, 1014];
    Array.prototype.forEach.call(tabs, function(tab) {
        if (tab !== activeTab) {
            var noActiveHooks = tab.getAttribute('data-tab-rec-ids').split(',');
            noActiveHooks.forEach(function(hook) {
                if (noActive.indexOf(hook) === -1 && hookBlocks.indexOf(hook) === -1)
                    noActive.push(hook)
            })
        }
    });
    if (t397_checkVisibillityEl(activeTab) || t397_checkVisibillityEl(select)) {
        hookBlocks.forEach(function(hook) {
            if (!hook)
                return;
            var hookEl = document.getElementById('rec' + hook);
            var hookElRecordType = hookEl ? hookEl.getAttribute('data-record-type') : '';
            if (hookEl) {
                hookEl.classList.remove('t397__off');
                hookEl.style.opacity = ''
            }
            t397_updateTabsByHook(hookElRecordType, hookEl, hook, recid)
        })
    } else {
        hookBlocks.forEach(function(hook) {
            var hookEl = document.getElementById('rec' + hook);
            var hookElRecordType = hookEl ? hookEl.getAttribute('data-record-type') : '';
            var isPopupBlock = popupBlocks.some(function(id) {
                return hookElRecordType == id
            });
            if (hookEl && !isPopupBlock) {
                hookEl.setAttribute('data-animationappear', 'off');
                hookEl.classList.add('t397__off')
            }
        })
    }
    noActive.forEach(function(noActiveID) {
        if (!noActiveID)
            return;
        var hookEl = document.getElementById('rec' + noActiveID);
        var hookElRecordType = hookEl ? hookEl.getAttribute('data-record-type') : '';
        var isPopupBlock = popupBlocks.some(function(id) {
            return hookElRecordType == id
        });
        if (hookEl && !isPopupBlock) {
            hookEl.setAttribute('data-connect-with-tab', 'yes');
            hookEl.setAttribute('data-animationappear', 'off');
            hookEl.classList.add('t397__off')
        }
        t397_updateTabsByHook(hookElRecordType, hookEl, noActiveID, recid)
    });
    var scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
    if (scrollHeight - window.innerHeight < window.pageYOffset) {
        window.scrollTo(0, 0)
    }
}
function t397_updateTabsByHook(hookElRecordType, hookEl, currentID, recid) {
    var hookElTab;
    switch (hookElRecordType) {
    case '395':
        if (window.t395_alltabs_updateContent && window.t395_updateSelect && recid !== currentID) {
            window.t395_alltabs_updateContent(currentID);
            window.t395_updateSelect(currentID);
            hookElTab = hookEl ? hookEl.querySelector('.t395__tab') : null;
            if (hookElTab)
                hookElTab.click()
        }
        break;
    case '397':
        if (recid !== currentID) {
            t397_alltabs_updateContent(currentID);
            t397_updateSelect(currentID);
            hookElTab = hookEl ? hookEl.querySelector('.t397__tab') : null;
            if (hookElTab)
                hookElTab.click()
        }
        break
    }
}
function t397_checkVisibillityEl(el) {
    return !!(el && (el.offsetWidth || el.offsetHeight || el.getClientRects().length))
}
function t397_updateContentBySelect(recid) {
    var rec = document.getElementById('rec' + recid);
    if (!rec)
        return !1;
    var select = rec.querySelector('.t397__select');
    if (select) {
        select.addEventListener('change', function() {
            var tabIndex = rec.querySelector('.t397__tab[data-tab-rec-ids=\'' + select.value + '\'][data-tab-index="' + select.selectedIndex + '"]');
            if (tabIndex)
                tabIndex.click()
        })
    }
}
function t397_updateSelect(recid) {
    var rec = document.getElementById('rec' + recid);
    if (!rec)
        return !1;
    var activeTab = rec.querySelector('.t397__tab_active');
    var currentTabHooks = activeTab ? activeTab.getAttribute('data-tab-index') : '';
    var select = rec.querySelector('.t397__select');
    if (select)
        select.selectedIndex = currentTabHooks
}
function t397_startUpdateLazyLoad(el) {
    var hookBlocks = el ? el.getAttribute('data-tab-rec-ids').split(',') : [];
    hookBlocks.forEach(function(hook) {
        var rec = document.getElementById('rec' + hook);
        if (!rec)
            return;
        var videos = rec.querySelectorAll('.t-video-lazyload');
        if (videos.length) {
            t397_updateVideoLazyLoad(videos)
        }
    })
}
function t397_updateVideoLazyLoad(videos) {
    setTimeout(function() {
        Array.prototype.forEach.call(videos, function(video) {
            if (!video.classList.contains('t-video__isload')) {
                var heightAttribute = video.getAttribute('data-videolazy-height');
                var height = heightAttribute ? heightAttribute : '100%';
                if (height.indexOf('vh') !== -1)
                    height = '100%';
                var videoID = video.getAttribute('data-videolazy-id');
                videoID = videoID ? videoID.trim() : '';
                var blockID = video.getAttribute('data-blocklazy-id');
                var twoIdAttr = video.getAttribute('data-videolazy-two-id');
                var videoTwoID = twoIdAttr ? '_' + twoIdAttr + '_' : '';
                if (video.getAttribute('data-videolazy-type') === 'youtube') {
                    var oldIframe = video.querySelector('iframe');
                    if (oldIframe && oldIframe.parentNode)
                        oldIframe.parentNode.removeChild(oldIframe);
                    var iframe = document.createElement('iframe');
                    iframe.id = 'youtubeiframe' + videoTwoID + blockID;
                    iframe.width = '100%';
                    iframe.height = height;
                    iframe.src = 'https://www.youtube.com/embed/' + videoID + '?rel=0&fmt=18&html5=1&showinfo=0';
                    iframe.frameBorder = '0';
                    iframe.setAttribute('allowfullscreen', '');
                    video.insertAdjacentElement('beforeend', iframe)
                }
            }
            video.classList.add('t-video__isload')
        })
    }, 2)
}
function t397_scrollToTabs(recid, hash) {
    var rec = document.getElementById('rec' + recid);
    var curUrl = hash || window.location.href;
    var tabIndexNumber = curUrl.indexOf('#!/tab/');
    if (tabIndexNumber === -1)
        return !1;
    var tabIndexNumberStart = curUrl.indexOf('tab/');
    var firstOptionSelect = rec ? rec.querySelector('.t397__wrapper_mobile .t397__select option') : null;
    if (firstOptionSelect)
        firstOptionSelect.selected = !1;
    var tabRec = curUrl.substring(tabIndexNumberStart + 4, tabIndexNumberStart + 4 + recid.length);
    if (tabRec !== recid)
        return !1;
    var tabBlock = rec ? rec.querySelector('.t397') : null;
    var tabNumber = parseInt(curUrl.slice(tabIndexNumberStart + 4 + recid.length + 1), 10);
    var tabs = rec.querySelectorAll('.t397__tab');
    Array.prototype.forEach.call(tabs, function(tab, i) {
        if (i === tabNumber - 1) {
            tab.click();
            tab.classList.add('t397__tab_active')
        } else {
            tab.classList.remove('t397__tab_active')
        }
    });
    var tabsMob = rec.querySelectorAll('.t397__wrapper_mobile .t397__select option');
    var activeTabMob = tabsMob.length ? tabsMob[tabNumber - 1] : null;
    if (activeTabMob)
        activeTabMob.selected = !0;
    setTimeout(function() {
        var targetOffset = tabBlock.getBoundingClientRect().top + window.pageYOffset;
        var target = window.innerWidth > 960 ? targetOffset - 200 : targetOffset - 100;
        if (target < 0)
            target = 0;
        t397_scrollToEl(target)
    }, 50)
}
function t397_scrollToEl(elTopPos) {
    var documentHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
    var bottomViewportPoint = documentHeight - document.documentElement.clientHeight;
    if (elTopPos > bottomViewportPoint)
        elTopPos = bottomViewportPoint;
    if (elTopPos === window.pageYOffset)
        return !1;
    var currentPosition = window.pageYOffset;
    var step = (elTopPos - currentPosition) / 30;
    var difference = window.pageYOffset;
    var timerID = setInterval(function() {
        difference += step;
        window.scrollTo(0, difference);
        document.body.setAttribute('data-scrollable', 'true');
        if (elTopPos - currentPosition < 0 && window.pageYOffset <= elTopPos || elTopPos - currentPosition > 0 && window.pageYOffset >= elTopPos) {
            clearInterval(timerID);
            document.body.removeAttribute('data-scrollable')
        }
    }, 10)
}
function t397_removeUrl() {
    var curUrl = window.location.href;
    var indexToRemove = curUrl.indexOf('#!/tab/');
    if (indexToRemove === -1) {
        indexToRemove = curUrl.indexOf('%23!/tab/')
    }
    curUrl = curUrl.substring(0, indexToRemove);
    if (indexToRemove !== -1) {
        if (typeof history.replaceState != 'undefined') {
            try {
                window.history.replaceState('', '', curUrl)
            } catch (err) {}
        }
    }
}
function t537_setHeight(recId) {
    var rec = document.getElementById('rec' + recId);
    if (!rec)
        return;
    var container = rec.querySelector('.t537');
    if (!container)
        return;
    var images = rec.querySelectorAll('.t537__bgimg');
    if (!images[0])
        return;
    var imageWidth = images[0].getAttribute('data-image-width');
    var imageHeight = images[0].getAttribute('data-image-height');
    var imageRatio = imageHeight / imageWidth;
    var imagePadding = imageRatio * 100;
    for (var i = 0; i < images.length; i++) {
        images[i].style.paddingBottom = imagePadding + '%'
    }
}
function t702_initPopup(recId) {
    var rec = document.getElementById('rec' + recId);
    if (!rec)
        return;
    var container = rec.querySelector('.t702');
    if (!container)
        return;
    rec.setAttribute('data-animationappear', 'off');
    rec.setAttribute('data-popup-subscribe-inited', 'y');
    rec.style.opacity = 1;
    var documentBody = document.body;
    var popup = rec.querySelector('.t-popup');
    var popupTooltipHook = popup.getAttribute('data-tooltip-hook');
    var analitics = popup.getAttribute('data-track-popup');
    var popupCloseBtn = popup.querySelector('.t-popup__close');
    var hrefs = rec.querySelectorAll('a[href*="#"]');
    var submitHref = rec.querySelector('.t-submit[href*="#"]');
    if (popupTooltipHook) {
        t_onFuncLoad('t_popup__addAttributesForAccessibility', function() {
            t_popup__addAttributesForAccessibility(popupTooltipHook)
        });
        document.addEventListener('click', function() {
            var target = event.target;
            var href = target.closest('a[href*="#"]') ? target.closest('a[href*="#"]') : !1;
            if (!href)
                return;
            var arrHref = href.href.split('#');
            if (decodeURI('#' + arrHref[1]) !== popupTooltipHook)
                return;
            event.preventDefault();
            t702_showPopup(recId);
            t_onFuncLoad('t_popup__resizePopup', function() {
                t_popup__resizePopup(recId)
            });
            t702__lazyLoad();
            if (analitics) {
                Tilda.sendEventToStatistics(analitics, popupTooltipHook)
            }
        });
        t_onFuncLoad('t_popup__addClassOnTriggerButton', function() {
            t_popup__addClassOnTriggerButton(document, popupTooltipHook)
        })
    }
    popup.addEventListener('scroll', t_throttle(function() {
        t702__lazyLoad()
    }));
    popup.addEventListener('click', function(event) {
        var windowWithoutScrollBar = window.innerWidth - 17;
        if (event.clientX > windowWithoutScrollBar)
            return;
        if (event.target === this)
            t702_closePopup(recId)
    });
    popupCloseBtn.addEventListener('click', function() {
        t702_closePopup(recId)
    });
    if (submitHref) {
        submitHref.addEventListener('click', function() {
            if (documentBody.classList.contains('t-body_scroll-locked')) {
                documentBody.classList.remove('t-body_scroll-locked')
            }
        })
    }
    for (var i = 0; i < hrefs.length; i++) {
        hrefs[i].addEventListener('click', function() {
            var url = this.getAttribute('href');
            if (!url || url.substring(0, 7) != '#price:') {
                t702_closePopup(recId);
                if (!url || url.substring(0, 7) == '#popup:') {
                    setTimeout(function() {
                        documentBody.classList.add('t-body_popupshowed')
                    }, 300)
                }
            }
        })
    }
    function t702_escClosePopup(event) {
        if (event.key === 'Escape')
            t702_closePopup(recId)
    }
    popup.addEventListener('tildamodal:show' + popupTooltipHook, function() {
        document.addEventListener('keydown', t702_escClosePopup)
    });
    popup.addEventListener('tildamodal:close' + popupTooltipHook, function() {
        document.removeEventListener('keydown', t702_escClosePopup)
    })
}
function t702_lockScroll() {
    var documentBody = document.body;
    if (!documentBody.classList.contains('t-body_scroll-locked')) {
        var bodyScrollTop = typeof window.pageYOffset !== 'undefined' ? window.pageYOffset : (document.documentElement || documentBody.parentNode || documentBody).scrollTop;
        documentBody.classList.add('t-body_scroll-locked');
        documentBody.style.top = '-' + bodyScrollTop + 'px';
        documentBody.setAttribute('data-popup-scrolltop', bodyScrollTop)
    }
}
function t702_unlockScroll() {
    var documentBody = document.body;
    if (documentBody.classList.contains('t-body_scroll-locked')) {
        var bodyScrollTop = documentBody.getAttribute('data-popup-scrolltop');
        documentBody.classList.remove('t-body_scroll-locked');
        documentBody.style.top = null;
        documentBody.removeAttribute('data-popup-scrolltop');
        document.documentElement.scrollTop = parseInt(bodyScrollTop)
    }
}
function t702_showPopup(recId) {
    var rec = document.getElementById('rec' + recId);
    if (!rec)
        return;
    var container = rec.querySelector('.t702');
    if (!container)
        return;
    var popup = rec.querySelector('.t-popup');
    var popupTooltipHook = popup.getAttribute('data-tooltip-hook');
    var range = rec.querySelector('.t-range');
    var documentBody = document.body;
    if (range)
        t702__triggerEvent(range, 'popupOpened');
    t_onFuncLoad('t_popup__showPopup', function() {
        t_popup__showPopup(popup)
    });
    documentBody.classList.add('t-body_popupshowed');
    documentBody.classList.add('t702__body_popupshowed');
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent) && !window.MSStream && window.isiOSVersion && window.isiOSVersion[0] === 11) {
        setTimeout(function() {
            t702_lockScroll()
        }, 500)
    }
    t702__lazyLoad();
    t702__triggerEvent(popup, 'tildamodal:show' + popupTooltipHook)
}
function t702_closePopup(recId) {
    var rec = document.getElementById('rec' + recId);
    var popup = rec.querySelector('.t-popup');
    var popupTooltipHook = popup.getAttribute('data-tooltip-hook');
    var popupAll = document.querySelectorAll('.t-popup_show:not(.t-feed__post-popup):not(.t945__popup)');
    if (popupAll.length == 1) {
        document.body.classList.remove('t-body_popupshowed')
    } else {
        var newPopup = [];
        for (var i = 0; i < popupAll.length; i++) {
            if (popupAll[i].getAttribute('data-tooltip-hook') === popupTooltipHook) {
                popupAll[i].classList.remove('t-popup_show');
                newPopup.push(popupAll[i])
            }
        }
        if (newPopup.length === popupAll.length) {
            document.body.classList.remove('t-body_popupshowed')
        }
    }
    popup.classList.remove('t-popup_show');
    document.body.classList.remove('t702__body_popupshowed');
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent) && !window.MSStream && window.isiOSVersion && window.isiOSVersion[0] === 11) {
        t702_unlockScroll()
    }
    t_onFuncLoad('t_popup__addFocusOnTriggerButton', function() {
        t_popup__addFocusOnTriggerButton()
    });
    setTimeout(function() {
        var popupHide = document.querySelectorAll('.t-popup:not(.t-popup_show)');
        for (var i = 0; i < popupHide.length; i++) {
            popupHide[i].style.display = 'none'
        }
    }, 300);
    t702__triggerEvent(popup, 'tildamodal:close' + popupTooltipHook)
}
function t702_sendPopupEventToStatistics(popupName) {
    var virtPage = '/tilda/popup/';
    var virtTitle = 'Popup: ';
    if (popupName.substring(0, 7) == '#popup:') {
        popupName = popupName.substring(7)
    }
    virtPage += popupName;
    virtTitle += popupName;
    if (window.Tilda && typeof Tilda.sendEventToStatistics == 'function') {
        Tilda.sendEventToStatistics(virtPage, virtTitle, '', 0)
    } else {
        if (ga) {
            if (window.mainTracker != 'tilda') {
                ga('send', {
                    hitType: 'pageview',
                    page: virtPage,
                    title: virtTitle
                })
            }
        }
        if (window.mainMetrika && window[window.mainMetrika]) {
            window[window.mainMetrika].hit(virtPage, {
                title: virtTitle,
                referer: window.location.href
            })
        }
    }
}
function t702_onSuccess(form) {
    t_onFuncLoad('t_forms__onSuccess', function() {
        t_forms__onSuccess(form)
    })
}
function t702__lazyLoad() {
    if (window.lazy === 'y' || document.getElementById('allrecords').getAttribute('data-tilda-lazy') === 'yes') {
        t_onFuncLoad('t_lazyload_update', function() {
            t_lazyload_update()
        })
    }
}
function t702__triggerEvent(el, eventName) {
    var event;
    if (typeof window.CustomEvent === 'function') {
        event = new CustomEvent(eventName)
    } else if (document.createEvent) {
        event = document.createEvent('HTMLEvents');
        event.initEvent(eventName, !0, !1)
    } else if (document.createEventObject) {
        event = document.createEventObject();
        event.eventType = eventName
    }
    event.eventName = eventName;
    if (el.dispatchEvent) {
        el.dispatchEvent(event)
    } else if (el.fireEvent) {
        el.fireEvent('on' + event.eventType, event)
    } else if (el[eventName]) {
        el[eventName]()
    } else if (el['on' + eventName]) {
        el['on' + eventName]()
    }
}
function t331_initPopup(recId) {
    var rec = document.getElementById('rec' + recId);
    if (!rec)
        return !1;
    rec.setAttribute('data-animationappear', 'off');
    rec.style.opacity = '1';
    var currentBlock = rec.querySelector('.t-popup');
    var currentHook = currentBlock ? currentBlock.getAttribute('data-tooltip-hook') : '';
    var currentAnalitics = currentBlock ? currentBlock.getAttribute('data-track-popup') : '';
    if (!currentHook)
        return !1;
    t_onFuncLoad('t_popup__addAttributesForAccessibility', function() {
        t_popup__addAttributesForAccessibility(currentHook)
    });
    document.addEventListener('click', function(e) {
        var href = e.target.closest('a[href="' + currentHook + '"]');
        if (href) {
            e.preventDefault();
            t331_showPopup(recId);
            t_onFuncLoad('t_popup__resizePopup', function() {
                t_popup__resizePopup(recId)
            });
            if (currentAnalitics) {
                var virtTitle = currentHook;
                if (virtTitle.substring(0, 7) === '#popup:')
                    virtTitle = virtTitle.substring(7);
                Tilda.sendEventToStatistics(currentAnalitics, virtTitle)
            }
        }
    });
    t_onFuncLoad('t_popup__addClassOnTriggerButton', function() {
        t_popup__addClassOnTriggerButton(document, currentHook)
    })
}
function t331_setHeight(recid) {
    var rec = document.getElementById('rec' + recid);
    if (!rec)
        return !1;
    var videoCarrier = rec.querySelector('.t331__video-carier');
    var carrierParent = videoCarrier ? videoCarrier.parentNode : null;
    var videoWidth = videoCarrier ? videoCarrier.getAttribute('data-video-width') : '0';
    var videoHeight = videoCarrier ? videoCarrier.getAttribute('data-video-height') : '0';
    if (videoHeight.indexOf('vh') !== -1) {
        videoHeight = parseInt(videoHeight, 10) * window.innerHeight / 100
    } else {
        videoHeight = parseInt(videoHeight, 10)
    }
    var ratio = videoHeight / (parseInt(videoWidth, 10) || 1);
    var videoCurrentWidth = videoCarrier ? videoCarrier.offsetWidth : 0;
    var calculatedHeight = videoCurrentWidth * ratio;
    if (videoCarrier)
        videoCarrier.style.height = calculatedHeight + 'px';
    if (carrierParent)
        carrierParent.style.height = calculatedHeight + 'px'
}
function t331_showPopup(recid) {
    var rec = document.getElementById('rec' + recid);
    if (!rec)
        return !1;
    var popup = rec.querySelector('.t-popup');
    var videoContainer = rec.querySelector('.t331__youtube');
    var videoCarrier = rec.querySelector('.t331__video-carier');
    var isVideoCarrierExist = !!videoCarrier.querySelector('iframe');
    if (isVideoCarrierExist)
        return;
    var videoID = videoContainer ? videoContainer.getAttribute('data-content-popup-video-url-youtube') : '';
    if (videoID)
        videoID = videoID.replace('https://www.youtube.com/shorts/', '');
    var videoURL = videoID ? 'https://www.youtube.com/embed/' + videoID : '';
    if (videoCarrier) {
        var iframe = document.createElement('iframe');
        iframe.id = 'youtubeiframe' + recid;
        iframe.classList.add('t331__iframe');
        iframe.width = '100%';
        iframe.height = '100%';
        iframe.src = videoURL + (videoURL.indexOf('?') !== -1 ? '&' : '?') + 'autoplay=1&rel=0';
        iframe.frameBorder = '0';
        iframe.setAttribute('allowfullscreen', '');
        videoCarrier.insertAdjacentElement('beforeend', iframe)
    }
    if (popup)
        popup.style.display = 'block';
    t331_setHeight(recid);
    setTimeout(function() {
        var popupContainer = popup ? popup.querySelector('.t-popup__container') : null;
        if (popupContainer)
            popupContainer.classList.add('t-popup__container-animated');
        if (popup)
            popup.classList.add('t-popup_show');
        t_onFuncLoad('t_popup__trapFocus', function() {
            t_popup__trapFocus(popup)
        })
    }, 50);
    document.body.classList.add('t-body_popupshowed');
    document.body.classList.add('t331__body_popupshowed');
    if (popup) {
        popup.addEventListener('click', function(e) {
            if (e.target === popup)
                t331_popup_close(recid)
        })
    }
    var popupClose = popup ? popup.querySelector('.t-popup__close') : null;
    if (popupClose) {
        popupClose.addEventListener('click', function() {
            t331_popup_close(recid)
        })
    }
    document.addEventListener('keydown', function(e) {
        if (e.keyCode === 27)
            t331_popup_close(recid)
    })
}
function t331_popup_close(recid) {
    document.body.classList.remove('t-body_popupshowed');
    document.body.classList.remove('t331__body_popupshowed');
    var rec = document.getElementById('rec' + recid);
    if (!rec)
        return !1;
    var popup = rec.querySelector('.t-popup');
    var videoCarrier = rec.querySelector('.t331__video-carier');
    if (popup)
        popup.classList.remove('t-popup_show');
    t_onFuncLoad('t_popup__addFocusOnTriggerButton', function() {
        t_popup__addFocusOnTriggerButton()
    });
    setTimeout(function() {
        if (videoCarrier)
            videoCarrier.innerHTML = '';
        if (popup && !popup.classList.contains('t-popup_show')) {
            popup.style.display = 'none'
        }
    }, 300)
}
function t331_sendPopupEventToStatistics(popupname) {
    var virtPage = '/tilda/popup/';
    var virtTitle = 'Popup: ';
    if (popupname.substring(0, 7) === '#popup:') {
        popupname = popupname.substring(7)
    }
    virtPage += popupname;
    virtTitle += popupname;
    if (ga) {
        if (window.mainTracker !== 'tilda') {
            ga('send', {
                'hitType': 'pageview',
                'page': virtPage,
                'title': virtTitle
            })
        }
    }
    if (window.mainMetrika > '' && window[window.mainMetrika]) {
        window[window.mainMetrika].hit(virtPage, {
            title: virtTitle,
            referer: window.location.href
        })
    }
}
function t450_showMenu(recid) {
    var rec = document.getElementById('rec' + recid);
    if (!rec)
        return;
    var menu = rec.querySelector('.t450');
    var overlay = rec.querySelector('.t450__overlay');
    var menuElements = rec.querySelectorAll('.t450__overlay, .t450__close, a[href*="#"]');
    document.body.classList.add('t450__body_menushowed');
    if (menu)
        menu.classList.add('t450__menu_show');
    if (overlay)
        overlay.classList.add('t450__menu_show');
    if (menu) {
        menu.addEventListener('clickedAnchorInTooltipMenu', function() {
            t450_closeMenu(menu, overlay)
        })
    }
    Array.prototype.forEach.call(menuElements, function(element) {
        element.addEventListener('click', function() {
            if (element.closest('.tooltipstered, .t-menusub__target-link, .t794__tm-link, .t966__tm-link, .t978__tm-link'))
                return;
            if (element.href && (element.href.substring(0, 7) === '#price:' || element.href.substring(0, 9) === '#submenu:'))
                return;
            t450_closeMenu(menu, overlay)
        })
    });
    document.addEventListener('keydown', function(e) {
        if (e.keyCode === 27) {
            document.body.classList.remove('t390__body_popupshowed');
            var popups = document.querySelectorAll('.t390');
            Array.prototype.forEach.call(popups, function(popup) {
                popup.classList.remove('t390__popup_show')
            })
        }
    });
    rec.addEventListener('click', function(e) {
        if (e.target.closest('.t966__tm-link, .t978__tm-link')) {
            t450_checkSize(recid);
            if (e.target.closest('.t978__tm-link')) {
                setTimeout(function() {
                    var hookLink = e.target.closest('.t978__tm-link');
                    var menuBlock = hookLink.nextElementSibling;
                    var submenuLinks = menuBlock ? menuBlock.querySelectorAll('.t978__menu-link') : [];
                    Array.prototype.forEach.call(submenuLinks, function(link) {
                        link.addEventListener('click', function() {
                            t450_checkSize(recid)
                        })
                    })
                }, 300)
            }
        }
    });
    menu.addEventListener('menuOverflow', function() {
        t450_checkSize(recid)
    });
    t450_highlight(recid)
}
function t450_closeMenu(menu, overlay) {
    document.body.classList.remove('t450__body_menushowed');
    if (menu)
        menu.classList.remove('t450__menu_show');
    if (overlay)
        overlay.classList.remove('t450__menu_show')
}
function t450_checkSize(recid) {
    var rec = document.getElementById('rec' + recid);
    var menu = rec ? rec.querySelector('.t450') : null;
    if (!menu)
        return;
    var container = menu.querySelector('.t450__container');
    var topContainer = menu.querySelector('.t450__top');
    var rightContainer = menu.querySelector('.t450__rightside');
    setTimeout(function() {
        var topContainerHeight = topContainer ? topContainer.offsetHeight : 0;
        var rightContainerHeight = rightContainer ? rightContainer.offsetHeight : 0;
        var containerPaddingTop = container ? window.getComputedStyle(container).paddingTop : '0';
        var containerPaddingBottom = container ? window.getComputedStyle(container).paddingBottom : '0';
        containerPaddingTop = parseInt(containerPaddingTop, 10);
        containerPaddingBottom = parseInt(containerPaddingBottom, 10);
        if (topContainerHeight + rightContainerHeight + containerPaddingTop + containerPaddingBottom > document.documentElement.clientHeight) {
            menu.classList.add('t450__overflowed')
        } else {
            menu.classList.remove('t450__overflowed')
        }
    })
}
function t450_appearMenu(recid) {
    var rec = document.getElementById('rec' + recid);
    var burger = rec ? rec.querySelector('.t450__menu__content') : null;
    if (!burger)
        return;
    var burgerAppearOffset = burger ? burger.getAttribute('data-appearoffset') : '';
    var burgerHideOffset = burger ? burger.getAttribute('data-hideoffset') : '';
    if (burgerAppearOffset) {
        burgerAppearOffset = t450_appearMenuParseNumber(burgerAppearOffset);
        if (window.pageYOffset >= burgerAppearOffset) {
            if (burger.classList.contains('t450__beforeready')) {
                burger.classList.remove('t450__beforeready')
            }
        } else {
            burger.classList.add('t450__beforeready')
        }
    }
    if (burgerHideOffset) {
        burgerHideOffset = t450_appearMenuParseNumber(burgerHideOffset);
        var scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
        if (window.pageYOffset + window.innerHeight >= scrollHeight - burgerHideOffset) {
            if (!burger.classList.contains('t450__beforeready')) {
                burger.classList.add('t450__beforeready')
            }
        } else if (burgerAppearOffset) {
            if (window.pageYOffset >= burgerAppearOffset) {
                burger.classList.remove('t450__beforeready')
            }
        } else {
            burger.classList.remove('t450__beforeready')
        }
    }
}
function t450_appearMenuParseNumber(string) {
    if (string.indexOf('vh') > -1) {
        string = Math.floor((window.innerHeight * (parseInt(string) / 100)))
    }
    return parseInt(string, 10)
}
function t450_initMenu(recid) {
    var rec = document.getElementById('rec' + recid);
    var menu = rec ? rec.querySelector('.t450') : null;
    var overlay = rec ? rec.querySelector('.t450__overlay') : null;
    var burger = rec ? rec.querySelector('.t450__burger_container') : null;
    var menuLinks = rec ? rec.querySelectorAll('.t-menu__link-item.t450__link-item_submenu') : [];
    var hook = menu ? menu.getAttribute('data-tooltip-hook') : '';
    if (hook) {
        document.addEventListener('click', function(e) {
            if (e.target.closest('a[href="' + hook + '"]')) {
                e.preventDefault();
                t450_closeMenu(menu, overlay);
                t450_showMenu(recid);
                t450_checkSize(recid)
            }
        })
    }
    if (burger) {
        burger.addEventListener('click', function() {
            t450_closeMenu(menu, overlay);
            t450_showMenu(recid);
            t450_checkSize(recid)
        })
    }
    window.addEventListener('resize', function() {
        t450_checkSize(recid)
    });
    if (!window.isMobile)
        return;
    Array.prototype.forEach.call(menuLinks, function(link) {
        link.addEventListener('click', function() {
            t450_checkSize(recid)
        })
    })
}
function t450_highlight(recid) {
    var url = window.location.href;
    var pathname = window.location.pathname;
    var hash = window.location.hash;
    if (url.substr(url.length - 1) === '/') {
        url = url.slice(0, -1)
    }
    if (pathname.substr(pathname.length - 1) === '/') {
        pathname = pathname.slice(0, -1)
    }
    if (pathname.charAt(0) === '/') {
        pathname = pathname.slice(1)
    }
    if (pathname === '') {
        pathname = '/'
    }
    var shouldBeActiveElements = document.querySelectorAll('.t450__menu a[href=\'' + url + '\'], ' + '.t450__menu a[href=\'' + url + '/\'], ' + '.t450__menu a[href=\'' + pathname + '\'], ' + '.t450__menu a[href=\'/' + pathname + '\'], ' + '.t450__menu a[href=\'' + pathname + '/\'], ' + '.t450__menu a[href=\'/' + pathname + '/\']' + (hash ? ', .t450__menu a[href=\'' + hash + '\']' : ''));
    var rec = document.getElementById('rec' + recid);
    var menuLinks = rec ? rec.querySelectorAll('.t450__menu a') : [];
    Array.prototype.forEach.call(menuLinks, function(link) {
        if (link.getAttribute('data-highlighted-by-user') !== 'y')
            link.classList.remove('t-active')
    });
    Array.prototype.forEach.call(shouldBeActiveElements, function(link) {
        link.classList.add('t-active')
    })
}
function t270_scroll(hash, offset) {
    if (!hash)
        return;
    t270_checkLoad(hash, offset);
    if (hash.indexOf('#!/tproduct/') !== -1 || hash.indexOf('#!/tab/') !== -1) {
        return !0
    }
    var target;
    try {
        if (hash.substring(0, 1) === '#') {
            target = document.getElementById(hash.substring(1))
        } else {
            target = document.querySelector(hash)
        }
    } catch (event) {
        console.log('Exception t270: ' + event.message);
        return !0
    }
    if (!target) {
        target = document.querySelector('a[name="' + hash.substr(1) + '"]');
        if (!target)
            return !0
    }
    var isHistoryChangeAllowed = window.location.hash !== hash;
    var wrapperBlock = document.querySelector('.t270');
    var dontChangeHistory = wrapperBlock ? Boolean(wrapperBlock.getAttribute('data-history-disabled')) : !1;
    target = parseInt((target.getBoundingClientRect().top + window.pageYOffset) - offset, 10);
    target = Math.abs(target);
    if ('scrollBehavior'in document.documentElement.style) {
        t_throttle(window.scrollTo({
            left: 0,
            top: target,
            behavior: 'smooth',
        }), 500)
    } else {
        t270_scrollToEl(target)
    }
    if (!dontChangeHistory && isHistoryChangeAllowed) {
        if (history.pushState) {
            history.pushState(null, null, hash)
        } else {
            window.location.hash = hash
        }
        isHistoryChangeAllowed = !1
    }
    return !0
}
function t270_checkLoad(hash, offset) {
    if (window.t270_loadChecked)
        return;
    var sliderWrappers = document.body.querySelectorAll('.t-slds__items-wrapper');
    if (!sliderWrappers.length)
        return;
    var lastWrapper = sliderWrappers[sliderWrappers.length - 1];
    var sliderImgs = lastWrapper ? lastWrapper.querySelectorAll('.t-slds__bgimg') : [];
    var lastImg = sliderImgs[sliderImgs.length - 1];
    var imageUrl = lastImg ? window.getComputedStyle(lastImg).backgroundImage : '';
    imageUrl = imageUrl.substring(5, imageUrl.length - 2);
    var preloaderImg = document.createElement('img');
    preloaderImg.src = imageUrl ? imageUrl : '';
    preloaderImg.addEventListener('load', function() {
        t270_scroll(hash, offset);
        window.t270_loadChecked = !0
    })
}
function t270_scrollToEl(target) {
    var documentHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
    var bottomViewportPoint = documentHeight - document.documentElement.clientHeight;
    if (target > bottomViewportPoint)
        target = bottomViewportPoint;
    if (target === window.pageYOffset)
        return !1;
    var currentPosition = window.pageYOffset;
    var step = (target - currentPosition) / 30;
    var difference = window.pageYOffset;
    var timerID = setInterval(function() {
        difference += step;
        window.scrollTo(0, difference);
        document.body.setAttribute("data-scrollable", "true");
        if ((target - currentPosition < 0 && window.pageYOffset <= target) || (target - currentPosition > 0 && window.pageYOffset >= target)) {
            clearInterval(timerID);
            document.body.removeAttribute("data-scrollable")
        }
    }, 10)
}