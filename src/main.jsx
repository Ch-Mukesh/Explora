import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import Navbar from './components/custom/Navbar.jsx';
import { ThemeProvider } from '@/components/theme-provider';
import { BrowserRouter } from 'react-router-dom';
import Footer from './components/custom/Footer.jsx';
import { Toaster } from './components/ui/sonner.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="bg-background-50 dark:bg-[rgb(17,17,17)] min-h-screen flex flex-col"> {/* Flex layout */}
          <Navbar />
          <div className="flex-grow">
            <App />
            <Toaster />
          </div>
          <Footer/>
        </div>
      </ThemeProvider>
    </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>
);
