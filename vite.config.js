import { defineConfig } from 'vite';

export default defineConfig({
  root: './',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: './index.html',
        login: './login.html',
        signup: './signup.html',
        dashboard: './dashboard.html',
        profile: './profile.html',
        achievements: './achievements.html',
        calendar: './calendar.html',
        about: './about.html',
        contact: './contact.html',
        settings: './settings.html'
      }
    }
  }
});
