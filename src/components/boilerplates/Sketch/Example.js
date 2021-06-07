
import React, { useState } from 'react';
import Sketch from './p5Sketch';

function Example() {
    // Declare a new state variable, which we'll call "count"
    // const [count, setCount] = useState(0);

    return (
        <div className="Sketch" >
            <Sketch className="p5sketch" />
        </div>
    )
}