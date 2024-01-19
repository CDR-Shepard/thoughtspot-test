// Import ThoughtSpot SDK
import {
    init,
    LiveboardEmbed,
    EmbedEvent,
    AuthType
} from "@thoughtspot/visual-embed-sdk";

// Initialize embed configuration
init({
    thoughtSpotHost: "https://team1.thoughtspot.cloud",
    authType: AuthType.None,
});

// Functions to show/hide elements
function setDisplayStyle(el, style) {
    if(document.getElementById(el)) {
        document.getElementById(el).style.display = style;
    }
}

function showLoader() {
    setDisplayStyle("loader", "block");
}

function hideLoader() {
    setDisplayStyle("loader", "none");
}

function showNoDataImage() {
    setDisplayStyle("no-data", "block");
}

function hideNoDataImage() {
    setDisplayStyle("no-data", "none");
}

function showErrorBanner(display, errorText = '') {
    setDisplayStyle("errorBanner", display);
    if(errorText) {
        document.getElementById("errorBanner").firstElementChild.innerText = errorText;
    }
}

function showAuthExpired() {
    setDisplayStyle("authExpiredBanner", "flex");
}

// Instantiate class for embedding a Liveboard
const embed = new LiveboardEmbed("#your-own-div", {
    frameParams: {},
    fullHeight: true,
    liveboardId: "55d08cfe-263e-4e65-a36c-f89f19cd675a",
    activeTabId: "5bd5d9ca-ea69-4120-a168-99ab0e46e1a4",
});

// Register event listeners
embed
    .on(EmbedEvent.Init, showLoader)
    .on(EmbedEvent.Load, hideLoader)
    .on(EmbedEvent.AuthExpire, showAuthExpired)
    .on(EmbedEvent.Error, (error) => {
        if(error?.data?.errorType === 'FULLSCREEN') {
            showErrorBanner('none');
        } else if(typeof(error.error) === 'string') {
            showErrorBanner('flex', error.error);
        } else {
            showErrorBanner('flex');
        }
        console.log('Error', error);
        hideLoader();
    });

// Render Liveboard
embed.render();

// Event listeners for closing banners
document.getElementById('authExpiredBannerCloseBtn').addEventListener('click', () => {
    setDisplayStyle("authExpiredBanner", "none");
});

document.getElementById('errorBannerCloseBtn').addEventListener('click', () => {
    setDisplayStyle("errorBanner", "none");
});
