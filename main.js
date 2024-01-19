// Import the LiveboardEmbed SDK
import {
    LiveboardEmbed,
    AuthType,
    init,
    prefetch,
    EmbedEvent
} from 'https://cdn.jsdelivr.net/npm/@thoughtspot/visual-embed-sdk/dist/tsembed.es.js';

// Initialize the SDK
init({
    thoughtSpotHost: "https://team1.thoughtspot.cloud",
    authType: AuthType.None
});

// Create an instance of the LiveboardEmbed class
const liveboardEmbed = new LiveboardEmbed(document.getElementById('ts-embed'), {
    frameParams: {
        width: '100%',
        height: '100%',
    },
    liveboardId: "55d08cfe-263e-4e65-a36c-f89f19cd675a",
    fullHeight: true,
    visibleVizs: [],
    runtimeFilters: [{
        columnName: '<column-name>',
        operator: '<RuntimeFilterOp>',
        values: ['value']
    }],
});

// Register event listeners
liveboardEmbed.on(EmbedEvent.Init, () => console.log('Liveboard init'));
liveboardEmbed.on(EmbedEvent.Load, () => console.log('Liveboard loaded'));

// Render the embedded Liveboard
liveboardEmbed.render();    
