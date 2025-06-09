
import styles from './Home.module.scss';
import Banner from './Banner/Banner.js'
import FeaturedProducts from './FeaturedProducts/FeaturedProducts.js';  
const importAll = (r) => r.keys().map(r);
const images = importAll(require.context('../../assets/banners', false, /\.(png|jpe?g|svg)$/));



function Home() {
    return ( 
        <div className={styles.home}>
                <Banner images={images} />

                <FeaturedProducts/>
        </div>                                       
     );
}

export default Home;