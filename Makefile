install:
	npm install

check:
	npm run babel-node -- src/bin/gendiff.js

lint:
	npm run eslint .

test:
	npm run test
