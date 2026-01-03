# Tabctl Vicinae

> A [Vicinae](https://github.com/vicinaehq/vicinae) extension to control your browser tabs, using [Tabctl](https://github.com/slastra/tabctl)

## Preview

![Screenshot](./assets/preview.png)

## Features

- List and Open open browser tabs in Chrome, Brave or Firefox.

## Usage

## Pre Requsiites

Before using this extension, please ensure [Tabctl](https://github.com/slastra/tabctl) is correctly installed and configured. You should be able to run `tabctl list` from the terminal and see the list of open tabs.

### Extension Preferences

Before using the extension, make sure to configure the following preferences:
- **Tabctl Executable**: The path to the `tabctl` executable. You can find it by running `which tabctl` in your terminal. By default, it is set to `/usr/local/bin/tabctl`.

## Development

```bash
npm install
```

To run the extension in development mode, use:

```bash
npm run dev
```

To build the extension for production, use:

```bash
npm run build
```

## Acknowledgements

<a href="https://www.flaticon.com/free-icons/tabs" title="tabs icons">Tabs icons created by HideMaru - Flaticon</a>

<a href="https://www.flaticon.com/free-icons/mozilla" title="mozilla icons">Mozilla icons created by Freepik - Flaticon</a>
