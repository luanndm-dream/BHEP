function formatCurrencyVND(amount :number) {
    if (isNaN(amount)) {
        return '0';
    }
    
    // Convert amount to string and split into integer and decimal parts
    const parts = amount.toString().split('.');
    let integerPart = parts[0];
    const decimalPart = parts.length > 1 ? '.' + parts[1] : '';
    
    // Add dots for thousands separator
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    // Combine integer and decimal parts
    return `${integerPart + decimalPart}đ`;
}

export default formatCurrencyVND;