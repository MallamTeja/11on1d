const { exec } = require('child_process');
const net = require('net');

function isPortFree(port) {
  return new Promise((resolve) => {
    const server = net.createServer()
      .once('error', () => resolve(false))
      .once('listening', () => {
        server.close(() => resolve(true));
      })
      .listen(port);
  });
}

async function findFreePort(startPort) {
  let port = startPort;
  while (port < 6553
    
    5) {
    if (await isPortFree(port)) {
      return port;
    }
    port++;
  }
  throw new Error('No free ports available');
}

async function startServer() {
  try {
    const port = await findFreePort(5000);
    console.log(`Starting server on port ${port}...`);
    
    const vite = exec(`npx vite --port ${port}`, { stdio: 'inherit' });
    
    vite.on('exit', (code) => {
      console.log(`Vite process exited with code ${code}`);
    });
    
    // Open browser after a short delay
    setTimeout(() => {
      const open = require('open');
      open(`http://localhost:${port}`);
    }, 3000);
    
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
}

startServer();
