import { Button } from '../components/ui/Button'
import { Shareicon } from '../icons/Shareicon'
import { Card } from '../components/ui/Card'
import { CreateModal } from '../components/ui/CreateModal'
import { useState } from 'react'
import { Sidebar } from '../components/ui/Sidebar'
import { useContent } from '../hooks/useContent'

export function Dashboard() {
  const[modalOpen, setModalOpen] = useState(false);
  const contents = useContent();

  return (
    <div>
      <Sidebar />
      <div className='p-4 ml-72 min-h-screen bg-gray-100'>
        <CreateModal open={modalOpen} onClose={() => {
          setModalOpen(false);
        }}/>
        <div className='flex justify-end gap-4'>
          <Button startIcon={<Shareicon svgsize="md"/>} text="Add Content" variant='primary' size='md' onClick={() => setModalOpen(true)}/>
          <Button startIcon={<Shareicon svgsize="md"/>} text="Share Brain" variant='primary' size='md' onClick={() => console.log('ok')}/>
        </div>

        <div className='flex gap-4 flex-wrap'>
          {contents.length > 0 ? contents.map(({type, link, title}) => {
            return <Card type={type} link={link} title={title}/>
          }) : <div>No content found</div>}
        </div>
      </div>
    </div>
  )
}

