@echo off
rmdir /s /q docs
mkdir docs
jsdoc ./src -c ./jsdoc_conf.json ./README.md