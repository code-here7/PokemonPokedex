import './App.css'
import { Routes,Route } from 'react-router-dom'
import Home from './components/Home'
import AddPoke from './components/AddPoke'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
<>
 <Routes>
  <Route path='/' element={<Home />}/>
  <Route path='/add' element={<AddPoke />}/>
  <Route path="/add/:id" element={<AddPoke />} /> 
 </Routes>
  <ToastContainer position="top-right" autoClose={1000} />
</>
  )
}

export default App
