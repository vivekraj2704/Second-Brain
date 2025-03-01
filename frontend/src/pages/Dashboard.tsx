import { Button } from '../components/ui/Button'
import { Shareicon } from '../icons/Shareicon'
import { Card } from '../components/ui/Card'
import { CreateModal } from '../components/ui/CreateModal'
import { useState } from 'react'
import { Sidebar } from '../components/ui/Sidebar'

export function Dashboard() {
  const[modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <Sidebar />
      <div className='p-4 ml-72 min-h-screen bg-gray-100'>
        <CreateModal open={modalOpen} onClose={() => {
          setModalOpen(false);
        }}/>
        <div className='flex justify-end gap-4'>
          <Button startIcon={<Shareicon svgsize="md"/>} text="Add new Item mid" variant='primary' size='md' onClick={() => setModalOpen(true)}/>
          <Button startIcon={<Shareicon svgsize="md"/>} text="Add new Item mid" variant='primary' size='md' onClick={() => console.log('ok')}/>
        </div>

        <div className='flex gap-4'>
          <Card type={"twitter"} link={"https://x.com/charliekirk11/status/1895532670521917571"} title='TRUMP!!!!!'/>
          <Card type={"youtube"} link={"https://www.youtube.com/watch?v=SCcgh2pXUg0"} title={"Maniac"}/>
        </div>
      </div>
    </div>
  )
}

