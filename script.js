const apiUrl = "https://script.google.com/macros/s/AKfycbyvLpdUBxqwB0v6-pm8h6dryshYU5uhfzHSUvfa6hxo5mYzNqWMHHs1Sm7byrSU4Aro/exec";

// Fetch and display books
async function fetchBooks() {
  const response = await fetch(`${apiUrl}?action=getBooks`);
  const books = await response.json();

  const bookList = document.getElementById("book-list");
  books.forEach(book => {
    const div = document.createElement("div");
    div.innerHTML = `
      <h3>${book.title}</h3>
      <p>Author: ${book.author}</p>
      <p>Price: $${book.price}</p>
      <button onclick="placeOrder('${book.id}', 1)">Buy Now</button>
    `;
    bookList.appendChild(div);
  });
}

// Place an order
async function placeOrder(bookId, quantity) {
  const email = prompt("Enter your email:");
  const response = await fetch(
    `${apiUrl}?action=placeOrder&email=${email}&bookId=${bookId}&quantity=${quantity}`
  );
  const message = await response.text();
  alert(message);
}

fetchBooks()