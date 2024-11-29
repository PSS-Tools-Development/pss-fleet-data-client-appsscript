# Create docs
.PHONY: docs
docs:
	rm -rf ./docs
	mkdir docs
	jsdoc ./src -c ./jsdoc_conf.json ./README.md

# Push current state to Google Scripts
.PHONY: push
push:
	clasp push

# Pull current state from Google Scripts
.PHONY: pull
pull:
	clasp pull

# Publish new version
.PHONY: Publish
publish:
	clasp version "Read the docs on: https://pss-tools-development.github.io/pss-fleet-data-client-appsscript/"
