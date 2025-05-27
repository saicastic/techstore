// frontend/src/utils/helpers.js
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const normalizeUrl = (url) => {
  return url.startsWith("http") ? url : `https://${url}`;
};
