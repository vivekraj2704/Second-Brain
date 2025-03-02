import { Button } from '../components/ui/Button'
import { Shareicon } from '../icons/Shareicon'
import { Card } from '../components/ui/Card'
import { CreateModal } from '../components/ui/CreateModal'
import { useEffect, useState } from 'react'
import { Sidebar } from '../components/ui/Sidebar'
import { useContent } from '../hooks/useContent'
import { Plusicon } from '../icons/Plusicon'
import { BACKEND_URL, FRONTEND_URL } from '../config'
import axios from 'axios'

export function Dashboard() {
  const[modalOpen, setModalOpen] = useState(false);
  const {contents, recaller} = useContent();

  useEffect(() => {
    recaller();
  }, [modalOpen])

  const shareFunction = async function() {
    const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, {
      share: true
    }, {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    })
    const shareUrl = `${FRONTEND_URL}/share/${response.data.hash}`
    navigator.clipboard.writeText(shareUrl)
    alert('URL copied')
  }

  return (
    <div>
      <Sidebar />
      <div className='p-4 ml-72 min-h-screen bg-gray-100'>
        <CreateModal open={modalOpen} onClose={() => {
          setModalOpen(false);
        }}/>
        <div className='flex justify-end gap-4 mb-4'>
          <Button startIcon={<Plusicon svgsize="md"/>} text="Add Content" variant='primary' size='md' onClick={() => setModalOpen(true)}/>
          <Button onClick={() => {
            shareFunction()
          }} startIcon={<Shareicon svgsize="md"/>} text="Share Brain" variant='primary' size='md'/>
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

