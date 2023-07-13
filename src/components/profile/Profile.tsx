import { useAuth0 } from "@auth0/auth0-react";

export const Profile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return (
        isAuthenticated && (
            <div>
                <img src={user?.picture} alt={user?.name} />
                <h2>{user?.name}</h2>
                <h2>{user?.address}</h2>
                <h2>{user?.birthdate}</h2>
                <h2>{user?.gender}</h2>
                <h2>{user?.nickname}</h2>
                <h2>{user?.phone_number}</h2>
                <p>{user?.email}</p>
            </div>
        )
    );
};