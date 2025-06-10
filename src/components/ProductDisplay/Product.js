import BannerProduct from "./bannerProduct/BannerProduct.js";

function Product({banner, title, description, price, image}) {
    
    if(banner) {
        return <BannerProduct />
    } 
    
}

export default Product;