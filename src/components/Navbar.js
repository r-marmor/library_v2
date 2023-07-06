import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useState } from "react";

export default function Navbar () {
    const [user, setUser] = useState(null);

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            console.log(result);
            setUser(result.user);
        } catch(error) {
            console.log(error.message);
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="h-16 bg-slate-400 flex justify-evenly items-center font-bold">
            <h1 className="text-3xl">Library</h1>
            <div className="flex gap-4 items-center italic">
                {user && <span className="text-black font-bold"> logged as : {user.displayName}</span>}
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={user ? logout : signInWithGoogle}
                >
                    {user ? "Log out" : "Log in"}
                </button>
            </div>
            
        </div>
    );
}
