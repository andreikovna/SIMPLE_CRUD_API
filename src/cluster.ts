import cluster from 'cluster';
import os from 'os';
import { serverStart } from './server';

const cpusCount = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`CPUs: ${cpusCount}`);
  console.log(`Master started. Pid: ${process.pid}`);
  for (let i = 0; i < cpusCount; i++) {
    cluster.fork();
  }
  cluster.on('exit', (worker) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else if (cluster.isWorker) {
    serverStart();
    console.log(`Worker ${process.pid} started`);
}
