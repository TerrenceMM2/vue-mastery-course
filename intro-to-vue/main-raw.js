var app = new Vue({
    el: "#app",
    data: {
        brand: "Vue Mastery",
        product: "Socks",
        // image: "./assets/images/socks-green.jpg",
        selectedVariant: 0,
        // inventory: 100,
        // inStock: false,
        details: ["80% cotton", "20% polyester", "Gender-neutral"],
        variants: [
            {
                variantId: 2234,
                variantColor: "green",
                variantImage: "./assets/images/socks-green.jpg",
                variantQuantity: 10
            },
            {
                variantId: 2235,
                variantColor: "blue",
                variantImage: "./assets/images/socks-blue.jpg",
                variantQuantity: 0
            }
        ],
        cart: 0
    },
    methods: {
        addToCart: function() {
            this.cart += 1
        },
        // ES6 Shorthand
        updateProduct(index) {
            this.selectedVariant = index
            console.log(index)
        }
    },
    // Computed properties are cached
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        }
    }
})