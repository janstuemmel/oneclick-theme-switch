import {
  getThemes,
  enableTheme
} from './management.js';
import { getSelectedTheme, setSelectedTheme } from './storage.js';
import { isDark } from './util.js';

const SELECT = 'theme-select'
const LIGHT_SELECT = `light-${SELECT}`
const DARK_SELECT = `dark-${SELECT}`

const getSunIcons = () => {
  return { 16: isDark() ? 'icons/sun-dark.svg' : 'icons/sun-light.svg' }
}

const getMoonIcons = () => {
  return { 16: isDark() ? 'icons/moon-dark.svg' : 'icons/moon-light.svg' }
}

/**
 * @param {browser.contextMenus._CreateCreateProperties} properties 
 */
const createEntry = (properties) => browser.contextMenus.create(
  { ...properties, contexts: ['action'] },
  () => void browser.runtime.lastError
);

/**
 * @param {ThemeKey} themeKey
 * @param {string} currentId
 * @returns {(theme: browser.management.ExtensionInfo) => ReturnType<createEntry>} 
 */
const createRadioThemeEntry = (themeKey, currentId) => (theme) => createEntry({
  id: `${themeKey}:${theme.id}`,
  title: theme.name,
  type: 'radio',
  checked: currentId === theme.id,
  parentId: `${themeKey}-theme-select`,
});

/**
 * @param {browser.management.ExtensionInfo} theme
 */
const createSelectThemeEntry = (theme) => createEntry({
  id: `select:${theme.id}`,
  title: theme.name,
  parentId: `theme-select`,
});

const createDivider = () => createEntry({
  id: 'divider',
  type: 'separator'
});

export const createContextMenu = async () => {
  const currentLightId = await getSelectedTheme('light')
  const currentDarkId = await getSelectedTheme('dark')

  createEntry({ id: LIGHT_SELECT, title: 'Light theme', icons: getSunIcons() });
  createEntry({ id: DARK_SELECT, title: 'Dark theme', icons: getMoonIcons() });
  createDivider()
  createEntry({ id: 'theme-select', title: 'Switch to theme' });

  const themes = await getThemes()

  themes.forEach(createRadioThemeEntry('light', currentLightId))
  themes.forEach(createRadioThemeEntry('dark', currentDarkId))
  themes.forEach(createSelectThemeEntry)
}

/**
 * @param {browser.contextMenus.OnClickData} menuItemId
 */
export const radioThemeEntryOnClicked = ({ menuItemId }) => {
  const keyAndId = typeof menuItemId === 'string' ? menuItemId.split(':') : []
  
  if (keyAndId.length > 1) {
    const type = keyAndId[0]
    const id = keyAndId[1]

    if (type === 'select') {
      enableTheme({ id })
    } else if (type == 'light' || type == 'dark') {
      setSelectedTheme(type, id)
    }
  }
}

export const updateContextMenuIcons = () => {
  browser.contextMenus.update(LIGHT_SELECT, {
    icons: getSunIcons()
  })
  browser.contextMenus.update(DARK_SELECT, {
    icons: getMoonIcons()
  })
}
