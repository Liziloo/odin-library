const myLibrary = [];

function Book(title, author, pageCount, read) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.read = read;
    this.info = function() {
        let readString;
        if (read === true) {
            readString = 'already read'
        } else {
            readString = 'not read yet'
        }
        return `${title} by ${author}, ${pageCount} pages, ${readString}`;
    }
}

function addBookToLibrary(title, author, pageCount, read) {
    newBook = new Book(title, author, pageCount, read);
    myLibrary.push(newBook);
}
