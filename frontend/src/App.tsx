import './index.css'
import { Button } from './components/ui/Button'
import { Shareicon } from './icons/Shareicon'
import { Card } from './components/ui/Card'

function App() {

  return (
    <div className='p-4'>
      <div className='flex justify-end gap-2'>
        <Button startIcon={<Shareicon svgsize="md"/>} text="Add new Item mid" variant='primary' size='md' onClick={() => console.log('ok')}/>
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
