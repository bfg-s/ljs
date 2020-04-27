#!/usr/bin/env bash

NOW_P=$(pwd)

if [[ -d $(eval echo "$NOW_P/assets/js.dev") ]]; then
    sudo rm -r $(eval echo "$NOW_P/assets/js.dev")
fi

yarn run dev
mv $(eval echo "$NOW_P/assets/js") $(eval echo "$NOW_P/assets/js.dev")
