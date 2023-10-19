import {
  beforeEach,
  expect,
  it,
  vi,
} from 'vitest';

import * as management from './management.js';
import * as util from './util.js'
import * as storage from './storage.js'

import { switchTheme } from './theme.js';

const getSelectedTheme = vi.spyOn(storage, 'getSelectedTheme')
const getTheme = vi.spyOn(management, 'getTheme')
const enableTheme = vi.spyOn(management, 'enableTheme')
const isDark = vi.spyOn(util, 'isDark')

const mockTheme = (id: string) => ({ id } as browser.management.ExtensionInfo)

beforeEach(() => {
  isDark.mockReset()
  getSelectedTheme.mockReset()
  getTheme.mockReset()
  enableTheme.mockReset()
})

it('should enable theme', async () => {
  isDark.mockReturnValue(true)
  getSelectedTheme.mockResolvedValue('dummy')
  enableTheme.mockResolvedValue()
  getTheme.mockReturnValue(() => Promise.resolve(mockTheme('dummy')))

  await switchTheme()

  expect(enableTheme).toHaveBeenCalled()
})

it('should enable default light theme', async () => {
  isDark.mockReturnValue(true)
  getSelectedTheme.mockResolvedValue(undefined)
  enableTheme.mockResolvedValue()
  getTheme.mockReturnValue(() => Promise.resolve(mockTheme('dummy')))

  await switchTheme()

  expect(getTheme).toHaveBeenCalledWith('firefox-compact-light@mozilla.org')
  expect(enableTheme).toHaveBeenCalledWith({
    id: 'dummy'
  })
})

it('should enable default dark theme', async () => {
  isDark.mockReturnValue(false)
  getSelectedTheme.mockResolvedValue(undefined)
  enableTheme.mockResolvedValue()
  getTheme.mockReturnValue(() => Promise.resolve(mockTheme('dummy')))

  await switchTheme()

  expect(getTheme).toHaveBeenCalledWith('firefox-compact-dark@mozilla.org')
  expect(enableTheme).toHaveBeenCalledWith({
    id: 'dummy'
  })
})

it('should not enable', async () => {
  isDark.mockReturnValue(false)
  getSelectedTheme.mockResolvedValue(undefined)
  enableTheme.mockResolvedValue()
  getTheme.mockReturnValue(() => Promise.resolve(undefined))

  await switchTheme()

  expect(getTheme).toHaveBeenCalledWith('firefox-compact-dark@mozilla.org')
  expect(enableTheme).toHaveBeenCalledWith(undefined)
})
