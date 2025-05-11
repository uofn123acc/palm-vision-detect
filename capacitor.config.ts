
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.palm.vision.detect',
  appName: 'Palm Vision',
  webDir: 'dist',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#ffffff",
      androidScaleType: "CENTER_CROP",
      splashImmersive: true,
      showSpinner: false
    },
    Permissions: {
      camera: true
    }
  },
  android: {
    allowMixedContent: true,
    captureInput: true,
    webContentsDebuggingEnabled: false,
    backgroundColor: "#ffffff",
    buildOptions: {
      keystorePath: null,
      keystorePassword: null,
      keystoreAlias: null,
      keystoreAliasPassword: null
    }
  },
  ios: {
    contentInset: "always",
    cordovaSwiftVersion: "5.0",
    preferredContentMode: "mobile"
  }
};

export default config;
