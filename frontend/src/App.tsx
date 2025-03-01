import './index.css'
import { Button } from './components/ui/Button'
import { Shareicon } from './icons/Shareicon'
import { Card } from './components/ui/Card'
import { CreateModal } from './CreateModal'
import { useState } from 'react'

function App() {
  const[modalOpen, setModalOpen] = useState(false);

  return (
    <div className='p-4'>
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
  )
}

export default App
