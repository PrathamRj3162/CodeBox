import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

function CommunityHelpSection() {
  return (
    <div className='font-game p-4 border-4 rounded-xl mt-7 flex items-center flex-col'>
      <h2 className="text-3xl">Need Help?</h2>
      <p className='text-2xl'>Ask question in our community</p>
      <Link href="/contact">
        <Button className='text-2xl mt-3' variant={'pixel'} size={'lg'}>Go to Community</Button>
      </Link>
    </div>
  )
}

export default CommunityHelpSection
