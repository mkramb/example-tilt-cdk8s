# example-tilt-cdk8s-nats

This GitHub repository demonstrates how to use CDK8s (Cloud Development Kit for Kubernetes) with Tilt to provision and manage a MongoDB database and a NATS server. It also includes a custom controller using NATS to provision a stream. The repository is structured to facilitate easy setup and deployment using CDK8s for Kubernetes resource definitions, Tilt for local development and deployment workflows, and a custom back controller to manage NATS streams.

Setup:

```
task setup-pnpm
task setup-kind
```

Usage:

```
tilt up
```
