// @flow

import * as React from 'react';
import { AppRegistry, StyleSheet } from 'react-native';

import { processFontFamily } from './Font';
import Notifications from './Notifications';

type InitialProps = {
  exp: {
    notification?: Object,
    errorRecovery?: Object,
    [string]: any,
  },
  shell?: boolean,
  shellManifestUrl?: string,
  [string]: any,
};

function wrapWithExpoRoot<P: InitialProps>(
  AppRootComponent: React.ComponentType<P>
): React.ComponentType<P> {
  return class ExpoRootComponent extends React.Component<P> {
    componentWillMount() {
      StyleSheet.setStyleAttributePreprocessor('fontFamily', processFontFamily);

      if (this.props.exp.notification) {
        Notifications._setInitialNotification(this.props.exp.notification);
      }
    }

    render() {
      return <AppRootComponent {...this.props} />;
    }
  };
}

export default function registerRootComponent(
  component: React.ComponentType<*>
): void {
  AppRegistry.registerComponent('main', () => wrapWithExpoRoot(component));
}
