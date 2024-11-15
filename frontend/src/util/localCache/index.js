// set key/value to localstorage
export const putItem = (key, val) => {
  localStorage.setItem(key, val);
}

// get value from localstorage according to the key
export const getItem = (key) => {
  return localStorage.getItem(key);
}

// set object to localstorage
export const putItemObject = (key, val) => {
  localStorage.setItem(key, JSON.stringify(val));
}

// get object from localstorage
export const getItemObject = (key) => {
  return JSON.parse(localStorage.getItem(key));
}

// remove the specified item from localstorage according to the given key
export const removeItem = (key) => {
  localStorage.removeItem(key);
}

// remove all the items in the localstorage
export const clearItems = () => {
  localStorage.clear();
}

