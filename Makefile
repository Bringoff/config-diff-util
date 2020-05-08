install-deps:
	npm ci

install: install-deps

ci: install-deps

publish:
	npm publish

lint:
	npx eslint .

test: 
	npm test

test-coverage:
	npm test -- --coverage