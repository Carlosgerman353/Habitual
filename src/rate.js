import React, { useState} from 'react'
import { FaStar} from "react-icons/fa";

const Rating = () => {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

    return (
        <div>
            {[...Array(5)].map((star, i) => {
                const rateValue = i + 1;
                return (
                    <label>
                        <input 
                            type = "radio" 
                            name = "rating" 
                            value = {rateValue} 
                            onClick = {() => setRating(rateValue)}
                        />
                        <FaStar 
                            className="mark" 
                            color={rateValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"} 
                            size={50}
                            onMouseEnter = {() => setHover(rateValue)}
                            onMouseLeave = {() => setHover(null)}
                        />
                    </label>
                ); 
            })}
            <p>You've rated this streak {rating}!</p>
        </div>
    );  
};

export default Rating