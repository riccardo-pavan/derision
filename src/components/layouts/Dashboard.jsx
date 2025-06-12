import React from 'react'
import Stats from '../Stats'
import CountDown from '../Countdown'
import History from '../History'


export default function Dashboard(props) {

  return (
    <section id="dashboard">
      <Stats {...props} />
      <CountDown {...props} />
      <History {...props} />
    </section>
  )
}
