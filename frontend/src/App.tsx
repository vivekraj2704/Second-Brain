import './index.css'
import { Button } from './components/ui/Button'
import { Plusicon } from './icons/Plusicon'
import { Shareicon } from './icons/Shareicon'

function App() {

  return (
    <>
      <Button startIcon={<Plusicon svgsize="md"/>} text="Add new Item mid" variant='primary' size='sm' onClick={() => console.log('ok')}/>
      <Button startIcon={<Shareicon svgsize="md"/>} text="Add new Item mid" variant='primary' size='md' onClick={() => console.log('ok')}/>
      <Button startIcon={<Shareicon svgsize="md"/>} text="Add new Item mid" variant='primary' size='lg' onClick={() => console.log('ok')}/>
      <Button startIcon={<Shareicon svgsize='sm'/>} text="Add new Item small" variant='primary' size='sm' onClick={() => console.log('ok')}/>
      <Button startIcon={<Shareicon svgsize='sm'/>} text="Add new Item small" variant='primary' size='md' onClick={() => console.log('ok')}/>
      <Button startIcon={<Shareicon svgsize='sm'/>} text="Add new Item small" variant='primary' size='lg' onClick={() => console.log('ok')}/>
      <Button startIcon={<Shareicon svgsize='lg'/>} text="Add new Item large" variant='primary' size='sm' onClick={() => console.log('ok')}/>
      <Button startIcon={<Shareicon svgsize='lg'/>} text="Add new Item large" variant='primary' size='md' onClick={() => console.log('ok')}/>
      <Button startIcon={<Shareicon svgsize='lg'/>} text="Add new Item large" variant='primary' size='lg' onClick={() => console.log('ok')}/>
    </>
  )
}

export default App
