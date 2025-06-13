import Challenge from "./components/layouts/Challenge"
import Dashboard from "./components/layouts/Dashboard"
import Layout from "./components/layouts/Layout"
import Welcome from "./components/layouts/Welcome"
import React, { useState, useEffect } from 'react'

import WORDS from './utils/VOCAB.json'
import { getWordByIndex, PLAN } from "./utils"


function App() {

  const [page, setPage] = useState(0) // 0 for welcome, 1 for dashboard, 2 for challenge
  const [name, setName] = useState('')
  const [day, setDay] = useState(1)
  const [datetime, setDatetime] = useState(null)
  const [history, setHistory] = useState([])
  const [attempts, setAttempts] = useState([])

  const daysWords = PLAN[day].map((idx) => (
    //this return an object containing word and definition and we access the word
    getWordByIndex(WORDS, idx).word
  ))



  useEffect(() => {
    if(localStorage.getItem('username')){
      handleChangePage(1)
      setName(localStorage.getItem('username'))
    } else {
      handleChangePage(0)
    }
  }, [])

  const handleChangePage = (index) => {
    setPage(index)
  }

  const handleCreateAccount = () => {
    if(!name) return
    localStorage.setItem('username', name)
    handleChangePage(1)
  }

  const handleCompleteDay = () => {
    const newDay = day + 1
    const newDateTime = Date.now()
    setDay(newDay)
    setDatetime(newDateTime)
    localStorage.setItem(
      'day', 
      JSON.stringify({ 
        day: newDay, 
        datetime: newDateTime 
      }))
    setPage(1)
  }

  const handleIncrementAttempts = () => {
    //take the current attempts and add 1 to it saving to localStorage
    const newRecord = attempts + 1
    localStorage.setItem('attempts', newRecord)
    setAttempts(newRecord)  
  } 
  
  const pages = {
    0: <Welcome 
        handleCreateAccount={handleCreateAccount} 
        name={name} 
        setName={setName} 
      />,
    1: <Dashboard 
          name={name}   
          day={day}    
          attempts={attempts}
          history={history}
          plan={PLAN}
          datetime={datetime}
          daysWords={daysWords}
          handleChangePage={handleChangePage}
        />,
    2: <Challenge
          day={day}
          daysWords={daysWords}
          handleChangePage={handleChangePage}          
          handleIncrementAttempts={handleIncrementAttempts}
          handleCompleteDay={handleCompleteDay}
          plan={PLAN}
        />,   
  }

  return (
    <Layout sample={{ a: 2 }}>
      {pages[page]}
    </Layout>
  )

}

export default App
