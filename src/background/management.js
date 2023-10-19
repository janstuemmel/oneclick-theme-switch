/**
 * @returns {Promise<browser.management.ExtensionInfo[]>}
 */
export const getThemes = () => browser.management.getAll()
  .then(extensions => extensions.filter((extension) => extension.type === 'theme'));

/**
 * @param {string} defaultThemeId 
 * @returns {(id: string) => Promise<browser.management.ExtensionInfo | null>}
 */
export const getTheme = (defaultThemeId) => (id = defaultThemeId) => getThemes()
  .then((themes) => themes.find((theme) => theme.id === id))

/**
 * @param {Partial<browser.management.ExtensionInfo>} id
 * @returns {Promise<void>}
 */
export const enableTheme = ({ id }) => browser.management.setEnabled(id, true)
