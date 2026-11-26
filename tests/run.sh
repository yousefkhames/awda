#!/bin/bash
# real headless-Chrome click-through: desktop+mobile x en+ar
cd "$(dirname "$0")"; fail=0
for cfg in "en 390 844" "ar 390 844" "en 1280 900" "ar 1280 900"; do set -- $cfg
 out=$(google-chrome --headless=new --no-sandbox --disable-gpu --allow-file-access-from-files --window-size=$2,$3 --virtual-time-budget=4000 --user-data-dir=/tmp/cpt$RANDOM --enable-logging=stderr --v=0 --dump-dom "file://$PWD/flow.html?lang=$1&w=$2" 2>/tmp/t.err)
 t=$(echo "$out" | grep -o "<title>[^<]*" | sed 's/<title>//'); 
 f=$(echo "$t" | tr ';' '\n' | grep -c FAIL); n=$(echo "$t" | tr ';' '\n' | grep -c PASS)
 c=$(grep CONSOLE /tmp/t.err | grep -v -i manifest | wc -l)
 echo "$1 ${2}px: pass=$n fail=$f console_errors=$c"; [ "$f" != 0 ] && echo "$t" | tr ';' '\n' | grep FAIL; fail=$((fail+f+c))
done; exit $fail
