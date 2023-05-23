export const LIMIT = 12;

export const ACTIONS = {
  products: "products",
  oneProduct: "oneProduct",
  pageTotalCount: "pageTotalCount",
  user: "user",
  cart: "cart",
  cartLength: "cartLength",
  favorite: "favorite",
  favLength: "favLength",
  accessory: "accessory",
};
export const API = "http://localhost:8000/products";
export const API2 = "http://localhost:8000/accessory";

export const ADMINS = ["admin@admin.com", "adminspage"];
export function totalSumFunc(products) {
  let data = products.reduce((acc, item) => acc + item.subPrice, 0);
  return data;
}

export function calcSubPrice(product) {
  return +product.count * product.price;
}
export function calcSubFav(product) {
  return +product.count;
}
