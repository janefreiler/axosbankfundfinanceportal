// Deals Management JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const filterSelect = document.getElementById('status-filter');
    if (filterSelect) {
        filterSelect.addEventListener('change', handleFilterChange);
    }
    
    loadDeals();
});

function handleFilterChange(e) {
    const status = e.target.value;
    console.log('Filtering deals by status:', status);
    loadDeals(status);
}

function loadDeals(status = 'all') {
    // In a real application, this would fetch data from an API
    const dealsList = document.querySelector('.deals-list');
    
    // Sample data
    const deals = [
        { id: 'DEAL-001', title: 'Commercial Property Loan', status: 'active', amount: '$250,000' },
        { id: 'DEAL-002', title: 'Equipment Financing', status: 'pending', amount: '$150,000' },
        { id: 'DEAL-003', title: 'Business Line of Credit', status: 'active', amount: '$500,000' }
    ];
    
    const filteredDeals = status === 'all' ? deals : deals.filter(d => d.status === status);
    
    if (filteredDeals.length === 0) {
        dealsList.innerHTML = '<div class="empty-state">No deals found.</div>';
        return;
    }
    
    dealsList.innerHTML = filteredDeals.map(deal => `
        <div class="deal-card">
            <h3>${deal.title}</h3>
            <p>Deal ID: ${deal.id}</p>
            <p>Amount: ${deal.amount}</p>
            <span class="badge badge-${deal.status}">${deal.status.charAt(0).toUpperCase() + deal.status.slice(1)}</span>
            <a href="#" class="btn btn-link">View Details</a>
        </div>
    `).join('');
}