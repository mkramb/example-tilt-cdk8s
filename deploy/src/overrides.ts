import { ContainerSecurityContextProps } from 'cdk8s-plus-25';

export const securityContext: ContainerSecurityContextProps = {
  readOnlyRootFilesystem: false,
  allowPrivilegeEscalation: true,
  ensureNonRoot: false,
  privileged: true,
};
