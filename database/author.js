const mongoose = require("mongoose");

// Author schema

const AutorSchema = mongoose.Schema({
    id: Number,
        name: String,
        books: String,
})

// Auhor Model

const AuthorModel = mongoose.model(AuthorSchema);

module.exports = AuthorModel;
