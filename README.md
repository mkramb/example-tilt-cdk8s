# example-tilt-cdk8

This GitHub repository demonstrates how to use CDK8s (Cloud Development Kit for Kubernetes) with Tilt to provision and manage a MongoDB database and a NATS server. It also includes NACK controller to provision & manage a stream. The repository is structured to facilitate easy setup and deployment using CDK8s for Kubernetes resource definitions.

## Development setup

Install & setup [direnv](https://direnv.net/):

```
brew install direnv
echo 'eval "$(direnv hook zsh)"' >> ~/.zshrc
```

Install script to get the latest version of [devbox](https://www.jetify.com/devbox/):

```
curl -fsSL https://get.jetify.com/devbox | bash
```

Execute setup scripts:

```
task setup-pnpm
task setup-kind
```

## Usage

```
tilt up
tilt down
```
