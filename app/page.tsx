import Link from 'next/link'
import React from 'react'

const Home = () => {
  return (
    <div>
     <Link href={'/room-chat'}> <button className='bg-white text-black p-3 rounded-md hover:cursor-pointer'>Create Room</button></Link>
    </div>
  )
}

export default Home