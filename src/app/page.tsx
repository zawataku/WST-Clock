'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';

const DynamicClock = dynamic(() => import('../components/clock'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-200 p-8">
      <div className="relative w-full max-w-2xl rounded-xl bg-white p-8 shadow-lg">
        <Link href="https://github.com/zawataku/WST-Viewer" className='absolute -top-7 right-4 text-gray-500' target='self'>GitHubリポジトリはこちら</Link>
        <h1 className="mb-8 text-center text-3xl font-bold">起床標準時（WST）ビュワー</h1>
        <DynamicClock />
      </div>
    </main>
  );
}