import React, {useEffect, useRef, useState} from 'react';
import PingPongGame from "../../Common/PingPongGame";

const Field = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        // draw a canvas
        const canvas = canvasRef.current;
        if (!canvas) throw Error('Canvas is not found!');
        canvas.width = document.body.clientWidth;
        canvas.height = document.body.clientHeight;
        const context = canvas.getContext('2d')
        if (!context) throw Error('not able to create context!');

        let game:PingPongGame = new PingPongGame(context);
        game.start();

    }, []);

    return <canvas ref={canvasRef}>
    </canvas>
}

export default Field;
