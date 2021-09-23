// Frame work
const express = require("express");

// Database
const database = require("./database/index");

// Initializing Express
const AKAhirwar = express();

// configuration
AKAhirwar.use(express.json());

/* Route
Description -> To get all Book
Access      -> PUBLIC
Parameter   -> NONE
Method      -> GET
*/

AKAhirwar.get("/", (req, res) => {
    return res.json({ books: database.books });
})

// API to get a specific book through ISBN number from any number of total book

/* Route    -> is
Description -> To get Specific Book based on ISBN
Access      -> PUBLIC
Parameter   -> ISBN
Method      -> GET
*/
AKAhirwar.get("/is/:isbn", (req, res) => {
    const getSpecificBook = database.books.filter
        ((book) =>
            book.ISBN === (req.params.isbn)
        );

    // to show error if the book doesn't match the database
    if (getSpecificBook.length === 0) {
        return res.json({
            error: 'No book found for the ISBN of $(req.params.isbn)'
        });
    }

    return res.json({ book: getSpecificBook });
});

/* Route    -> /c    -> category
Description -> To get Specific Books based on category
Access      -> PUBLIC
Parameter   -> CATEGORY
Method      -> GET
*/

AKAhirwar.get("/c/:category", (req, res) => {
    const getSpecificBooks = database.books.filter
        ((book) =>
            book.category.includes(req.params.category)
        );

    // to show error if the book doesn't match the database
    if (getSpecificBooks.length === 0) {
        return res.json({
            error: 'No book found for the ISBN of $(req.params.category)'
        });
    }
    return res.json({ book: getSpecificBooks });
});





/* Route    -> /author
Description -> To get all authors   
Access      -> PUBLIC
Parameter   -> NONE
Method      -> GET
*/

AKAhirwar.get("/author", (req, res) => {
    return res.json({ authors: database.authors });
});


/*
Route           /author
Description     get a list of author based on a book's ISBN
Access          PUBLIC
Parameters      isbn
Method          GET
*/

AKAhirwar.get("/author/:isbn", (req, res) => {
    const getSpecificAuthors = database.authors.filter((author) => author.books.includes(req.params.isbn)
    );

    if (getSpecificAuthors.length === 0) {
        return res.json({
            error: 'no author found for the book ${req.params.isbn}',
        });
    }
    return res.json({ author: getSpecificAuthors });
});

/*
Route           /publications
Description     get all publications
Access          PUBLIC
Parameters      isbn
Method          GET
*/

AKAhirwar.get("/publications", (req, res) => {
    return res.json({ publications: database.publications });
});


/*
Route           /book/new
Description     add new book
Access          PUBLIC
Parameters      NONE
Method          POST
*/

AKAhirwar.post("/book/new", (req, res) => {
    const { newBook } = req.body;
    database.books.push(newBook);

    return res.json({ books: database.books, message: " books was added!!" })
});


/*
Route           /author/new
Description     add new author
Access          PUBLIC
Parameters      NONE
Method          POST
*/

AKAhirwar.post("/author/new", (req, res) => {
    const { newAuthor } = req.body;
    database.authors.push(newAuthor);

    return res.json({ authors: database.authors, message: " Auhtors was added!!" })
});


/*
Route           /publication/new
Description     add new publication
Access          PUBLIC
Parameters      NONE
Method          POST
*/




AKAhirwar.post("/publication/new", (req, res) => {
    const { newPublication } = req.body;
    database.publications.push(newPublication);

    return res.json({ publications: database.publications, message: " Publications were added!!" })
});



/*
Route           /book/update
Description     update title of a book
Access          PUBLIC
Parameters      title
Method          PUT
*/


AKAhirwar.put("/book/update/:isbn", (req, res) => {
    database.books.forEach((book) => {
        if (book.ISBN === req.params.isbn) {
            book.Title = req.body.bookTitle;
            return;
        }
    });

    return res.json({ books: database.books })
});


/*
Route           /book/author/update/:isbn
Description     update/add new author
Access          PUBLIC
Parameters      isbn
Method          PUT
*/


AKAhirwar.put("/book/author/update/:isbn", (req, res) => {
    // update the book database

    database.books.forEach((book) => {
        if (book.ISBN === req.params.isbn)
            return book.authors.push(req.body.newAuthor)
    });

    // update the author database

    database.books.forEach((author) => {
        if (author.id === req.body.newAuthor)
            return author.books.push(req.params.isbn);
    })

    return res.json({ books: database.books, authors: database.authors, message: "New author was added!!!" })
});


/*
Route           /publication/update/book
Description     update/add new author
Access          PUBLIC
Parameters      isbn
Method          PUT
*/

AKAhirwar.put("/publication/update/book/:isbn", (req, res) => {
    // update the publication database
    database.publications.forEach((publication) => {
        if (publication.id === req.body.pubId) {
            return publication.books.push(req.params.isbn);
        }
    });

    // update the book database
    database.books.forEach((book) => {
        if (book.ISBN === req.params.isbn) {
            book.publication = req.body.pubId;
            return;
        }
    });
    return res.json({
        books: database.books,
        publications: database.publications,
        message: "successfully updated publication",
    });
});

AKAhirwar.listen(3000, () => console.log(
    "yehhh!!!    server is running!!!😎👌"
))                              