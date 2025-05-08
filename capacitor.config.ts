
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.f17818c568754e16b8195136671f2e1d',
  appName: 'palm-vision-detect',
  webDir: 'dist',
  server: {
    url: 'https://f17818c5-6875-4e16-b819-5136671f2e1d.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000
    }
  }
};

export default config;
