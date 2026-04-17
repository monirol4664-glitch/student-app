import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.calculator.app',
  appName: 'Calculator',
  webDir: 'build',
  bundledWebRuntime: false,
  android: {
    allowMixedContent: true
  }
};

export default config;
