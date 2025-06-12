import Challenge from "./components/layouts/Challenge"
import Dashboard from "./components/layouts/Dashboard"
import Layout from "./components/layouts/Layout"
import Welcome from "./components/layouts/Welcome"
import React, { useEffect } from 'react'

import WORDS from './utils/VOCAB.json'
import { getWordByIndex, PLAN } from "./utils"


function App() {

  const [page, setPage] = React.useState(0) // 0 for welcome, 1 for dashboard, 2 for challenge
  const [name, setName] = React.useState('')
  const [day, setDay] = React.useState(1)
  const [datetime, setDatetime] = React.useState(null)
  const [history, setHistory] = React.useState([])
  const [attempts, setAttempts] = React.useState([])

  const daysWords = PLAN[day].map((idx) => (
    //this return an object containing word and definition and we access the word
    getWordByIndex(WORDS, idx).word
  ))



  useEffect(() => {
    console.log(localStorage.getItem('username'))
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
    2: <Challenge/>,
  }

  return (
    <Layout sample={{ a: 2 }}>
      {pages[page]}
    </Layout>
  )

}

export default App
