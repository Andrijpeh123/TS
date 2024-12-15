import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Main from './components/Main';
import Login from './components/Login';
import Dog from './components/Dog';
import AddDog from './components/CreateDog'; 

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path="/:dogId" element={<Dog/>}></Route>
          <Route path="/add-dog" element={<AddDog />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;