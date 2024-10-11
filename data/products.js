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

export async function loadProducts() {
  const reponse = await fetch('https://supersimplebackend.dev/products');
  const responseData = await reponse.json();
  products = responseData.map((productDetail) => {
    if (productDetail.type === 'clothing') {
      return new Cloth(productDetail);
    }

    return new Product(productDetail);
  });
}