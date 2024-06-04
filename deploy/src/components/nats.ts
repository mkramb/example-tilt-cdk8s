import { Construct } from 'constructs';
import { Chart, ChartProps, Include } from 'cdk8s';

import { Nats } from '../../imports/nats';
import { Nack } from '../../imports/nack';
import { Stream } from '../../imports/jetstream.nats.io';

export class NatsChart extends Chart {
  constructor(scope: Construct, id: string, props: ChartProps = {}) {
    super(scope, id, props);

    new Nats(this, 'nats', {
      releaseName: 'nats',
      values: {
        natsBox: {
          enabled: false,
        },
        config: {
          jetstream: {
            enabled: true,
            memoryStore: {
              enabled: true,
            },
          },
        },
      },
    });

    this.provisionNack();
    this.populateCRDValues();
  }

  provisionNack() {
    new Include(this, 'nats-crds', {
      url: 'https://github.com/nats-io/nack/releases/latest/download/crds.yml',
    });

    new Nack(this, 'nats-nack', {
      releaseName: 'nats-nack',
      values: {
        jetstream: {
          nats: {
            url: 'nats://nats:4222',
          },
        },
      },
    });
  }

  populateCRDValues() {
    new Stream(this, 'nats-nack-crds', {
      metadata: {
        name: 'events',
      },
      spec: {
        name: 'events',
        subjects: ['events.*', 'events.*.*', 'events.*.*.*'],
      },
    });
  }
}
