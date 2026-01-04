import {
  Action,
  ActionPanel,
  closeMainWindow,
  getPreferenceValues,
  Icon,
  List,
  showToast,
  Toast,
} from '@vicinae/api';
import { useEffect, useState } from 'react';
import { activateTab, closeTab, getTabs, type Tab } from './tabctl';

const IconFirefox = '../assets/icon-browser-firefox.png';
const IconChrome = '../assets/icon-browser-chrome.png';

const preferences = getPreferenceValues<{
  readonly tabctlExecPath: string;
}>();

const resolveIcon = (tabId: string) => {
  switch (tabId.charAt(0)) {
    case 'c':
      return IconChrome;
    case 'f':
      return IconFirefox;
    default:
      return Icon.Globe01;
  }
};

export default function Command() {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const tabs = await getTabs(preferences.tabctlExecPath);
        setTabs(tabs);
      } catch {
        await showToast({
          style: Toast.Style.Failure,
          title: 'Failed to load tabs',
        });
        setTabs([]);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <List isLoading={isLoading}>
      {tabs.length === 0 ? (
        !isLoading ? (
          <List.EmptyView title="No Tabs found" />
        ) : null
      ) : (
        tabs.map((tab) => (
          <List.Item
            key={tab.id}
            title={tab.title}
            subtitle={tab.url}
            icon={resolveIcon(tab.id)}
            actions={
              <ActionPanel>
                <Action
                  title="Open Tab"
                  icon={Icon.Link}
                  shortcut={{ modifiers: ['ctrl'], key: 'o' }}
                  onAction={async () => {
                    await activateTab(preferences.tabctlExecPath, tab.id);
                    closeMainWindow();
                  }}
                />
                <Action
                  title="Close Tab"
                  icon={Icon.Trash}
                  shortcut={{ modifiers: ['ctrl'], key: 'x' }}
                  onAction={async () => {
                    await closeTab(preferences.tabctlExecPath, tab.id);
                    closeMainWindow();
                  }}
                />
                <Action.CopyToClipboard
                  title="Copy URL to Clipboard"
                  icon={Icon.CopyClipboard}
                  shortcut={{ modifiers: ['ctrl'], key: 'c' }}
                  content={tab.url}
                />
              </ActionPanel>
            }
          />
        ))
      )}
    </List>
  );
}
