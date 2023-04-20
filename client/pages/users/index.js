import Users from "../matt_components/Users";

export default function App({users, handleUserDelete}){
    return <Users users = {users} onUserDelete={handleUserDelete}></Users>
}