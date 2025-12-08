'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { Inter, Playfair_Display } from 'next/font/google';

const inter = Inter({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: "--font-sans",
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ['400', '700'],
  variable: "--font-serif",
  display: 'swap',
});

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Log the error to your observability tool here
    console.error('Global application error:', error);
  }, [error]);

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center p-8">
            <div className="flex justify-center mb-6">
              <div className="bg-red-100 rounded-full p-4">
                <AlertTriangle className="h-12 w-12 text-red-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Critical System Error
            </h1>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              A critical error has occurred. The system has been compromised and needs to be restarted.
            </p>
            {process.env.NODE_ENV === 'development' && (
              <div className="mb-6 p-4 bg-gray-100 rounded-lg text-left max-w-md mx-auto">
                <p className="text-sm font-mono text-red-600">
                  {error.message}
                </p>
                {error.digest && (
                  <p className="text-xs text-gray-500 mt-2">
                    Error ID: {error.digest}
                  </p>
                )}
              </div>
            )}
            <Button onClick={reset} className="min-w-[120px]">
              Restart Application
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}
