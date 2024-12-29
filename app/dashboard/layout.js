import React from 'react'
import Sidebar from './_component/Sidebar';
import Header from './_component/Header';

function DashboardLayout({children}) {
  return (
    <div>
        <div className='md:width-64 h-screen fixed'>
            <Sidebar/>
        </div>
        <div className='md:ml-64 '>
          <Header/>
            {children}
        </div>
    </div>
  )
}

export default DashboardLayout;