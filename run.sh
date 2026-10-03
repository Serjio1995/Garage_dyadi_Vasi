#!/bin/bash
# Запуск: bash run.sh  (ставит зависимости и собирает, если их нет)
cd "$(dirname "$0")"
[ -d node_modules ] || npm i --no-audit --no-fund
[ -f .next/BUILD_ID ] || npx next build
npx next start -H 0.0.0.0 -p 3000
