echo off
rm -r -fo docs
New-Item -Type Directory -Name docs
jsdoc ./src -c ./jsdoc_conf.json ./README.md