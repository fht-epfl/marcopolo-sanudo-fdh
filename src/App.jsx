import React from 'react'
import Hero from './components/Hero'
import NavBar from "./components/NavBar";
import Footer from "./components/Footer.jsx";
import DynamicBook from "./components/DynamicBook.jsx";


const App = () => {
    return (
        <main className="relative min-h-screen w-screen overflow-x-hidden">
            <NavBar/>
            <Hero/>
            <DynamicBook/>
            <Footer/>
        </main>

    )
}
export default App
