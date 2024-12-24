
import './App.css'
import { Route , Routes , BrowserRouter } from 'react-router-dom'
import  Sender  from './componants/Sender'
import  Receiver  from './componants/Receiver'

function App() 
{
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/sender" element={<Sender></Sender>}></Route>
        <Route path="/receiver" element={<Receiver></Receiver>}></Route>
      </Routes>
    </BrowserRouter>
  )
  
}

export default App
