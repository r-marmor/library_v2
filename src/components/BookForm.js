export default function BookForm( { handleSubmit, bookForm, setBookForm } ) {
    return (
        <>
            <div onClick={(e) => e.stopPropagation()} className="add-book-form-container z-10 fixed w-1/5 top-1/4 left-1/3">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                    <h3 className="mb-4 font-bold text-2xl text-center">Add new book</h3>
                    <div className="mb-4 flex-column">
                        <input className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            id="author" 
                            type="text"
                            value={bookForm.author} 
                            placeholder="Author" 
                            onChange={e => setBookForm({ ...bookForm, author: e.target.value})}
                        />
                        <input className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            id="title" 
                            type="text"
                            value={bookForm.title} 
                            placeholder="Title" 
                            onChange={e => setBookForm({ ...bookForm, title: e.target.value})}              
                        />
                        <input className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            id="pages" 
                            type="number"
                            value={bookForm.pages} 
                            placeholder="Pages"
                            onChange={e => setBookForm({ ...bookForm, pages: e.target.value})}
                        />
                        <div className=" font-bold flex gap-3 justify-center">
                            <label>Have you read it?</label>
                            <input type="checkbox" 
                                    id="isRead"
                                    checked={bookForm.isRead}
                                    onChange={e => setBookForm({ ...bookForm, isRead: e.target.checked})}
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}