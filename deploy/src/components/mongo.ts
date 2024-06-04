import { Construct } from 'constructs';
import { Chart, ChartProps, Duration } from 'cdk8s';
import { StatefulSet, Probe, Service, Protocol, Volume, ConfigMap } from 'cdk8s-plus-25';

import { securityContext } from '../overrides';

export class MongoChart extends Chart {
  constructor(scope: Construct, id: string, props: ChartProps = {}) {
    super(scope, id, props);

    const initReplicaSet = new ConfigMap(this, 'mongo-init-rs', {
      data: { 'init-replica-set.js': `rs.initiate();` },
    });

    const readinessProbe = Probe.fromTcpSocket({
      port: 27017,
      initialDelaySeconds: Duration.seconds(10),
      periodSeconds: Duration.seconds(30),
      failureThreshold: 15,
    });

    const service = new Service(this, 'mongo-service', {
      metadata: {
        name: 'mongo',
      },
      ports: [
        {
          port: 27017,
          targetPort: 27017,
          protocol: Protocol.TCP,
        },
      ],
    });

    new StatefulSet(this, 'mongo', {
      metadata: {
        name: 'mongo',
      },
      service: service,
      replicas: 1,
      containers: [
        {
          image: 'mongo:7',
          args: ['--replSet', 'tilt', '--bind_ip_all'],
          portNumber: 27017,
          readiness: readinessProbe,
          securityContext: securityContext,
          volumeMounts: [
            {
              volume: Volume.fromConfigMap(this, 'mongo-init', initReplicaSet),
              path: '/docker-entrypoint-initdb.d',
            },
          ],
        },
      ],
    });
  }
}
