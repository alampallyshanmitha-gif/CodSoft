/* =========================
   CAKE UPDATE (IMAGE FIXED)
========================= */
function updateCake() {
  const select = document.getElementById("cakeSelect");
  const option = select.options[select.selectedIndex];

  const name = option.value;
  const price = option.getAttribute("data-price");
  const img = option.getAttribute("data-img");

  document.getElementById("cakeName").innerText = name;
  document.getElementById("cakePrice").innerText = price;

  const image = document.getElementById("cakeImage");

  if (img) {
    image.src = img;
    image.style.display = "block";
  } else {
    image.src = "";
    image.style.display = "none";
  }

  calculateTotal();
}

/* =========================
   TOTAL CALCULATION
========================= */
function calculateTotal() {
  const price = Number(document.getElementById("cakePrice").innerText || 0);
  const qty = Number(document.getElementById("quantity").value || 1);

  document.getElementById("totalPrice").innerText = price * qty;
}

/* =========================
   ADD TO MY ORDERS
========================= */
function addToMyOrders(order) {
  const table = document.getElementById("myOrdersTable");

  // remove "No orders yet"
  if (table.innerText.includes("No orders yet")) {
    table.innerHTML = "";
  }

  const row = `
    <tr>
      <td>${order.cake}</td>
      <td>${order.quantity}</td>
      <td>₹${order.total}</td>
      <td>Cash on Delivery</td>
    </tr>
  `;

  table.innerHTML += row;
}

/* =========================
   ORDER SUBMIT
========================= */
document.getElementById("orderForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const cake = document.getElementById("cakeSelect").value;
  const price = Number(document.getElementById("cakePrice").innerText || 0);
  const quantity = Number(document.getElementById("quantity").value || 1);
  const total = price * quantity;

  const orderData = {
    cake,
    quantity,
    total
  };

  // success message
  alert("🎉 Order placed successfully! Cash on Delivery selected.");

  // update table
  addToMyOrders(orderData);

  // reset form
  this.reset();

  document.getElementById("cakeImage").src = "";
  document.getElementById("cakeName").innerText = "";
  document.getElementById("cakePrice").innerText = "0";
  document.getElementById("totalPrice").innerText = "0";
});

/* =========================
   QUANTITY CHANGE
========================= */
document.getElementById("quantity").addEventListener("input", calculateTotal);