install:
	npm install

check:
	npm run babel-node -- src/bin/gendiff.js

lint:
	npx eslint .

test:
	npm run test
