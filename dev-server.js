import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🚀 Starting Blue Dream Tea development environment...\n');

// Function to spawn a process with colored output
const spawnProcess = (command, args, color, name) => {
  const process = spawn(command, args, {
    stdio: ['inherit', 'pipe', 'pipe'],
    shell: true,
    cwd: __dirname
  });

  // Color codes
  const colors = {
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    reset: '\x1b[0m'
  };

  const prefix = `${colors[color]}[${name}]${colors.reset}`;

  process.stdout.on('data', (data) => {
    const lines = data.toString().split('\n').filter(line => line.trim());
    lines.forEach(line => {
      console.log(`${prefix} ${line}`);
    });
  });

  process.stderr.on('data', (data) => {
    const lines = data.toString().split('\n').filter(line => line.trim());
    lines.forEach(line => {
      console.log(`${prefix} ${colors.red}${line}${colors.reset}`);
    });
  });

  process.on('close', (code) => {
    console.log(`${prefix} Process exited with code ${code}`);
  });

  return process;
};

// Start API server (port 3000)
console.log('📡 Starting API server on port 3000...');
const apiServer = spawnProcess('node', ['local-api-server.js'], 'blue', 'API');

// Wait a moment for API server to start
setTimeout(() => {
  console.log('⚛️  Starting Vite dev server on port 5174...');
  const viteServer = spawnProcess('npx', ['vite'], 'green', 'VITE');
  
  // Handle process termination
  process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down development servers...');
    apiServer.kill('SIGINT');
    viteServer.kill('SIGINT');
    process.exit(0);
  });

  process.on('SIGTERM', () => {
    console.log('\n🛑 Shutting down development servers...');
    apiServer.kill('SIGTERM');
    viteServer.kill('SIGTERM');
    process.exit(0);
  });

  console.log('\n✅ Development environment ready!');
  console.log('📱 Frontend: http://localhost:5174');
  console.log('🔧 API Server: http://localhost:3000');
  console.log('💳 Payment Callback: http://localhost:3000/payment-callback');
  console.log('\n💡 Use Ctrl+C to stop all servers\n');
  
}, 2000); 