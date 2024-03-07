class Product {
    constructor(ProductName, Price, Quantity) {
        this.ProductName = ProductName;
        this.Price = Price;
        this.Quantity = Quantity;
    }

    static isValid(product) {
        return (
            product &&
            product.ProductName &&
            product.Price &&
            product.Quantity
        );
    }
}

module.exports = Product;
