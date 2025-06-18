import { SignIn } from '@clerk/nextjs'
import Image from 'next/image'

export default function Page() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100 p-4'>
      <div className='flex flex-col lg:flex-row w-full max-w-4xl bg-white rounded-2xl lg:rounded-3xl shadow-2xl overflow-hidden'>
        {/* Left: Illustration */}
        <div className='relative w-full h-48 sm:h-64 lg:h-auto lg:flex-1 lg:min-h-[400px]'>
          <Image
            src='/signin-page.png'
            alt='Sign In Illustration'
            fill
            className='object-cover w-full h-full rounded-t-2xl lg:rounded-t-none lg:rounded-l-3xl'
            priority
          />
        </div>
        {/* Right: Sign In Form */}
        <div className='flex w-full lg:flex-1 items-center justify-center p-4 sm:p-6 lg:p-8 bg-white rounded-b-2xl lg:rounded-b-none lg:rounded-r-3xl'>
          <div className='w-full max-w-sm'>
            <SignIn redirectUrl="/dashboard" />
          </div>
        </div>
      </div>
    </div>
  )
}