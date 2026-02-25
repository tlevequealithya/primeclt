# Welcome to PrimeCLT!

PrimeCLT is a Command Line Interface (CLI) tool designed to streamline your development with PrimeVue. It helps you install, configure, and manage PrimeVue projects efficiently.

This fork is only to add functionalities to the original prime pf2tw command. Seer below for more details.

## Installation

To install PrimeCLT globally, run the following command:

```bash
npm install -g primeclt
```

## Local Development

If you want to contribute to PrimeCLT or test it locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/primefaces/primeclt.git
   cd primeclt
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Build the project:**
   ```bash
   npm run build
   ```

4. **Link the package locally:**
   ```bash
   npm link
   ```

After linking, you can run the `prime` command from anywhere on your system. To reflect any changes you make in the source code, remember to run `npm run build` again.

## Global Options

- `-v, --verbose`: Enable verbose logging for debugging.
- `-V, --version`: Output the current version of PrimeCLT.
- `-h, --help`: Display help for any command.

## Commands

### PrimeVue Management (`prime vue`)

These commands are grouped under the `vue` namespace.

| Command                 | Description                                                                                                                                                                                                                         |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `prime vue install`       | Automatically detects if you are using Vite or Nuxt and installs the appropriate PrimeVue version (currently defaults to V4 Beta for Vite).                                                                                           |
| `prime vue create`        | Launches an interactive wizard to scaffold a new PrimeVue project. You can choose your engine (Vite is currently supported) and toggle TypeScript support.                                                                           |
| `prime vue preset`        | Downloads the official PrimeVue Tailwind presets to your project and provides an interactive walkthrough to select specific components and name your preset.                                                                        |
| `prime vue tw`            | Updates your Tailwind configuration file to include PrimeVue-specific content paths and settings based on your project engine (Vite or Nuxt).                                                                                       |
| `prime vue update-preset` | Synchronizes your local project presets with the latest versions from the cache, ensuring your components stay up to date with official changes.                                                                                    |
| `prime vue update-cached-presets` | Clears the local `.prime-cli` cache and re-downloads the latest presets from the official repository.                                                                                                                       |
| `prime vue configure`     | A Nuxt-specific command that configures the `nuxt-primevue` module in your `nuxt.config.ts`, including PrimeIcons and theme settings.                                                                                               |
| `prime vue clear-cache`   | Performs a clean wipe of the `~/.prime-cli` directory where downloaded presets and metadata are stored.                                                                                                                             |

### Translation Utility (`prime pf2tw`)

Translates PrimeFlex classes to Tailwind CSS classes in your project files. This tool is highly useful when migrating from PrimeFlex to Tailwind CSS.

**Usage:**
```bash
prime pf2tw [options]
```

**Options:**
- `-p, --prefix <prefix>`: Add a custom prefix to all generated Tailwind classes (e.g., `tw:bg-blue-500`).
- `-i, --important`: Appends `!` to Tailwind classes to ensure they take precedence (e.g., `bg-blue-500!`).
- `--no-recursive`: Disable recursive folder searching. It will only process files in the specified directory.

**Supported File Extensions:**
`.vue`, `.js`, `.jsx`, `.ts`, `.tsx`, `.html`

### System Commands

| Command            | Description                                |
| ------------------ | ------------------------------------------ |
| `prime uninstall`    | Uninstalls PrimeCLT from your system.      |

## Requirements

- Node.js >= 14.0.0
- npm >= 6.0.0

## License

ISC License - See the [LICENSE](LICENSE) file for details.
