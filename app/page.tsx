'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('kirotax_user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      router.push(`/dashboard/${user.role.toLowerCase().replace('_', '-')}`);
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <div className="max-w-md w-full px-6 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">KiroTax Console</h1>
        <p className="text-lg text-gray-600 mb-8">
          Professional CA & GST Automation Platform
        </p>
        <Link
          href="/login"
          className="btn-primary inline-block"
        >
          Login to Continue
        </Link>
      </div>
    </div>
  );
}
