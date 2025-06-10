import BannerProduct from "./bannerProduct/BannerProduct.js";

function ProductCom({banner, title, description, price, image}) {
    
    if(banner) {
        return <BannerProduct />
    } 
    
}

export default ProductCom;