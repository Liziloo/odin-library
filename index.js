const myLibrary = [];
const container = document.querySelector('#container');

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
    const newBook = new Book(title, author, pageCount, read);
    myLibrary.push(newBook);
}

addBookToLibrary('Lord of the Rings', 'J.R.R. Tolkien', 1150, true);
addBookToLibrary('Pride and Prejudice', 'Jane Austen', 448, true);
addBookToLibrary('Things You Save in a Fire', 'Katherine Center', 320, true);
addBookToLibrary('The Sparrow', 'Mary Doria Russell', 528, true);
addBookToLibrary('The Art of the Deal', 'Donald Trump', 372, false);
addBookToLibrary('Arrows of the Queen', 'Mercedes Lackey', 320, true);

function displayBooks() {

    myLibrary.forEach((book) => {

        const newCard = document.createElement('div');
        newCard.classList.add('book-card');
        newCard.setAttribute('data-read', book.read);

        const newTitleDiv = document.createElement('div');
        newTitleDiv.classList.add('book-title-div');

        const newTitle = document.createElement('div');
        newTitle.classList.add('book-title')
        newTitle.innerHTML = book.title;

        const newPageCount = document.createElement('div');
        newPageCount.classList.add('book-page-count');
        newPageCount.innerHTML = book.pageCount;

        newTitleDiv.append(newTitle, newPageCount);
        newCard.appendChild(newTitleDiv);

        const newAuthor = document.createElement('div');
        newAuthor.classList.add('book-author');
        newAuthor.innerHTML = book.author;
        newCard.appendChild(newAuthor);

        container.appendChild(newCard);
    })
}

const dialog = document.querySelector('dialog');
const addBookButton = document.querySelector('#add-book-button');
const closeButton = document.querySelector('.modal-close');


const saveButton = document.querySelector('.save');
const bookForm = document.querySelector('form');
saveButton.addEventListener('click', (event) => {
    event.preventDefault();
    const formData = new FormData(bookForm);
    const title = formData.get('title');
    const author = formData.get('author');
    const pageCount = formData.get('page-count');
    const read = formData.get('read-status');
    let readBool = null;
    if (read === 'read') {
        readBool = true;
    } else {
        readBool = false;
    }
    addBookToLibrary(title, author, pageCount, read);
    container.innerHTML = '';
    dialog.close();
    displayBooks();
})


addBookButton.addEventListener('click', () => {
    dialog.showModal();
});

closeButton.addEventListener('click', () => {
    dialog.close();
});

displayBooks();