export default function History (props) {

    const { history } = props
    const historyKeys = Object.keys(history)

    return(
        <div>
        {/* Contains the logic for the countdown */}
            <div className="card history-card">
                <h4>History</h4>
                { historyKeys.length == 0 ? (
                    <p>
                        You have no attemps! Press <b>Start</b> to begin 
                    </p>
                ) : (
                    <div className="history-list">
                        {historyKeys.map((item, index) => {
                            const dateKey = (new Date(item)).toString().split(' ').slice(1,4).join(' ')
                            return(
                                <div key={index} className="card-button-secondary">
                                    <div>
                                        <p>Started</p>
                                        <h6>{dateKey}</h6>
                                    </div>
                                
                                    <div>
                                        <p>Streak</p>
                                        <h3>{history[item]}</h3>
                                    </div>
                                </div>      
                            )})}
                    </div>
                )}
            </div>
        </div>
    )
}