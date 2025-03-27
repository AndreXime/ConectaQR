const { execSync } = require('child_process');

beforeAll(async () => {
	execSync('node tests/seed.js');
});
