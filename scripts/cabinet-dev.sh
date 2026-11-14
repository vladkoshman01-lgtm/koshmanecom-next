#!/usr/bin/env bash
# Локальний кабінет: емулятори Auth + Firestore + Functions і стартові дані.
# Сайт запускається окремо: npm run dev. Нічого не ходить у прод — проєкт demo-koshman.
set -euo pipefail
cd "$(dirname "$0")/.."

if [ -z "${JAVA_HOME:-}" ]; then
  JDK=$(ls -d "$HOME"/.local/jdk/*/Contents/Home 2>/dev/null | head -1 || true)
  [ -n "$JDK" ] && export JAVA_HOME="$JDK"
fi
[ -n "${JAVA_HOME:-}" ] && export PATH="$JAVA_HOME/bin:$PATH"

# Емулятор функцій вимагає значення всіх секретів — для локалки фейкові
if [ ! -f functions/.secret.local ]; then
  printf 'TELEGRAM_BOT_TOKEN=local\nTELEGRAM_CHAT_ID=local\nPINTEREST_ACCESS_TOKEN=local\nWINDSOR_API_KEY=local\nPINTEREST_APP_SECRET=local\n' > functions/.secret.local
fi
# Ключ шифрування токенів джерел — випадковий, лише локальний
grep -q '^CABINET_ENCRYPTION_KEY=' functions/.secret.local || printf '\nCABINET_ENCRYPTION_KEY=%s\n' "$(openssl rand -base64 32)" >> functions/.secret.local

(cd functions && npx tsc -p .)

(
  for _ in $(seq 1 90); do
    curl -s -o /dev/null http://127.0.0.1:8080 && curl -s -o /dev/null http://127.0.0.1:5001 && break
    sleep 1
  done
  FIRESTORE_EMULATOR_HOST=127.0.0.1:8080 node scripts/cabinet-seed.mjs
) &

# Дані між запусками зберігаються в .cabinet-emulator-data (імпорт — лише якщо вже є експорт)
IMPORT=()
[ -f .cabinet-emulator-data/firebase-export-metadata.json ] && IMPORT=(--import=./.cabinet-emulator-data)
exec firebase emulators:start --only auth,firestore,functions --project demo-koshman \
  ${IMPORT[@]+"${IMPORT[@]}"} --export-on-exit=./.cabinet-emulator-data
