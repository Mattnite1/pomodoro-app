import { getAllUsers } from "@/components/getAllUsers";

export default async function Users() {
    const users = await getAllUsers()
    
    return (
        <div>
            {users.map(user => (
                <li>
                    <ul>{user.email}</ul>
                    <ul>{user.username}</ul>
                </li>
            ))}
        </div>
    )
}