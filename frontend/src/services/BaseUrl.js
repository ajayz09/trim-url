export const baseUrl = getBaseUrl();

export function getBaseUrl() {
  let pathArray = window.location.origin.split(".");

  // localhost
  if (window.location.port == "3000")
    return "http://" + window.location.hostname + ":8000";
  else {
  }
}
