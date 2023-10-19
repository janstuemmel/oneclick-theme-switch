import {
  createContextMenu,
  radioThemeEntryOnClicked,
  updateContextMenuIcons,
} from './context-menu.js';
import { switchTheme } from './theme.js';

browser.runtime.onInstalled.addListener(createContextMenu)
browser.management.onDisabled.addListener(createContextMenu)
browser.management.onEnabled.addListener(createContextMenu)
browser.management.onInstalled.addListener(createContextMenu)
browser.management.onUninstalled.addListener(createContextMenu)

browser.action.onClicked.addListener(async () => {
  await switchTheme()
  updateContextMenuIcons()
})

browser.contextMenus.onClicked.addListener(radioThemeEntryOnClicked)
