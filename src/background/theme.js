import { getSelectedTheme } from './storage.js';
import { isDark } from './util.js';
import {
  getTheme,
  enableTheme
} from './management.js';

/**
 * @type {Record<ThemeKey, string>}
 */
const DEFAULT_THEMES = {
  'light': 'firefox-compact-light@mozilla.org',
  'dark': 'firefox-compact-dark@mozilla.org'
}

export const switchTheme = async () => {  
  const themeKey = isDark() ? 'light' : 'dark';
  return getSelectedTheme(themeKey)
    .then(getTheme(DEFAULT_THEMES[themeKey]))
    .then(enableTheme)
}
