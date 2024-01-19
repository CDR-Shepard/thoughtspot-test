// Import ThoughtSpot SDK
import {
  init,
  LiveboardEmbed,
  Action,
  RuntimeFilterOp,
  EmbedEvent,
  AuthType,
  HostEvent
} from "https://cdn.jsdelivr.net/npm/@thoughtspot/visual-embed-sdk/dist/tsembed.es.js";
import "./styles.css";

// Initialize embed configuration
init({
  thoughtSpotHost:
    /*param-start-hosturl*/"https://team1.thoughtspot.cloud"/*param-end-hosturl*/,
  authType: AuthType.None,
  /*param-start-styleCustomization*//*param-end-styleCustomization*/
});

// Instantiate class for embedding a Liveboard
const embed = new LiveboardEmbed("#ts-embed", {
    frameParams: {},
    /*param-start-liveboardFullHeight*/
     fullHeight: true,
/*param-end-liveboardFullHeight*/
    /*param-start-modifyActions*//*param-end-modifyActions*/
    /*param-start-liveboardId*/
     liveboardId: "55d08cfe-263e-4e65-a36c-f89f19cd675a",
/*param-end-liveboardId*/
    /*param-start-activeTabId*/
     activeTabId: "5bd5d9ca-ea69-4120-a168-99ab0e46e1a4",
/*param-end-activeTabId*/
    /*param-start-runtimeFilters*//*param-end-runtimeFilters*/
});

hideNoDataImage();
showErrorBanner('none');

embed
    // Register event listeners
    .on(EmbedEvent.Init, showLoader)
    .on(EmbedEvent.Load, hideLoader)
    .on(EmbedEvent.AuthExpire, showAuthExpired)
    /*param-start-customActionHandle*//*param-end-customActionHandle*/
    .on(EmbedEvent.Error, (error) => {
        if(error?.data?.errorType === 'FULLSCREEN') {
          showErrorBanner('none');
        } else 
        if(typeof(error.error) === 'string') {
          showErrorBanner('flex', error.error);
        } else {
          showErrorBanner('flex');
        }
        console.log('Error ', error);
        hideLoader();
    })
    // Render Liveboard
    .render();

/*param-start-useHostEvent*/
/*param-end-useHostEvent*/

// Functions to show/hide
function setDisplayStyle(el, style) {
  if(document.getElementById(el)) {
    document.getElementById(el).style.display = style;
  }
}

// Functions to show and hide a loader while iframe loads
function showLoader() {
  setDisplayStyle("loader", "block");
}
function hideLoader() {
  setDisplayStyle("loader", "none");
}

function showAuthExpired() {
  setDisplayStyle("authExpiredBanner", "flex");
}

// Functions to show or hide No data images
function showNoDataImage() {
  setDisplayStyle("no-data", "block");
}

function hideNoDataImage() {
  setDisplayStyle("no-data", "none");
}

function showErrorBanner(display, errorText) {
  setDisplayStyle("errorBanner", display);
  if(errorText) {
    document.getElementById("errorBanner").firstElementChild.innerText = errorText;
  }
}

document.getElementById('authExpiredBannerCloseBtn').addEventListener('click', () => {
  setDisplayStyle("authExpiredBanner", "none");
});

document.getElementById('errorBannerCloseBtn').addEventListener('click', () => {
  setDisplayStyle("errorBanner", "none");
});
