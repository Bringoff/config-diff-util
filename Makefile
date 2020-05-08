install-deps:
	npm ci

install: install-deps

publish:
	npm publish

lint:
	npx eslint .