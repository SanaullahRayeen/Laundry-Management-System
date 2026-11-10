// Get HTML elements
const orderForm = document.getElementById("orderForm");
const orderList = document.getElementById("orderList");

// Starting order number
let orderNumber = 1;

// Available order statuses
const statuses = [
    "Collected",
    "Washing",
    "Drying",
    "Ironing",
    "Quality Check",
    "Ready for Delivery",
    "Delivered"
];

// When user submits the form
orderForm.addEventListener("submit", function(event) {

    // Stop page from refreshing
    event.preventDefault();

    // Get customer details
    const name = document.getElementById("customerName").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const garment = document.getElementById("garment").value;
    const quantity = document.getElementById("quantity").value;
    const service = document.getElementById("service").value;

    // Check mobile number
    if (!/^[0-9]{10}$/.test(mobile)) {
        alert("Please enter a valid 10-digit mobile number.");
        return;
    }

    // Generate order ID
    const orderID = "CH-" + String(orderNumber).padStart(3, "0");

    // Get current date and time
    const now = new Date();

    // Format date: 09 Nov 2026
    const orderDate = new Intl.DateTimeFormat("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    }).format(now);

    // Format time: 10:30 AM
    const orderTime = new Intl.DateTimeFormat("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    }).format(now);

    // Create a new table row
    const row = document.createElement("tr");

    // Add order details
    const details = [
        orderID,
        name,
        mobile,
        garment,
        quantity,
        service,
        orderDate,
        orderTime
    ];

    details.forEach(function(detail) {
        const cell = document.createElement("td");
        cell.textContent = detail;
        row.appendChild(cell);
    });

    // Create status dropdown
    const statusCell = document.createElement("td");
    const statusSelect = document.createElement("select");

    statuses.forEach(function(status) {
        const option = document.createElement("option");
        option.value = status;
        option.textContent = status;
        statusSelect.appendChild(option);
    });

    statusCell.appendChild(statusSelect);
    row.appendChild(statusCell);

    // Add row to order list
    orderList.appendChild(row);

    // Increase order number
    orderNumber++;

    // Clear form
    orderForm.reset();

    alert("Laundry order added successfully!");
});