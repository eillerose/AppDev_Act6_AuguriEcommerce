document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const productTable = document.querySelector('table tbody');
    const paginationContainer = document.querySelector('.pagination');
    let debounceTimer;

    searchInput.addEventListener('input', function() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            const searchTerm = this.value.trim();
            fetchProducts(searchTerm);
        }, 300); // Debounce for 300ms
    });

    function fetchProducts(searchTerm) {
        fetch(`/products/search?term=${encodeURIComponent(searchTerm)}`)
            .then(response => response.json())
            .then(data => {
                updateProductTable(data.products);
                updatePagination(data.currentPage, data.totalPages, searchTerm);
            })
            .catch(error => console.error('Error:', error));
    }

    function updateProductTable(products) {
        productTable.innerHTML = '';
        products.forEach(product => {
            const row = `
                <tr>
                    <td>${product.id}</td>
                    <td>${product.name}</td>
                    <td>${product.category}</td>
                    <td>$${product.price.toFixed(2)}</td>
                    <td>${product.stock}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-primary me-1" data-bs-toggle="modal" data-bs-target="#editProductModal" data-id="${product.id}" data-name="${product.name}" data-category="${product.category}" data-price="${product.price}" data-stock="${product.stock}">Edit</button>
                        <form action="/products/delete/${product.id}" method="POST" onsubmit="return confirm('Are you sure you want to delete this product?');" style="display:inline;">
                            <button type="submit" class="btn btn-sm btn-outline-danger">Delete</button>
                        </form>
                    </td>
                </tr>
            `;
            productTable.insertAdjacentHTML('beforeend', row);
        });
    }

    function updatePagination(currentPage, totalPages, searchTerm) {
        paginationContainer.innerHTML = '';
        if (totalPages > 1) {
            let paginationHTML = '';
            if (currentPage > 1) {
                paginationHTML += `<li class="page-item"><a class="page-link" href="/products?page=${currentPage - 1}&search=${searchTerm}">Previous</a></li>`;
            }
            for (let i = 1; i <= totalPages; i++) {
                paginationHTML += `<li class="page-item ${i === currentPage ? 'active' : ''}"><a class="page-link" href="/products?page=${i}&search=${searchTerm}">${i}</a></li>`;
            }
            if (currentPage < totalPages) {
                paginationHTML += `<li class="page-item"><a class="page-link" href="/products?page=${currentPage + 1}&search=${searchTerm}">Next</a></li>`;
            }
            paginationContainer.innerHTML = paginationHTML;
        }
    }
});