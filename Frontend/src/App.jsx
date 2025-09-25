import { ToastContainer } from 'react-toastify'
import './App.css'
import { Footer } from './Components/Footer/footer'
import { Header } from './Components/Header/header'
import { Main } from './Components/Main/main'

function App() {
  return (
    <>
      <ToastContainer />
      <Header />
      <Main />
      <Footer />
    </>
  )
}
export let baseUrl = "http://localhost:8888";
export default App
