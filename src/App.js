import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { collection, addDoc, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from "./firebase";
import BookForm from "./components/BookForm";
import BookCard from "./components/BooksCard";

function App() {
  const [showAddBookForm, setShowAddBookForm] = useState(false);
  const [books, setBooks] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [bookForm, setBookForm] = useState({
    author: '',
    title: '',
    pages: 0,
    isRead: false,
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true);
        const bookUnsubscribe = onSnapshot(
          query(collection(db, "books"), where("uid", "==", user.uid)), 
          (snapshot) => {
            const booksData = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setBooks(booksData);
          },
          (error) => {
            console.error("Error fetching books: ", error);
          }
        );
  
        return () => {
          bookUnsubscribe();
        }
      } else {
        setIsLoggedIn(false);
        setBooks([]);
      }
    });

    return unsubscribe;
  }, []);
   

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (user) {
      const userBook = {
        ...bookForm,
        uid: user.uid,
      };
      try {
        await addDoc(collection(db, "books"), userBook);
        setBookForm({
          author:'',
          title:'',
          pages: 0,
          isRead: false,
        });
        setShowAddBookForm(false);
      } catch(error) {
          console.error(error.message);
      }
    }
  };

  const handleAddBookClick = () => {
    if (!isLoggedIn) {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 5000); // Hide warning after 2 seconds
    } else {
      setShowAddBookForm(true);
    }
  };
  return (
    <>
      <div className="w-screen h-screen">
          <Navbar />
          <div className="h-1/8 container mx-auto flex place-content-center items-center mb-2">
            <button onClick={handleAddBookClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-10 mt-14">
              + Add book
            </button>
          </div>
          {showWarning && <div className="flex place-content-center mb-18 text-red-500 italic fadeout">/!\ Log before adding book</div>}
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-6 container mx-auto">
            {books.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
      </div>
      
      {showAddBookForm &&
        <>
          <BookForm handleSubmit={handleSubmit} bookForm={bookForm} setBookForm={setBookForm} />
          <div onClick={() => setShowAddBookForm(false)} className="overlay fixed top-0 left-0 h-full w-full bg-gray-500 opacity-50">
          </div>
        </>
      }
    </>
  )
}

export default App;
