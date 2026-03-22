#!/usr/bin/env bash
# Clarity Browser — Linux Installer
# Usage: curl -fsSL https://getclaritybrowser.com/install.sh | bash
set -euo pipefail

VERSION="0.1.0"
DEB_URL="https://github.com/felaks03/Clarity/releases/download/v${VERSION}/clarity_${VERSION}_amd64.deb"
TMP_DIR="$(mktemp -d)"
DEB_FILE="${TMP_DIR}/clarity_${VERSION}_amd64.deb"

cleanup() {
  rm -rf "$TMP_DIR"
}
trap cleanup EXIT

echo ""
echo "  ┌──────────────────────────────────┐"
echo "  │   Clarity Browser Installer      │"
echo "  │   v${VERSION}                          │"
echo "  └──────────────────────────────────┘"
echo ""

# Check architecture
ARCH="$(uname -m)"
if [ "$ARCH" != "x86_64" ]; then
  echo "Error: Clarity only supports x86_64 (amd64). Detected: $ARCH"
  exit 1
fi

# Check for dpkg (Debian/Ubuntu based)
if ! command -v dpkg &> /dev/null; then
  echo "Error: dpkg not found. This installer requires a Debian/Ubuntu based system."
  echo "For other distros, download the AppImage from:"
  echo "  https://github.com/felaks03/Clarity/releases"
  exit 1
fi

echo "→ Downloading Clarity v${VERSION}..."
if ! curl -fSL --progress-bar -o "$DEB_FILE" "$DEB_URL"; then
  echo "Error: Failed to download. Check your connection or visit:"
  echo "  https://github.com/felaks03/Clarity/releases"
  exit 1
fi

echo "→ Installing..."
if command -v sudo &> /dev/null; then
  sudo dpkg -i "$DEB_FILE" || sudo apt-get install -f -y
else
  dpkg -i "$DEB_FILE" || apt-get install -f -y
fi

echo ""
echo "✓ Clarity v${VERSION} installed successfully!"
echo ""
echo "  Launch from your application menu or run:"
echo "    clarity"
echo ""
echo "  To uninstall:"
echo "    sudo apt remove clarity"
echo ""
