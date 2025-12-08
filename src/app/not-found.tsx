import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileX } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8">
        <div className="flex justify-center mb-6">
          <div className="bg-blue-100 rounded-full p-4">
            <FileX className="h-12 w-12 text-blue-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          404 - Page Not Found
        </h1>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="space-y-2">
          <Button asChild className="min-w-[120px]">
            <Link href="/">
              Go Home
            </Link>
          </Button>
          <div className="text-sm text-gray-500">
            Or{' '}
            <Link href="/contact" className="text-blue-600 hover:underline">
              contact us
            </Link>{' '}
            if you need assistance.
          </div>
        </div>
      </div>
    </div>
  );
}
