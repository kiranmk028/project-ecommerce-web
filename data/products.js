import { formatCurrency } from "../scripts/utils/money.js";

export function getProduct(productId) {
  return products.find((item) => item.id === productId);
}

class Product {
  id;
  image;
  name;
  rating;
  priceCents;
  keywords;

  constructor(productDetails) {
    this.id = productDetails.id;
    this.name = productDetails.name;
    this.image = productDetails.image;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
    this.keywords = productDetails.keywords;
  }

  getStarsUrl() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }

  getPrice() {
    return `$${formatCurrency(this.priceCents)}`;
  }

  extraInfroHTML() {
    return '';
  }
}

class Cloth extends Product {
  type;
  sizeChartLink;

  constructor(productDetails) {
    super(productDetails);

    this.type = productDetails.type;
    this.sizeChartLink = productDetails.sizeChartLink;
  }

  extraInfroHTML() {
    return `
      <a href="${this.sizeChartLink}" target="_blank">
        Size Chart
      </a>
    `;
  }
}

export let products = [];

export function loadProducts(callback) {
  /**
   * fetch() returns a promise.
   */
  return fetch('https://supersimplebackend.dev/products')
    .then((response) => {
      /**
       * This will return a promise as well.
       */
      return response.json();
    })
    .then((responseData) => {
      products = responseData.map((productDetail) => {
        if (productDetail.type === 'clothing') {
          return new Cloth(productDetail);
        }

        return new Product(productDetail);
      });
    }).then(() => {
      callback();
    });
}