import { useState } from 'react'
import Calculator from './components/Calculator'
import './App.css'

function App() {
  return (
    <div className="app">
      <div className="container">
        <h1 className="title">Калькулятор</h1>
        <Calculator />
        <footer className="footer">
          <p>Создано с ❤️ | Современный веб-калькулятор</p>
        </footer>
      </div>
    </div>
  )
}

export default App