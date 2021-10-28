import './Conversations.css';
import Card from "react-bootstrap/Card"

function Conversations() {
    return (
        <div className='conversations'>
            <h1> Conversations </h1>
            <Card className='card'>
                <div>
                    <h2>Title 1</h2>
                    <h3>Participant 1 vs Participant 2</h3>
                </div>
            </Card>
            <Card className='card'>
                <div>
                    <h2>Title 2</h2>
                    <h3>Participant 3 vs Participant 4</h3>
                </div>
            </Card>
        </div>
    )
}

export default Conversations;