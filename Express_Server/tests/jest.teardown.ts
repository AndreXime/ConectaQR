export default async function () {
	const testServerProcess = global.testServerProcess;
	if (testServerProcess && !testServerProcess.killed) {
		testServerProcess.kill('SIGKILL');
	}
}
