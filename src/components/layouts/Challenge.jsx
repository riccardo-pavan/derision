import { useRef, useState } from "react"
import ProgressBar from "../ProgressBar"
import { isEncountered, replaceHalfWithUnderscores, shuffle } from "../../utils"
import DEFINITIONS from '../../utils/VOCAB.json'



export default function Challenge(props) {

    const { day, daysWords, handleChangePage, handleIncrementAttempts, handleCompleteDay, PLAN } = props

    const [wordIndex, setWordIndex] = useState(0)
    const [inputValue, setInputValue] = useState('')
    const [showDefinition, setShowDefinition] = useState(false)
    const [partialDefinition, setPartialDefinition] = useState('')

    const [listToLearn, setListToLearn] = useState([
        ...daysWords,
        ...shuffle(daysWords),
        ...shuffle(daysWords),
        ...shuffle(daysWords),
    ])

    const word = listToLearn[wordIndex] || 'Word not found'

    //show definition if the word is new or if the user has clicked to show it
    // A word is considered new if it has not been encountered yet in the current day
    const isNewWord = showDefinition || 
        (!isEncountered((day, word)) 
        && wordIndex < daysWords.length)
    const definition = DEFINITIONS[word] || 'Definition not found'

    const giveUp = () => {
        setListToLearn([...listToLearn, word])
        setPartialDefinition('')
        setShowDefinition(true)
    }

    const getHelp = () => {
        setPartialDefinition(replaceHalfWithUnderscores(DEFINITIONS[word]) || 'Definition not found')
    }

    
    return(
        <section id='challenge'>
            <h1>{word}</h1>
            {isNewWord && (<p>{definition}</p>)}
            {(!isNewWord && partialDefinition) && (<p>{partialDefinition}</p>)}
            <div className="helper">
                <div>
                    {/* CONTAINS ALL THE ERROR CORRECTION VISUAL BARS */}
                    {[...Array(definition.length).keys()]
                    .map((char, index) => {
                        /* Let's determine whether or not the user
                            has typed the character they think is correct and show red or blue
                            depending on whether or not it's actually correct*/

                        const styleToApply = inputValue.length < char + 1 ? '' : 
                            inputValue.split('')[index].toLowerCase() === definition.split('')[index].toLowerCase() 
                            ? 'correct' : 'incorrect'

                        return(
                        <div className={`${styleToApply}`} key={index}>
                            
                        </div>
                    )})}
                </div>
                <input 
                type='text' 
                value={inputValue}
                onChange={(e) => {
                    //If the user has typed the correct word, we move to the next word
                    if(e.target.value.length >= definition.length) {                            
                        //compare words
                        handleIncrementAttempts()

                        if (e.target.value.toLowerCase() === definition.toLowerCase()) {
                            //then the user has the correct outcome
                            if (wordIndex + 1 >= listToLearn.length) {
                                return handleCompleteDay()
                            }
                            setWordIndex(wordIndex + 1)
                            setShowDefinition(false)
                            setPartialDefinition('')
                            setInputValue('')
                            return
                        }
                    } else {
                        //if the user has not typed the correct word, we update the input value
                        setInputValue(e.target.value)
                    }
                }}

                placeholder='Enter the definition...'
                />
            </div>

            <div className="challenge-btns">
                <button 
                    onClick={() => {
                        handleChangePage(1)
                    }} 
                    className="card-button-secondary"
                >
                    <h6>Quit</h6>
                </button>
                <button 
                    disabled={showDefinition || partialDefinition}
                    onClick={getHelp} 
                    className="card-button-tertiary"
                >
                    <h6>Help</h6>
                </button>
                <button 
                disabled={showDefinition}
                onClick={giveUp} 
                className='card-button-primary'
                >
                    <h6>I forgot</h6>
                </button>
            </div>
            <ProgressBar 
            text={`${wordIndex} / ${listToLearn.length}`} 
            remainder={wordIndex * 100 / listToLearn.length} 
            />
        </section>
        
    )
}