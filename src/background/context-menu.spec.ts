import {
  it,
  vi,
  beforeEach,
  expect,
} from 'vitest';

import * as management from './management.js';
import * as storage from './storage.js';
import { radioThemeEntryOnClicked } from './context-menu';

const setSelectedTheme = vi.spyOn(storage, 'setSelectedTheme')
const enableTheme = vi.spyOn(management, 'enableTheme')

beforeEach(() => {
  setSelectedTheme.mockReset()
  enableTheme.mockReset()
})

it('not call when empty menuItemId', () => {
  radioThemeEntryOnClicked({ menuItemId: '' } as browser.contextMenus.OnClickData)
  
  expect(setSelectedTheme).not.toHaveBeenCalled()
  expect(enableTheme).not.toHaveBeenCalled()
})

it('not call when invalid menuItemId', () => {
  radioThemeEntryOnClicked({ menuItemId: 'dummy' } as browser.contextMenus.OnClickData)
  
  expect(setSelectedTheme).not.toHaveBeenCalled()
  expect(enableTheme).not.toHaveBeenCalled()
})

it('not call when invalid type', () => {
  radioThemeEntryOnClicked({ menuItemId: 'foo:bar' } as browser.contextMenus.OnClickData)
  
  expect(setSelectedTheme).not.toHaveBeenCalled()
  expect(enableTheme).not.toHaveBeenCalled()
})

it('call `enableTheme` with select type', () => {
  radioThemeEntryOnClicked({ menuItemId: 'select:dummy' } as browser.contextMenus.OnClickData)
  
  expect(setSelectedTheme).not.toHaveBeenCalled()
  expect(enableTheme).toHaveBeenCalledWith({ id: 'dummy' })
})

it('call `setSelectedTheme` with light type', () => {
  radioThemeEntryOnClicked({ menuItemId: 'light:dummy' } as browser.contextMenus.OnClickData)
  
  expect(setSelectedTheme).toHaveBeenCalledWith('light', 'dummy')
  expect(enableTheme).not.toHaveBeenCalled()
})

it('call `setSelectedTheme` with dark type', () => {
  radioThemeEntryOnClicked({ menuItemId: 'dark:dummy' } as browser.contextMenus.OnClickData)
  
  expect(setSelectedTheme).toHaveBeenCalledWith('dark', 'dummy')
  expect(enableTheme).not.toHaveBeenCalled()
})
