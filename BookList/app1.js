//book class: represent book

class Book{
    constructor(title, author, isbn){
        this.title=title;
        this.author=author;
        this.isbn=isbn;
    }
}


//ui class: handle ui task

class UI{
    static displayBooks(){
        const storedBooks=[
            {
                title:'Book One',
                author:'John Doe',
                isbn:'234321'
            },
            {
                title:'Book Two',
                author:'John Lae',
                isbn:'657463'
            }
        ];

        const books = storedBooks;

        books.forEach((book)=>UI.addBookToList(book));
    }

    static addBookToList(book){
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML=`
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
    }

    static deleteBook(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div,form);

        //vanish in 3 sec
        setTimeout(()=>document.querySelector('.alert').remove(),3000);
    }

    static clearFields(){
        document.querySelector('#title').value='';
        document.querySelector('#author').value='';
        document.querySelector('#isbn').value='';
    }

    
}

//store class: handle storage

class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books')===null){
            books=[];
        }else{
            books=JSON.parse(localStorage.getItem('books'));
        }

        return book;
    }   
    
    static addBook(book){
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
    }

    static removeBook(isbn){
        const books = Store.getBooks();

        books.forEach((book,index)=>{
            if(book.isbn===isbn){
                books.splice(index,1);
            }
        });
        localStorage.setItem('books',JSON.stringify(books));
    }
}

//event: display book

document.addEventListener('DOMContentLoaded',UI.displayBooks);

//event: add a book

document.querySelector('#book-form').addEventListener('submit',(e)=>{

    //prevent actual submit
    e.preventDefault();

    //get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    //validate
    if(title===''||author===''||isbn===''){
        //alert('Please fill all the fields');
        UI.showAlert('Please fill all the fields','danger');
    }else{

        //instantiate book
        const book = new Book(title,author,isbn);

        //add book to UI
        UI.addBookToList(book);

        //show success message
        UI.showAlert('Book Added','success');

        //clear fields
        UI.clearFields();

    }   

    //console.log(book);
});

//event: remove a book

document.querySelector('#book-list').addEventListener('click',(e)=>{
    UI.deleteBook(e.target);

    //show success message
        UI.showAlert('Book Removed','success');
});