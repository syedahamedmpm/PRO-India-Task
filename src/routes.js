import Index from "views/Index.js";
import ProductList from "views/examples/productList";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
  },
  {
    path: "/products",
    name: "Products",
    icon: "ni ni-single-02",
    component: ProductList,
    layout: "/admin",
  }
];
export default routes;
