
import './App.css';
import { Route,BrowserRouter as Router,Link,Routes } from 'react-router-dom'
import Navbar from './components/navbar.js'
import About from './components/about.js'
import Home from './components/home.js'
import NoteContext from './context/notes/notecontext.js';
import NoteState from './context/notes/notestate.js';
 

function App() {
  return (
    <>
    <NoteState>


    <Router>
    <Navbar/> 
    <div className="container">


    <Routes>

    <Route exact path="/About" element={<About/>}/>
    <Route exact path="/Home" element={<Home/>}/>


    </Routes>
    </div>


    </Router>


    </NoteState>
    </>
  );
}

export default App;
