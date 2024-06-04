import { App, YamlOutputType } from 'cdk8s';

import { NatsChart } from './components/nats';
import { MongoChart } from './components/mongo';

const app = new App({
  yamlOutputType: YamlOutputType.FILE_PER_CHART,
  outputFileExtension: '.yaml',
});

// infra
new NatsChart(app, 'nats');
new MongoChart(app, 'mongo');

app.synth();
