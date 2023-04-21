import React from "react";

function TransactionReceipt({transaction}) {
        const {id, item, user, created_at} = transaction
    
        return (
            <div className="transaction-item">
                <p>Transaction ID:  _  #{id}</p>
                <p>Date of Purchase:</p>
                <p>{created_at}</p>
                <p>Item: {item.name}</p>
                <p>Buyer: {user.username}</p>
                <p>Price: ${item.price} Nuts</p>
            </div>
        );
    }

export default TransactionReceipt;