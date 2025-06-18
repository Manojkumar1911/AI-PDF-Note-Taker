import { UserButton } from '@clerk/nextjs';
import React from 'react'

const Header = () => {
  return (
    <div className='flex items-center p-3 sm:p-4 shadow-md bg-gradient-to-r from-purple-100 via-blue-100 to-yellow-50 lg:bg-white lg:shadow-none lg:border-b lg:border-gray-100'>
      {/* Logo section - only on mobile */}
      <div className='flex items-center space-x-3 lg:hidden'>
        <div className="relative">
          <div className="w-9 h-9 bg-gradient-to-br from-yellow-200 via-pink-200 to-purple-200 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-purple-700 font-bold text-base select-none">AI</span>
          </div>
        </div>
        <span className="text-base font-bold bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 bg-clip-text text-transparent select-none">PDF Note Taker</span>
      </div>
      {/* Grow to push avatar right */}
      <div className='flex-grow'></div>
      {/* User button with enhanced styling, always on right */}
      <div className='flex items-center ml-auto'>
        <UserButton 
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "w-10 h-10 shadow-lg border-2 border-purple-100 hover:border-purple-200 transition-colors",
              userButtonPopoverCard: "shadow-xl border border-gray-200",
              userButtonPopoverActionButton: "hover:bg-purple-50 transition-colors"
            }
          }}
        />
      </div>
    </div>
  )
}

export default Header;