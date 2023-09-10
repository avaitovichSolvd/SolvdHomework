class Book {
  constructor(title, author, ISNB, price, availability) {
    this.title = title;
    this.author = author;
    this.ISNB = ISNB;
    this.price = price;
    this.availability = availability;
  }
}

// Тут в пример Наследования, который дополняет
// своим свойством Жанр книги переиспользуя главный класс Книги
class FantasyBook extends Book {
  constructor(title, author, ISBN, price, availability, genre) {
    super(title, author, ISBN, price, availability);
    this.genre = genre;
  }
}

class NonFantasyBook extends Book {
  constructor(title, author, ISBN, price, availability, topic) {
    super(title, author, ISBN, price, availability);
    this.topic = topic;
  }
}

class User {
  constructor(name, email, userId) {
    this.name = name;
    this.email = email;
    this.userId = userId;
  }
}

class Cart {
  constructor() {
    this.books = [];
  }

  addBook(book) {
    if (book.availability) {
      book.availability -= 1;
      this.books.push(book);
    }
  }

  removeBook(isbn) {
    const index = this.books.findIndex((book) => book.ISNB === isbn);
    if (index !== -1) {
      this.books.splice(index, 1);
    }
  }

  calculateTotalPrice() {
    let totalPrice = 0;
    for (const book of this.books) {
      totalPrice += book.price;
    }
    return totalPrice;
  }
}

class Order {
  constructor(user, books) {
    this._user = user;
    this._books = books;
    this.totalPrice = this.calculateTotalPrice();
  }

  //метод calculateTotalPrice инкапсулирован и берёт значение не из передаваемых
  // свойств, которые можн оизменить в готовом объекте, а из самого себя
  calculateTotalPrice() {
    let totalPrice = 0;
    for (const book of this._books) {
      totalPrice += book.price;
    }
    return totalPrice;
  }
}

module.exports = {
  FantasyBook,
  NonFantasyBook,
  User,
  Cart,
  Order,
};
