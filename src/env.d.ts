/// <reference types="astro/client" />

// Optional API installed by the external LeadConnector widget loader.
interface Window {
  leadConnector?: {
    chatWidget?: {
      isLoaded?: boolean;
      openWidget?: () => void;
    };
  };
}

// Reuse each layer's cleanup callback across script initializations.
declare var __signalFieldCleanupMap: WeakMap<HTMLElement, () => void> | undefined;
