import React, {useState, useEffect} from "react";
import TransactionReceipt from "./TransactionReceipt"
import { Card } from "semantic-ui-react"

function Transactions({currentUser}) {

    // gather my Transaction Data
    const [transactions, setTransactions] = useState([]) 
    useEffect(() => {
        fetch("/transactions")
            .then(r => r.json())
            .then(data => {
                setTransactions(data)
                console.log(data)
            })
    }, [])

    const trans = transactions.filter(transaction => transaction.user_id === currentUser.id)
    console.log(trans)

    return (
        <section id="transactions">
            <h3 className="header">Transactions</h3>
            <div className="transaction-list">
                <Card.Group className="cards" itemsPerRow={6}>
                    {trans.map((transaction)=> (
                    <TransactionReceipt key={transaction.id} transaction={transaction}/>
                    ))}
                </Card.Group>
            </div>
        </section>
    )
}

export default Transactions