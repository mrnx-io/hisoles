#!/bin/bash
set -e

echo "=== Intent Relay Mac Setup (No VPS Needed) ==="
echo ""

# Configuration
PLIST_PATH="$HOME/Library/LaunchAgents/com.agi.intent-relay.plist"
PROJECT_DIR="${PROJECT_DIR:-$HOME/dev/hisoles}"
LOG_DIR="$HOME/logs"

# Check required env vars
if [ -z "$TELEGRAM_BOT_TOKEN" ]; then
  echo "Error: TELEGRAM_BOT_TOKEN is required"
  echo "Set it with: export TELEGRAM_BOT_TOKEN=your_token"
  exit 1
fi

if [ -z "$ALLOWED_USER_ID" ]; then
  echo "Error: ALLOWED_USER_ID is required"
  echo "Get your ID from @userinfobot on Telegram"
  echo "Set it with: export ALLOWED_USER_ID=your_id"
  exit 1
fi

# Create logs directory
mkdir -p "$LOG_DIR"

echo "[1/3] Creating launchd agent..."
cat > "$PLIST_PATH" << EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.agi.intent-relay</string>
    <key>ProgramArguments</key>
    <array>
        <string>/opt/homebrew/bin/bun</string>
        <string>run</string>
        <string>${PROJECT_DIR}/apps/intent-relay/src/server.ts</string>
    </array>
    <key>WorkingDirectory</key>
    <string>${PROJECT_DIR}</string>
    <key>EnvironmentVariables</key>
    <dict>
        <key>TELEGRAM_BOT_TOKEN</key>
        <string>${TELEGRAM_BOT_TOKEN}</string>
        <key>ALLOWED_USER_ID</key>
        <string>${ALLOWED_USER_ID}</string>
        <key>DROID_AUTO_LEVEL</key>
        <string>${DROID_AUTO_LEVEL:-high}</string>
        <key>PROJECT_DIR</key>
        <string>${PROJECT_DIR}</string>
        <key>PATH</key>
        <string>/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:$HOME/.local/bin</string>
    </dict>
    <key>RunAtLoad</key>
    <true/>
    <key>KeepAlive</key>
    <true/>
    <key>StandardOutPath</key>
    <string>${LOG_DIR}/intent-relay.log</string>
    <key>StandardErrorPath</key>
    <string>${LOG_DIR}/intent-relay.err</string>
</dict>
</plist>
EOF

echo "[2/3] Loading launchd agent..."
launchctl unload "$PLIST_PATH" 2>/dev/null || true
launchctl load "$PLIST_PATH"

echo "[3/3] Verifying..."
sleep 2
if launchctl list | grep -q "com.agi.intent-relay"; then
  echo "✓ Intent Relay is running"
else
  echo "✗ Failed to start. Check logs: tail -f $LOG_DIR/intent-relay.err"
  exit 1
fi

echo ""
echo "=== Intent Relay Mac Setup Complete ==="
echo ""
echo "Logs: tail -f $LOG_DIR/intent-relay.log"
echo "Errors: tail -f $LOG_DIR/intent-relay.err"
echo ""
echo "Commands:"
echo "  Stop:    launchctl unload $PLIST_PATH"
echo "  Start:   launchctl load $PLIST_PATH"
echo "  Restart: launchctl unload $PLIST_PATH && launchctl load $PLIST_PATH"
