import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.calculator.app',
  appName: 'Calculator',
  webDir: 'dist',
  android: {
    allowMixedContent: true
  }
};

export default config;
