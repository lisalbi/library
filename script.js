let myLibrary = [];
let libraryTable = document.querySelector('#libraryTable');
let libraryBody = document.querySelector('#libraryBody');
let newBookBtn = document.querySelector('#newBookBtn');
let bookForm = document.querySelector('#bookForm');
let bookFormContainer = document.querySelector('#bookFormContainer');
let submitBookBtn = document.querySelector('#submitBookBtn');


newBookBtn.addEventListener('click', openForm);
closeFormBtn.addEventListener('click', closeForm);
submitBookBtn.addEventListener('click', addBook);


function Book(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
    this.info = function() {
        return (hasRead ? (title + ' by ' + author + ', ' + pages + ', already read.') : 
            (title + ' by ' + author + ', ' + pages + ', not read yet.'));
    }
}


function addBook() {
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let pages = document.getElementById('pages').value;
    let read = document.getElementById('read').checked;
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    for (book of myLibrary) {
        console.log(book.info());
    }
    refreshTable();
    bookForm.reset();
    closeForm();
}

function refreshTable() {
    console.log('refreshing...');
    libraryBody.textContent = '';
    for (book of myLibrary) {
        let row = document.createElement("tr");
        for (prop in book) {
            if (typeof book[prop] !== 'function') {
                let gridValue = document.createElement('td');
                if (book[prop] === true) {
                    gridValue.textContent = 'Yes';
                }
                else if (book[prop] === false) {
                    gridValue.textContent = 'No';
                }
                else {
                    gridValue.textContent = book[prop];
                }
                row.appendChild(gridValue);
            }
        }
        row.setAttribute('data-id', `${myLibrary.indexOf(book)}`);
        let deleteBtnContainer = document.createElement('td');
        let deleteBtn = document.createElement('BUTTON');
        deleteBtn.classList.add('deleteBtn');
        deleteBtn.setAttribute('data-id', `${myLibrary.indexOf(book)}`);
        var img = document.createElement("img");
        img.src = "images/trash.png";
        deleteBtn.appendChild(img);
        console.log(`adding delete btn at ${myLibrary.indexOf(book)}`);
        deleteBtn.addEventListener('click', function() {
            deleteBook(this.parentElement.getAttribute('data-id'));
        })
        deleteBtnContainer.appendChild(deleteBtn);
        row.appendChild(deleteBtnContainer);
        libraryBody.appendChild(row);
        
    }   
    showArray();
}

// let theHobbit = new Book('The Hobbit', "JRR Tolkien", 453, false);
// addBook(theHobbit);
// displayTable();

function showArray() {
    for (book of myLibrary) {
        console.log(`index: ${myLibrary.indexOf(book)}`)
        console.log(book.info());
    }
}

function openForm() {
    bookFormContainer.style.display = 'block';
}

function closeForm() {
    bookFormContainer.style.display = 'none';
}

function deleteBook(index) {
    myLibrary.splice(index, 1);
    refreshTable();
    console.log(`deleting book at index ${index}`);
}