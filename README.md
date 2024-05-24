# LGT GridIron Project

## Table of contents
- [LGT GridIron Project](#lgt-gridiron-project)
  - [Table of contents](#table-of-contents)
  - [Setup](#setup)
    - [Storybook](#storybook)
    - [React Testing Library (RTL) \&\& Jest](#react-testing-library-rtl--jest)
    - [Playwright Testing](#playwright-testing)
    - [Prettier](#prettier)

## Setup

### Storybook

Install dependencies

```
pnpm i
```

Run Storybook in the project root

```
npm run storybook
```

### React Testing Library (RTL) && Jest

Run RTL && Jest in the project root

```
pnpm test
```

### Playwright Testing


Run all Playwright tests

```
pnpm exec playwright test
```

Run single Playwright tests

```
pnpm exec playwright test (name of file)
```
### Prettier

Search for and open `settings.json` by pressing `cmd+shift+p` on MacOS or `ctrl+shift+p` on Windows.

> [!IMPORTANT]
> There may be multiple options, ensure you select the option that says "Open User Settings (JSON)
![Screenshot of VS Code search results for "settings.json" with the User Settings JSON option highlighted.](https://res.cloudinary.com/ryan-furrer/image/upload/v1712793797/Vscode_settings.json_wuoqgc.png)

Add the following lines to your `settings.json`

```
"editor.defaultFormatter": "esbenp.prettier-vscode",
"editor.formatOnSave": true,
```

Open a file and save it, you should see formatting changes made as soon as you save it!
