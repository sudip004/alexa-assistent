
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import UserContext from './context/UserContext.jsx'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import CodeReview from './components/CodeReview.jsx'


createRoot(document.getElementById('root')).render(
  <UserContext>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>}/>
      <Route path='/code-review' element={<CodeReview/>}/>
    </Routes>
    </BrowserRouter>
  </UserContext>
  
)
