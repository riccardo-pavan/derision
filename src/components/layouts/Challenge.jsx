import ProgressBar from "../ProgressBar"

export default function Challenge({}) {

    const word = 'derision'
    const definition = 'In excellent order'

    return(
        <section id='challenge'>
            <h1>{word}</h1>
            <p>{definition}</p>
            <div className="helper">
                <div>
                    {/* CONTAINS ALL THE ERROR CORRECTION VISUAL BARS */}
                    {[...Array(definition.length).keys()].map((element, index) => (
                        <div key={index}>
                            a
                        </div>
                    ))}
                </div>
                <input 
                type='text' 
                placeholder='Enter the definition...'
                />
            </div>

            <div className="challenge-btns">
                <button className="card-button-secondary">
                    <h6>Quit</h6>
                </button>
                <button className='card-button-primary'>
                    <h6>I forgot</h6>
                </button>
            </div>
            <ProgressBar />
        </section>
        
    )
}