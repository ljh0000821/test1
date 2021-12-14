/**
 * 存储localStorage
 */
export const setStore = (name, data, type) => {
    if (type) window.sessionStorage.setItem(name, JSON.stringify(data));
    else window.localStorage.setItem(name, JSON.stringify(data));
};
export const getStore = (name) => {
    let obj = window.sessionStorage.getItem(name);
    if (!obj) obj = window.localStorage.getItem(name);
    try {
        obj = JSON.parse(obj);
    } catch {
        return obj;
    }
    return obj;
};
export const removeStore = (name, type) => {
    if (type) window.sessionStorage.removeItem(name);
    else window.localStorage.removeItem(name);
};
