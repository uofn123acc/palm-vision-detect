
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.f17818c568754e16b8195136671f2e1d',
  appName: 'palm-vision-detect',
  webDir: 'dist',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      backgroundColor: "#ffffff",
      androidScaleType: "CENTER_CROP",
      splashImmersive: true
    },
    Permissions: {
      camera: true
    }
  },
  android: {
    allowMixedContent: true,
    captureInput: true,
    webContentsDebuggingEnabled: false
  },
  ios: {
    contentInset: "always",
    cordovaSwiftVersion: "5.0",
    preferredContentMode: "mobile"
  }
};

export default config;
