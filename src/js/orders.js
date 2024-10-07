document.addEventListener('DOMContentLoaded', function () {
    const orderButtons = document.querySelectorAll('.order-btn');
    const productNameField = document.getElementById('productName');
    const quantityField = document.getElementById('quantity');
    const totalPriceField = document.getElementById('totalPrice');
    let selectedPrice = 0;

    // Function to calculate total price
    function calculateTotalPrice() {
        const quantity = parseInt(quantityField.value);
        const totalPrice = selectedPrice * quantity;
        totalPriceField.value = totalPrice;
    }

    // Event listener for each order button
    orderButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const productName = this.getAttribute('data-name');
            selectedPrice = parseFloat(this.getAttribute('data-price'));

            // Set product name and initial total price in modal
            productNameField.value = productName;
            quantityField.value = 1;
            calculateTotalPrice();

            // Show the modal
            $('#orderModal').modal('show');
        });
    });

    // Event listener for quantity change
    quantityField.addEventListener('input', calculateTotalPrice);

    // Handle form submission (if needed)
    document.getElementById('orderForm').addEventListener('submit', function (e) {
        e.preventDefault();
        alert('Order confirmed for ' + productNameField.value + ' (Quantity: ' + quantityField.value + ')');
        $('#orderModal').modal('hide');
    });
});
