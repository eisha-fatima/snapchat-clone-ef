import React, { useEffect } from 'react'
import './App.css'
import WebcamCapture from './Components/WebcamCapture/WebcamCapture'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Preview from './Components/Preview/Preview'
import Chats from './Components/Chats/Chats'
import ChatsView from './Components/ChatsView/ChatsView'
import Login from './Login'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout, selectUser } from './features/appSlice'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'

const App = () => {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        dispatch(login({
          username:authUser.displayName,
          profilePic:authUser.photoURL,
          id:authUser.uid
        }))
      } else {
        dispatch(logout())
      }
    })
  }, []);

  return (
    <BrowserRouter>
    <div className='app'>
      {user ? (
        <>
        <img className='app__logo' src="https://scx2.b-cdn.net/gfx/news/2017/1-snapchat.jpg" alt="" />
        <div className='app__body'>
          <div className="app_bodyBackground">
            <Routes>
              <Route exact path='/' element={<WebcamCapture/>}/>
              <Route exact path='/preview' element={<Preview/>}/>
              <Route exact path='/chats' element={<Chats/>} />
              <Route exact path='/chats/view' element={<ChatsView/>}/>
            </Routes>
          </div>
      </div>
      </>  
      ):(
        <Login/>
      )}
      
    </div>
    </BrowserRouter>
  )
}

export default App