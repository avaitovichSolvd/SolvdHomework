# Project to simulate the operation of an online bookstore
## Parent classes:
1. ``Book``:
     * ``title ``: title of the book
     * ``author``: author of the book
     * ``ISNB``: the International Standard Book Number is a numeric commercial book identifier that is intended to be unique
     * ``price``: price of the book
     * ``availability``: count of the available books<br>
     
Usage example:
```
const book = new Book(
"Jujutsu Kaisen",
 "Gege Akutami",
"978-1974710027",
15.99,
5,
);
```

2. ``User``:
     * ``name``: user name
     * ``email``: user email
     * ``userId``: unique ID of each user<br>

Usage example:
```
const user = new User("John", "john@example.com", "user123");
```


3. ``Cart``:
     * ``books``: default empty array, keep information about ordered books
    * ``addBook``: method for adding books in ``books``. Reduces common amount ``availability`` of each book,  and add it in array for keep
    * ``removeBook``: method for delete book in ``books``. Increasing common amount ``availability`` of each book,  and remove it by the ``ISNB`` from array for keep <br>

Usage example:
```
const cart1 = new Cart();
cart1.addBook(book1);
cart1.addBook(book2);
cart1.removeBook(book2.ISNB);
```


4. ``Order``:
     * ``user``: keeping the object with info about user
     * ``books``: reciving the array of books from ``Card``
     * ``totalPrice``: link for the method result  ``calculateTotalPrice``
    * ``calculateTotalPrice``: method for calculating price for all ordered books and retun result <br>
Usage example:
```
const order1 = new Order(user1, cart1.books);
```

## Inheritance classes:
1. ``FantasyBook`` - based on ``Book`` class:
     * props from parent class
     * ``genre``: only ``"fantasy"`` available<br>
```
class FantasyBook extends Book {
  constructor(title, author, ISBN, price, availability, genre) {
    super(title, author, ISBN, price, availability);
    this.genre = genre;
  }
}
```

2. ``NonFantasyBook`` - based on ``Book`` class:
     * props from parent class
     * ``topic``: all genres except ``"fantasy"``<br>
```
class NonFantasyBook extends Book {
  constructor(title, author, ISBN, price, availability, topic) {
    super(title, author, ISBN, price, availability);
    this.topic = topic;
  }
}
```

### Examples of OOP principles in the assignment:
The `Book` class is used in the principle of inheritance for the ``FantasyBook, NonFantasyBook`` classes using the ``extends ParentName`` command, adding its properties to the object.<br>
The ``Order`` class already shows an example of encapsulation in the ``calculateTotalPrice`` method; here, to calculate the total cost, not properties passed to the class are used, but variables of the class itself.<br>
```
class Order {
  constructor(user, books) {
    this._user = user;
    this._books = books;
    this.totalPrice = this.calculateTotalPrice();
  }
  calculateTotalPrice() {
    let totalPrice = 0;
    for (const book of this._books) {
      totalPrice += book.price;
    }
    return totalPrice;
  }
}
```
