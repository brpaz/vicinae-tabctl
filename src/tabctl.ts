import { execa } from 'execa';

export interface Tab {
  id: string;
  title: string;
  url: string;
  windowID: number;
  index: number;
  active: boolean;
  pinned: boolean;
}

/**
 * Return a list of opened tabs
 * @param tabCtlPath The executable path for tabctl
 * @returns
 */
export const getTabs = async (tabCtlPath: string): Promise<Tab[]> => {
  const result = await execa(tabCtlPath, ['list', '--format', 'json']);
  return JSON.parse(result.stdout);
};

/**
 * Activate (Focus) the selected tab
 * @param tabCtlPath The executable path for tabctl
 * @param tabId The id of the tab to activate
 */
export const activateTab = async (tabCtlPath: string, tabId: string) => {
  await execa(tabCtlPath, ['activate', tabId]);
};

/**
 * Close the selected tab
 * @param tabCtlPath The executable path for tabctl
 * @param tabId The id of the tab to close
 */
export const closeTab = async (tabCtlPath: string, tabId: string) => {
  await execa(tabCtlPath, ['close', tabId]);
};
