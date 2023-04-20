import React from "react";
import UserCard from "./UserCard"

function Users({users, handleUserDelete}) {

    const sortedUsers = [...users].sort((user1, user2) => {
        return user1.username.localeCompare(user2.username)
})   

    return (
    <section id="users">
        <h3 className="header">Users</h3>
        {sortedUsers.map((user)=> (
        <UserCard key={user.id} user={user} onUserDelete={handleUserDelete}/>
    ))}
    </section>
)
}

export default Users