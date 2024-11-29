# Create docs
.PHONY: docs
docs:
	rm -rf ./docs
	mkdir docs
	jsdoc ./src -c ./jsdoc_conf.json ./README.md

# Push current state to Google Scripts
.PHONY: push
push:
	clasp push -P src

# Pull current state from Google Scripts
.PHONY: pull
pull:
	clasp pull
