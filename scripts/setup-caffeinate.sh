#!/bin/bash
set -e

echo "=== Caffeinate Setup (Prevent Mac Sleep) ==="

PLIST_PATH="$HOME/Library/LaunchAgents/com.droid.caffeinate.plist"
LOG_DIR="$HOME/logs"

# Create logs directory
mkdir -p "$LOG_DIR"

# Create launchd agent
echo "[1/2] Creating caffeinate launchd agent..."
cat > "$PLIST_PATH" << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.droid.caffeinate</string>
    <key>ProgramArguments</key>
    <array>
        <string>/usr/bin/caffeinate</string>
        <string>-dimsu</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
    <key>KeepAlive</key>
    <true/>
</dict>
</plist>
EOF

# Load the agent
echo "[2/2] Loading caffeinate agent..."
launchctl unload "$PLIST_PATH" 2>/dev/null || true
launchctl load "$PLIST_PATH"

echo ""
echo "=== Caffeinate Setup Complete ==="
echo "Your Mac will now stay awake while plugged in."
echo ""
echo "To verify: pmset -g assertions | grep caffeinate"
