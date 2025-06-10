import { useState } from "react";
import styles from './ToolTip.module.scss'
function ToolTipWrapper({children, tooltipText}) {
    const [position, setPosition] = useState({x: 0, y: 0})
    const [isVisible, setIsVisible] = useState(false)

    const showTooltip = () => {
        setIsVisible(true)
    }

    const hideTooltip = () => {
        setIsVisible(false)
    }

    const handleMouseMove = e => {
        setPosition(
            {
                x: e.clientX,
                y: e.clientY
            }
        )
    }

    return ( 
        <div
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}
            onMouseMove={handleMouseMove}
            className={styles.tooltipTarget}
        >
            {children}

            {isVisible && (
                <div
                className={styles.tooltip}
                style={{
                    top: position.y + 12,
                    left: position.x + 12,
                }}
                >
                    {tooltipText}
                </div>
            )}
        </div>
     );
}

export default ToolTipWrapper;