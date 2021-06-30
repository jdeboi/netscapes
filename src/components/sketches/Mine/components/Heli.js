import React, { useState, useEffect } from 'react';
// import Frame from '../../../shared/Frame/Frame';



export default function Heli(props) {
    const dir = 1;
    const [x, setX] = useState((props.y)*300);
    // const [img, setImg] = useState(0);
    // const [dir, setDir] = useState(1);
    

    

    useEffect(() => {

        const interval = setInterval(moveHeli, 50);

        return () => {
            clearInterval(interval);
        }
    }, [x])

    const moveHeli = () => {
        setX((prevX) => {
            let newX = prevX + dir * props.speed;
            if (newX > window.innerWidth)
                return -Math.random() * 400 - 300;
            return newX;
        });
        // setImg(img + 1);

    }

    // const propeller = (Math.floor(img/2)%4)*100;

    return (
        <div className={props.classN} style={{
            top: props.y,
            left: props.x,
            position: "absolute",
            // backgroundPosition: `0px ${-propeller}px`,
            // backgroundSize: "80%",
            // width: 180,
            // height: 50
        }}>
        </div>
    )

}

