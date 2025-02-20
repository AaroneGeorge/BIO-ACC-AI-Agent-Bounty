# Agent Installer

A CLI tool to easily install and set up the [Agent](https://github.com/AaroneGeorge/BIO-ACC-AI-Agent-Bounty).

## Prerequisites

Before installation, ensure you have:

- **Linux/WSL**: A Debian-based Linux distribution or WSL2
- **Git**: For cloning the repository
- **Sudo privileges**: Required for installing system dependencies

The installer will automatically set up:
- Node.js (v23.3.0)
- pnpm (v9.0.0 or higher)
- Python3, Make, FFmpeg, and other required dependencies

If using WSL2 on Windows:
1. Open PowerShell as Administrator and run:
   ```powershell
   wsl --install
   ```
2. Restart your computer if prompted
3. Open WSL and proceed with installation

## Installation

```bash
git clone https://github.com/AaroneGeorge/BIO-ACC-AI-Agent-Bounty.git
cd BIO-ACC-AI-Agent-Bounty
chmod +x setup.sh
./setup.sh
```

## What it Does

The installer will:
1. Check and install required system dependencies
2. Set up Node.js and pnpm if not present
3. Clone the Agent repository
4. Set up the environment
5. Build and start the Agent

## Usage

After installation, you can start Agent by running:
```bash
cd agent
pnpm start
```

The Agent will be available at `http://localhost:5173` in your web browser.

## Customization

- The `.env` file in the Agent directory contains configuration options
- Character files are located in `agent/characters/`
- To use a custom character:
  ```bash
  pnpm start --characters="characters/YOUR_CHARACTER.character.json"
  ```

## Troubleshooting

- If you see dependency errors, try:
  ```bash
  npm install -g pnpm
  pnpm install
  ```
- For WSL-specific issues, make sure you're using WSL2:
  ```powershell
  wsl --set-version Ubuntu 2
  ```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.