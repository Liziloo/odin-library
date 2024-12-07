const myLibrary = [];
const container = document.querySelector('#container');

function Book(title, author, pageCount = '', read, thoughts = '') {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.read = read;
    this.thoughts = thoughts;
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

function addBookToLibrary(title, author, pageCount, read, thoughts) {
    const newBook = new Book(title, author, pageCount, read, thoughts);
    myLibrary.push(newBook);
}

addBookToLibrary('Lord of the Rings', 'J.R.R. Tolkien', 1150, true, "The only book I've ever re-read yearly");
addBookToLibrary('Pride and Prejudice', 'Jane Austen', 448, true, "I like it enough to have read more times htan I can recall. It's a comfort read for me. My favorite adaptation is the BBC miniseries.");
addBookToLibrary('Things You Save in a Fire', 'Katherine Center', 320, true, "One of the first 'chick-lit'/romance books I read. Made me fall in love with the author's works. Although I can't stand the film adaptation of 'Happiness for Beginners'. It's atrocious.");
addBookToLibrary('The Sparrow', 'Mary Doria Russell', 528, true, "This is a strange one. Sci-fi, very introspective. Very odd premise. I very much liked it, though I have trouble articulating why. It's very well written.");
addBookToLibrary('Twilight', 'Stephenie Meyer', 372, false, 'Just no.');
addBookToLibrary('Arrows of the Queen', 'Mercedes Lackey', 320, true);

function displayBooks() {
    container.innerHTML = ''
    myLibrary.map((book, index) => {
        const newCard = document.createElement('div');
        newCard.classList.add('book-card');
        newCard.id = `book-${index}`;
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

        const newAuthor = document.createElement('div');
        newAuthor.classList.add('book-author');
        newAuthor.innerHTML = book.author;

        const newThoughts = document.createElement('div');
        newThoughts.classList.add('thoughts');
        newThoughts.innerHTML = book.thoughts;

        const newFooter = document.createElement('div');
        newFooter.classList.add('card-footer');
        const markReadButton = document.createElement('button');
        markReadButton.classList.add('mark-read');
        if (book.read) {
            markReadButton.innerHTML = 'Mark as Unread';
        } else {
            markReadButton.innerHTML = 'Mark as Read';
        }
        

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.setAttribute('data-array-index', index);
        deleteButton.innerHTML = 'Delete from Library';
        deleteButton.addEventListener('click', () => {deleteBook(index)});

        newFooter.append(markReadButton, deleteButton);
        newCard.append(newTitleDiv, newAuthor, newThoughts, newFooter);

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

function deleteBook(index) {
    console.log(index);
    console.log(myLibrary);
    myLibrary.splice(index, 1);
    console.log(myLibrary);
    displayBooks();
}

addBookButton.addEventListener('click', () => {
    dialog.showModal();
});

closeButton.addEventListener('click', () => {
    dialog.close();
});

displayBooks();