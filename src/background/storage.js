/**
 * @param {ThemeKey} themeKey 
 * @returns {Promise<string>}
 */
export const getSelectedTheme = async (themeKey) => {
  return browser.storage.local.get().then(storage => storage[themeKey])
}

/**
 * @param {ThemeKey} themeKey
 * @param {string} id
 * @returns {Promise<void>}
 */
export const setSelectedTheme = (themeKey, id) => {
  return browser.storage.local.set({ [themeKey]: id })
}
