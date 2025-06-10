import { useEffect, useState, useRef, createContext } from "react";
import ProductCom from "../../../components/ProductDisplay/ProductCom";
const TIME_CHANGE = 5000; // Time in milliseconds to change the image
const COOLDOWN_TIME = 500; // Cooldown time in milliseconds to prevent rapid changes

export const BannerContext = createContext();
function Banner({ images }) {
    const [index, setIndex] = useState(0);
    const [indexDots, setIndexDots] = useState(0);
    const [canChange, setCanChange] = useState(true); // State to control image change
    const timer = useRef(null);
    const totalImages = images.length;

    useEffect(() => {
        startTimer(); // Start the timer when the component mounts

        return () => {
            clearInterval(timer.current); // Cleanup interval on component unmount
        };
    }, [totalImages]);

    const startTimer = () => {
        clearInterval(timer.current); // Clear any existing timer
        timer.current = setInterval(() => {
            setIndex((prevIndex) => (prevIndex === totalImages - 1 ? 0 : prevIndex + 1));
            setIndexDots((prevIndex) => (prevIndex === totalImages - 1 ? 0 : prevIndex + 1));
        }, TIME_CHANGE);
    };

    const handleChangeImage = (newIndex) => {
        if (!canChange || newIndex === index) return; // Prevent change if not allowed
        clearInterval(timer.current); // Clear the existing timer

        setCanChange(false); // Set to false to prevent immediate changes
        setIndex(newIndex);

        setTimeout(() => {
            setCanChange(true); // Allow changes after a short delay
            setIndexDots(newIndex); // Update the dot index
        }, COOLDOWN_TIME); // Delay to allow the transition to complete
    };
    const value = {
        images,
        index,
        setIndex,
        indexDots,
        setIndexDots,
        handleChangeImage,
        totalImages,
        startTimer,
        timer
    }

    return (
        <BannerContext.Provider value={value}>
            <ProductCom banner={true}/>
        </BannerContext.Provider>    
    );
}

export default Banner;