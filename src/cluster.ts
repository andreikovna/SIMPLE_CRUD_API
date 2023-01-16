import cluster from 'cluster';
import os from 'os';
import { serverStart } from './server';

const PORT = Number(process.env.PORT) || 4000;

if (cluster.isPrimary) {
  const cpusCount = os.cpus().length;
  console.log(`Master started. Pid: ${process.pid}`);
  console.log(`Starting ${cpusCount} forks`);
  for (let i = 0; i < cpusCount; i++) {
    const newPort = PORT + i;
    cluster.fork({ PORT: newPort });
  }
  cluster.on('exit', (worker) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else if (cluster.isWorker) {
  const id = cluster.worker?.id;
  serverStart();
  console.log(`Worker ${id} started ${process.pid}`);
}
