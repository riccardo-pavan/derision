import React from 'react'

export default function ProgressBar(props) {

  const { text, remainder } = props

  const arr = Array(10).fill(1)

  return (
    <div className="level">
      <div>
        <h4>{text}</h4>
      </div>

      {arr.map((element , index) => (
        <div key={index} className='level-bar'>
          {element}
        </div>
      ))}

      {/*use style directly when you have dynamic style*/}
      <div className='xp' style={{ width: `${remainder}%`}} ></div>
      
    </div>
  )
}
