Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true,
        }
    },
    template: `
        <div class="product">
            <div class="product-image">
                <img :src="image" :alt="altText"/>
            </div>
            <div class="product-info">
                <h1>{{ title }}</h1>
                <p v-if="inStock">In stock</p>
                <p v-else>Out of Stock</p>
                <ul>
                    <li v-for="detail in details">{{ detail }}</li>
                </ul>
                <p>Shipping: {{ shipping }}</p>
                <div class="color-box" v-for="(variant, index) in variants" :key="variant.variantId" :style="{ backgroundColor:variant.variantColor }" @click="UpdateProduct(index)"></div>
                <button @click="AddToCart" :disabled="!inStock" :class="{ disabledButton: !inStock }">Add to Cart</button>
                <button @click="RemoveFromCart" :disabled="!inStock" :class="{ disabledButton: !inStock }">Remove from Cart</button>
            </div>
        </div>
    `,
    data() {
        return {
            product: "Socks",
            brand: 'Vue Mastery',
            selectedVariant: 0,
            altText: "A pair of socks",
            details: ['80% Cotton', '20% Polyester', 'Gender-neutral'],
            variants: [
                {
                    variantId: 2234,
                    variantColor: 'green',
                    variantImage: "./assets/vmSocks-green-onWhite.jpg",
                    variantQuantity: 10
                },
                {
                    variantId: 2235,
                    variantColor: 'blue',
                    variantImage: "./assets/vmSocks-blue-onWhite.jpg",
                    variantQuantity: 5
                },
            ],
        }
    },
    methods: {
        AddToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
        },
        RemoveFromCart(){
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId);
        },
        UpdateProduct(index){
            this.selectedVariant = index;
            console.log(index);
        },
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product;
        },
        image() {
            return this.variants[this.selectedVariant].variantImage;
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        shipping() {
            if (this.premium) {
                return "Free";
            } else {
                return 2.99;
            }
        }
    }
})
let app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: []
    },
    methods: {
        UpdateCart(id) {
            this.cart.push(id);
        },
        RemoveFromCart(id){
            for(let i = this.cart.length - 1; i >= 0; --i) {
                if (this.cart[i] === id) {
                    this.cart.splice(i, 1);
                }
            }
        }
    }
})
