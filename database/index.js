let books = [
    {
        ISBN: "12345ONE",
        title: "getting started with MERN",
        authors: [1, 2],
        language: "en",
        pubDate: "2021-07-07",
        numOfPage: 225,
        category: ["fiction", "programming", "tech", "web-dev"],
        publication: 1,
    },

    {
        ISBN: "12345TWO",
        title: "getting started with Python",
        authors: [1, 2],
        language: "en",
        pubDate: "2021-07-07",
        numOfPage: 225,
        category: ["fiction", "programming", "tech", "web-dev"],
        publication: 1,
    }
];

const authors = [
    {
        id: 1,
        name: "Ankit",
        books: ["12345ONE", "12345TWO"],

    },

    {
        id: 2,
        name: "Suresh",
        books: ["12345ONE"],

    }
];

const publications = [
    {
        id: 1,
        name: "Chakra",
        books: ["12345ONE"],
    }
];

module.exports = { books, authors, publications }

