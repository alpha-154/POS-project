import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='min-h-screen flex flex-col gap-5 items-center justify-center'>
      <h1 className='text-3xl text-primary'>Page <span className='text-red-500'>Not Found</span></h1>
      <p className='text-2xl text-primary text-center'>Sorry, we couldn&apos;t find the page you&apos;re looking for.</p>
      <Link href="/" className='text-xl text-primary border border-gray-50 p-2 rounded-md hover:bg-gray-100 transition-colors duration-100'>Go back home</Link>
    </div>
  );
}
