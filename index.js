const myLibrary = [];
const container = document.querySelector('#container');

function Book(title, author, pageCount, read, thoughts) {
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

Book.prototype.changeRead = function () {
    this.read = !this.read;
}

function addBookToLibrary(title, author, pageCount = '', read, thoughts = '') {
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

        const newCardLeft = document.createElement('div');
        const newCardRight = document.createElement('div');
        newCardLeft.classList.add('card-left');
        newCardRight.classList.add('card-right');

        const newCardContent = document.createElement('div');
        newCardContent.classList.add('card-content');

        const newTitleDiv = document.createElement('div');
        newTitleDiv.classList.add('card-header');

        const newTitle = document.createElement('div');
        newTitle.classList.add('book-title')
        newTitle.innerHTML = book.title;

        const newPageCount = document.createElement('div');
        newPageCount.classList.add('book-page-count');
        newPageCount.innerHTML = book.pageCount;

        const newIcon = document.createElement('img');
        newIcon.classList.add('icon');
        newIcon.setAttribute('src', 'media/book-open-page-variant-outline.svg');

        const newAuthor = document.createElement('div');
        newAuthor.classList.add('book-author');
        newAuthor.innerHTML = book.author;

        newTitleDiv.append(newTitle, newIcon, newPageCount, newAuthor);

        const newThoughts = document.createElement('div');
        newThoughts.classList.add('thoughts');
        newThoughts.innerHTML = book.thoughts;

        const newFooter = document.createElement('div');
        newFooter.classList.add('card-footer');
        const markReadButton = document.createElement('button');
        markReadButton.classList.add('mark-read');
        if (book.read) {
            markReadButton.innerHTML = 'Read &#10004;';
        } else {
            markReadButton.innerHTML = 'Unread';
        }
        markReadButton.addEventListener('click', () => {
            myLibrary[index].changeRead();
            displayBooks();
        })
        

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.setAttribute('data-array-index', index);
        deleteButton.innerHTML = 'Delete';
        deleteButton.addEventListener('click', () => {
            myLibrary.splice(index, 1);
            displayBooks();
        });

        newFooter.append(markReadButton, deleteButton);
        newCardContent.append(newTitleDiv, newThoughts, newFooter);

        newCard.append(newCardLeft, newCardContent, newCardRight);

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
    let read = formData.get('read-status');
    if (read === 'read') {
        read = true;
    } else {
        read = false;
    }
    const thoughts = formData.get('thoughts')
    addBookToLibrary(title, author, pageCount, read, thoughts);
    container.innerHTML = '';
    dialog.close();
    displayBooks();
})

addBookButton.addEventListener('click', () => {
    bookForm.reset();
    dialog.showModal();
});

closeButton.addEventListener('click', () => {
    dialog.close();
});

displayBooks();