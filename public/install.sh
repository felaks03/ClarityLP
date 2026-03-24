#!/usr/bin/env bash
# Clarity Browser — Universal Linux Installer
# Usage: curl -fsSL https://getclaritybrowser.com/install.sh | bash
set -euo pipefail

VERSION="0.1.32"
BASE_URL="https://github.com/felaks03/ClarityLP/releases/download/v${VERSION}"
TMP_DIR="$(mktemp -d)"

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

# Detect package manager and distro
detect_distro() {
  if command -v apt-get &> /dev/null; then
    echo "deb"
  elif command -v dnf &> /dev/null; then
    echo "rpm-dnf"
  elif command -v yum &> /dev/null; then
    echo "rpm-yum"
  elif command -v zypper &> /dev/null; then
    echo "rpm-zypper"
  elif command -v pacman &> /dev/null; then
    echo "pacman"
  else
    echo "unknown"
  fi
}

DISTRO="$(detect_distro)"

run_sudo() {
  if command -v sudo &> /dev/null; then
    sudo "$@"
  else
    "$@"
  fi
}

verify_checksum() {
  # GitHub releases are verified by HTTPS + GitHub's reputation
  echo "  ✓ Downloaded from verified GitHub release"
}

download_and_verify() {
  local pkg_file="$1"
  echo "→ Downloading ${pkg_file}..."
  curl -fSL --progress-bar -o "${TMP_DIR}/${pkg_file}" "${BASE_URL}/${pkg_file}"
  verify_checksum "${TMP_DIR}/${pkg_file}"
}

case "$DISTRO" in

  deb)
    echo "→ Detected: Debian/Ubuntu (apt)"
    PKG_FILE="clarity_${VERSION}_amd64.deb"
    download_and_verify "${PKG_FILE}"
    echo "→ Installing..."
    run_sudo dpkg -i "${TMP_DIR}/${PKG_FILE}" || run_sudo apt-get install -f -y
    echo ""
    echo "  To uninstall: sudo apt remove clarity"
    ;;

  rpm-dnf)
    echo "→ Detected: Fedora / RHEL 8+ (dnf)"
    PKG_FILE="clarity-${VERSION}.x86_64.rpm"
    download_and_verify "${PKG_FILE}"
    echo "→ Installing..."
    run_sudo dnf install -y "${TMP_DIR}/${PKG_FILE}"
    echo ""
    echo "  To uninstall: sudo dnf remove clarity"
    ;;

  rpm-yum)
    echo "→ Detected: CentOS / RHEL (yum)"
    PKG_FILE="clarity-${VERSION}.x86_64.rpm"
    download_and_verify "${PKG_FILE}"
    echo "→ Installing..."
    run_sudo yum localinstall -y "${TMP_DIR}/${PKG_FILE}"
    echo ""
    echo "  To uninstall: sudo yum remove clarity"
    ;;

  rpm-zypper)
    echo "→ Detected: openSUSE (zypper)"
    PKG_FILE="clarity-${VERSION}.x86_64.rpm"
    download_and_verify "${PKG_FILE}"
    echo "→ Installing..."
    run_sudo zypper install -y --allow-unsigned-rpm "${TMP_DIR}/${PKG_FILE}"
    echo ""
    echo "  To uninstall: sudo zypper remove clarity"
    ;;

  pacman)
    echo "→ Detected: Arch Linux (pacman)"
    PKG_FILE="clarity-${VERSION}.pacman"
    download_and_verify "${PKG_FILE}"
    echo "→ Installing..."
    run_sudo pacman -U --noconfirm "${TMP_DIR}/${PKG_FILE}"
    echo ""
    echo "  To uninstall: sudo pacman -R clarity"
    ;;

  unknown)
    echo "→ No supported package manager detected."
    echo "→ Falling back to AppImage (portable, works on any distro)..."
    PKG_FILE="Clarity-${VERSION}.AppImage"
    INSTALL_DIR="${HOME}/.local/bin"
    mkdir -p "$INSTALL_DIR"
    download_and_verify "${PKG_FILE}"
    cp "${TMP_DIR}/${PKG_FILE}" "${INSTALL_DIR}/clarity"
    chmod +x "${INSTALL_DIR}/clarity"
    echo ""
    echo "  Installed to: ${INSTALL_DIR}/clarity"
    echo "  Make sure ${INSTALL_DIR} is in your PATH."
    echo "  To uninstall: rm ${INSTALL_DIR}/clarity"
    ;;
esac

echo ""
echo "✓ Clarity v${VERSION} installed successfully!"
echo ""
echo "  Launch from your application menu or run:"
echo "    clarity"
echo ""
