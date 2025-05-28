// backend/utils/helpers.js
import { URL } from "url";
import normalizeUrlPackage from "normalize-url"; // Default import

export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const normalizeUrl = (url) => {
  return normalizeUrlPackage(url, {
    forceHttps: true,
    stripWWW: false,
    removeTrailingSlash: false,
  });
};
