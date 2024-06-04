docker_prune_settings(disable=False, num_builds=3, keep_recent=2)

if config.tilt_subcommand == "up":
    local("pnpm run --filter deploy synth")

k8s_yaml([
    "deploy/dist/nats.yaml",
    "deploy/dist/mongo.yaml",
])

k8s_resource("nats", port_forwards=["4222:4222"], labels=["infra"])
k8s_resource("nats-nack", resource_deps=["nats"], labels=["infra"])