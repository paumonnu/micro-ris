import hasFlag from 'has-flag';
import App from './App.js';

const app = new App();

console.log();

if (hasFlag('cli')) {
  app.cli.exec();
} else {
  app.start();
}
