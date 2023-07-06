import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function BookCard ( { book }) {
    const handleReadToggle = async () => {
        try {
            const bookRef = doc(db, "books", book.id);
            await updateDoc(bookRef, { isRead: !book.isRead });
        } catch(error) {
            console.error(error.message);
        }
    };

    const handleRemoveBtn = async () => {
        try {
            const bookRef = doc(db, "books", book.id);
            await deleteDoc(bookRef);
        } catch(error) {
            console.error(error.message);
        }
    }

    return (
        <div className="max-w-sm p-6 flex flex-col items-start bg-white border border-gray-200 rounded-lg shadow mt-12">
            <p className="mb-3 font-normal text-gray-700 break-words"><span className="font-bold">Author:</span> {book.author}</p>
            <p className="mb-3 font-normal text-gray-700"><span className="font-bold">Title:</span> {book.title}</p>
            <p className="mb-3 font-normal text-gray-700"><span className="font-bold">Pages:</span> {book.pages}</p>
            {book.isRead ? (
                <button onClick={handleReadToggle} className="w-full bg-green-400 hover:bg-green-500 rounded-lg px-6 py-1.5 mt-2">Read</button> 
            ) : (
                <button onClick={handleReadToggle} className="w-full bg-red-400 hover:bg-red-500 rounded-lg px-6 py-1.5 mt-2">Not read yet</button>
            )}
            <button onClick={handleRemoveBtn} className="w-full bg-gray-400 hover:bg-gray-500 rounded-lg px-6 py-1.5 mt-2">Remove</button>
        </div>
    )
}