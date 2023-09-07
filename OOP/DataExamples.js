const {
  FantasyBook,
  NonFantasyBook,
  User,
  Cart,
  Order,
} = require("./Classes.js");

const book1 = new FantasyBook(
  "Chainsaw Man",
  "Tatsuki Fujimoto",
  "9786555127331",
  20.49,
  true,
  "fantasy"
);
const book2 = new FantasyBook(
  "Jujutsu Kaisen",
  "Gege Akutami",
  "978-1974710027",
  15.99,
  true,
  "fantasy"
);
const book3 = new FantasyBook(
  "Kaiju No. 8",
  "Naoya Matsumoto",
  "978-1974727148",
  10.35,
  false,
  "fantasy"
);

const book4 = new NonFantasyBook(
  "Adabana",
  "NON",
  "978-2505113805",
  30.99,
  true,
  "tragedy"
);

const user1 = new User("John", "john@example.com", "user123");
const user2 = new User("Barbara", "barbara@example.com", "user321");

const cart1 = new Cart();
cart1.addBook(book1);
cart1.addBook(book2);
cart1.removeBook(book2.ISNB);

const order1 = new Order(user1, cart1.books);

const cart2 = new Cart();
cart2.addBook(book2);
cart2.addBook(book3);
cart2.addBook(book4);

const order2 = new Order(user2, cart2.books);

console.log(order1);
console.log(order2);
