import React, {useEffect, useState} from "react";
import PingPongGame from "./PingPongGame/PingPongGame";
import {IBallPosition} from "../../Common/IBallPosition";

const PingPongGameContainer = () => {
    const [leftScore, setLeftScore] = useState<number>(0);
    const [rightScore, setRightScore] = useState<number>(0);
    const [leftPosition, setLeftPosition] = useState<number>(50);
    const [rightPosition, setRigthPosition] = useState<number>(50);
    const [ballPosition, setBallPosition] = useState<IBallPosition>({x: 50, y: 50}); // TODO:: add interface for position
    const [updateInterval, setUpdateInterval] = useState<NodeJS.Timer>();

    useEffect(() => {
        // setUpdateInterval(setInterval(() => update(), 1000));
        // return ()=> {clearInterval(updateInterval as NodeJS.Timeout)}; // TODO:: not sure that correct
    });

    const update = () => {
        console.log('updating')
        // check for goals
        let isGoal: boolean = false;

        // update ball position
    }

    // add some event handlers for
    const handleKeyDown = (event: React.KeyboardEvent)=>{
        if (event.key === 'a' && leftPosition - 10 > -1)
            setLeftPosition(leftPosition - 10);
        if (event.key === 'z' && leftPosition + 10 < 100)
            setLeftPosition(leftPosition + 10);
        if (event.key === 'k' && rightPosition - 10 > -1)
            setRigthPosition(rightPosition - 10);
        if (event.key === 'm' && rightPosition + 10 < 100)
            setRigthPosition(rightPosition + 10);
    }

    return <PingPongGame
        onKeyDown={handleKeyDown}
        leftScore={leftScore}
        rightScore={rightScore}
        leftPosition={leftPosition}
        rightPosition={rightPosition}
        ballPosition={ballPosition}
    />;
}

export default PingPongGameContainer;
