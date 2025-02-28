import './App.css'
import { Button } from './components/ui/Button'

function App() {

  return (
    <>
      <Button text="Add new Item" variant='secondary' size='md' onClick={() => console.log('ok')}/>
      <Button text="Add new Item" variant='primary' size='md' onClick={() => console.log('ok')}/>
    </>
  )
}

export default App
