// ==UserScript==
// @name         ADS Remover
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.naughtyblog.org/*
// @match        *://justjavhd.com/*
// @include      /eyny.com/
// @match        *://jpavs.net/*
// @include      /avjamak|avjamack/
// @include      https://wfwf*.com/*
// @include      /maxjav.com/
// @include      /t66y.com/
// @include      /filecrypt.cc/
// @include      /(kav.today|mybj|vipbj)/
// @include      /(cosplayjav.pl|gomoviz.org)/
// @include      https://xnxx*.com/*
// @include      *://pornobunny.org/*.html
// @include      https://namu.wiki/w/*
// @include      https://arcjav.com/*
// @include      https://javpink.com/*
// @include      /hpjav\.tv/
// @include      https://cineaste.co.kr/bbs/board.php*
// @include      /spotv\d+\.com/
// @include      /toonkor\d+\.com/
// @exclude      https://www.t66y.com/thread*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js
// @require      https://raw.githubusercontent.com/DandyClubs/RootDomain/main/RootDomain.js
// @grant		 GM_addStyle
// @run-at       document-body
// ==/UserScript==

const PageURL = window.location !== window.parent.location ? document.referrer : document.location.href;
const RootDomain = extractRootDomain(PageURL)
var ADTag = []
var ADLink = []

switch (RootDomain) {
    case "naughtyblog.org":
        ADTag = ['a[href*="https://k2s.cc/code/"]']
        break;
    case "justjavhd.com":
        ADTag = ['a[href*="https://filejoker.net/w0zc3ehfs5o2"]']
        break;
    case "cosplayjav.pl":
        ADTag = ['script[src*="vvqknwws"]', 'script[src*="belexglokmpld"]']
        break;
    case "javpink.com":
        ADTag = ['script[src*="popcash"]']
        break;
    case "eyny.com":
        ADTag = ['#stickthread_12029658', '#separatorline','[id^="ads_ads"]']
        break;
    case "jpavs.net":
        ADTag = ['.mh-loop-excerpt']
        break;
    case "avjamak.net":
    case "avjamak.com":
    case "avjamack.com":
        ADTag = ['.by_banner_image', '#h237', 'div#google_translate_element']
        break;
    case "gomoviz.org":
        ADTag = ['div#_atssh', 'iframe[src*="xxtxjxxvdnccc"]', 'script[src*="rndskittytor"]']
        break;
    case "pornobunny.org":
        ADTag = ['a[href*="https://florenfile.com/free"]']
        break;
    case "arcjav.com":
        ADTag = ['.custom-header.header-media']
        break;
    case "kav.today":
    case "mybj.best":
    case "mybj.buzz":
    case "mybj.xyz":
    case "vipbj.club":
    case "vipbj.online":
        ADTag = ['figure.wp-block-image:not(.size-large) a img']
        break;
    default:
        ADTag = ['.top-banner', '.mobile-banner:not[.top_hr]', 'script[src*="ethecountryw"]', '#popmagicldr', 'iframe[src*="about:blank"]']



}

function ADChange() {
    let scripts
    if (/avjamak/.test(window.location.href) && window.top === window.self) {
        scripts = document.querySelectorAll('script')
        for (let i = 0; scripts.length; i++) {
            if(scripts[i].outerHTML.includes('window.document.getElementById("h237")')){
                scripts[i].remove()
                break
            }
        }
    }
    else if (/t66y.com/.test(window.location.href) && window.top === window.self) {
        scripts = document.querySelectorAll('script')
        for (let i = 0; scripts.length; i++) {
            if(scripts[i].outerHTML.includes('var charset=')){
                console.log( scripts[i])
                scripts[i].remove()
                break
            }
        }
    }
    else {
        scripts = document.querySelectorAll('script#popmagicldr')
        for (let i = 0; scripts.length; i++) {
            console.log( scripts[i])
            scripts[i].remove()
        }
    }
}

function ADRemover(node) {
    node = node ? node : document.body
    if (/maxjav.com/.test(window.location.href)) {
        var DonationLink = node.querySelector('a[href*="DONATION"]')
        if(DonationLink){
            DonationLink.setAttribute('href', "#")
        }
    }
    else if (/t66y.com/.test(window.location.href)) {
        ADLink = node.querySelector('img[iyl-data="http://a.d/adblo_ck.jpg"]')
        if(ADLink){
            ADLink.removeAttribute('iyl-data')
        }
    }
    else if (/avjamak/.test(window.location.href)) {
        ADLink = node.querySelectorAll('img[src*="partner/banner"]')
        if(ADLink){
            ADLink.forEach(function (item) {
                item.closest('div.row.fix-gutters-5').remove()
            })
        }
    }
    else if (/spotv\d+\.com/.test(window.location.href)) {
        ADLink = node.querySelectorAll('div.homelist-wrap > #free-genre-list > li > a[href^="http"], .popups')
        console.log(ADLink)
        if(ADLink){
            ADLink.forEach(function (item) {
                item.closest('li').remove()
            })
        }
    }
    else if (/kav.today|mybj|vipbj/.test(window.location.href)) {
        ADLink = node.querySelectorAll('figure.wp-block-image:not(.size-large) a')
        console.log(ADLink)
        ADLink.forEach(function (item) {
            item.innerText = 'Download'
        })
    }
    else if (/eyny\.com\/forum\.php\?mod=viewthread|eyny\.com\/thread.*\.html/.test(window.location.href)) {
        var MouseOver = node.querySelectorAll('img.zoom, span#visitedforums')
        if(MouseOver){
            MouseOver.forEach(function (item) {
                item.removeAttribute('onmouseover')
            })
        }
    }

    if (/(toonkor\d+\.com)(?!.*\.html).*$/.test(window.location.href)) {
        //call it like
        var TextRegex = /BL/i
        var nodes = getElementsByTextContent(node, '.section-item .section-item-inner .toon_gen', TextRegex);
        //console.log(nodes)
        for(var i = 0; i < nodes.length; i++){
            nodes[i].closest('.section-item').remove()
        }
    }
    else if (/namu.wiki/.test(window.location.href)) {
        ADLink = document.querySelector('img[src*="ww.namu.la/s"]')
        if(ADLink){
            ADLink.closest('table').remove()
        }
    }

    else if (/hpjav\.tv/.test(window.location.href)) {
        ADLink = document.querySelector('video#vplayer')
        if(ADLink){
            ADLink.closest('div').remove()
        }

        if(ADTag){
            ADTag.forEach(function (item) {
                var removeDoms = node.querySelectorAll(item)
                removeDoms.forEach(function (removeDom) {
                    console.log('Remove Element: ', removeDom)
                    removeDom.remove()
                })
            })
        }
    }
}


// c.f. MutationObserver
// https://developer.mozilla.org/ja/docs/Web/API/MutationObserver
var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        for (var i = 0; i < mutation.addedNodes.length; i++) {
            if (mutation.addedNodes[i].nodeType == Node.ELEMENT_NODE) {
                ADRemover(mutation.addedNodes[i])
            }
        }
    });
});
document.addEventListener('readystatechange', event => {
    if (event.target.readyState === "interactive") {
        ADChange()
    }
})

document.addEventListener('DOMContentLoaded', (event) => {
    ADRemover()
    observer.observe(document.body, {childList: true, subtree: true});

})


function getElementsByTextContent(node, tag, regex) {
    const results = Array.from(node.querySelectorAll(tag))
    .reduce((acc, el) => {
        if (el.textContent && el.textContent.match(regex) !== null) {
            acc.push(el);
        }
        return acc;
    }, []);
    return results;
}
