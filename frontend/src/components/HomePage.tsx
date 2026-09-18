import authAxios from "../axios/authAxios";
import { useEffect, useState } from "react";
import type { AppView } from "./AppMain";
export default function HomePage({ setAppView }: { setAppView: (view: AppView, creatorId?: string) => void }) {
    const [allUsers, setAllUsers] = useState<any[]>([]); // to store all users fetched from the backend
    useEffect(() => {
        authAxios.get('/allUsers')
            .then(response => {
                setAllUsers(response.data); // Assuming the response data is an array of users
            }
            )
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []); // Fetch users on component mount only
    return (
        <div className="home-page">
            <h1>Welcome to Konevo</h1>
            <p>Your platform for connecting with creators and exploring content.</p>
            <h2>All Users</h2>
            <ul>
                {allUsers.map(user => (
                    <li onClick={() => setAppView("profile", user.id)} key={user.id}>{user.user_display_name}</li>
                ))}
            </ul>
        </div>
    );
}