import {  BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from '../layout/Layout'


export const RouterPaths = () => {
  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout/>}/>
    
                
            </Routes>
        </BrowserRouter>
    </>
  )
}
