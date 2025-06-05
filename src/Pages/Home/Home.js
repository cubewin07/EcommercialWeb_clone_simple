import styles from './Home.module.scss';
import Banner from './Banner/Banner.js'

const importAll = (r) => r.keys().map(r);
const images = importAll(require.context('../../assets/banners', false, /\.(png|jpe?g|svg)$/));



console.log(images.length);
function Home() {
    return ( 
        <div className={styles.home}>
            <div className={styles.banner}>
                <Banner images={images} />
            </div>
            <div className={styles.featuredProducts}>
                {/* <FeaturedProducts/> */}
            </div>
        </div>                                       
     );
}

export default Home;