import React from "react";
import UserCard from "./UserCard"
import { Card } from "semantic-ui-react"

function Users({users, onUserDelete}) {

    const sortedUsers = [...users].sort((user1, user2) => {
            return user1.username.localeCompare(user2.username)
    })   

    return (
        <section id="users">
            <h3 className="header">Users</h3>
            <div className="user-list">
                <Card.Group className="cards" itemsPerRow={6}>
                    {sortedUsers.map((user)=> (
                    <UserCard key={user.id} user={user} onUserDelete={onUserDelete}/>
                    ))}
                </Card.Group>
            </div>
        </section>
    )
}

export default Users

{/* <div className="item-list">
<Card.Group className="cards" itemsPerRow={6}>
    {displayedItems.map((item)=> (
    <ItemItem key={item.id} item={item} />
    ))}
</Card.Group>
</div> */}