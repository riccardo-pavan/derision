import React from 'react'

export default function Welcome(props) {

  const { name, setName, handleCreateAccount } = props


  return (
    <section id="welcome">
      <h3 className="text-large special-shadow">
        365 days. <br/> 1000 words.
      </h3>
      <h6>
        Build your lexicon. 
        <br/> 
        Start the challenge today!
      </h6>
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        type="text" 
        placeholder="Enter your name..." 
      />
      <button disabled={!name} onClick={handleCreateAccount}>
        <h6>Start &rarr;</h6>
      </button>
    </section>
  )
}
