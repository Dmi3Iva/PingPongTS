import React, {useEffect, useRef, useState} from "react";
import PingPongGame from "./PingPongGame/PingPongGame";
import {IBallPosition} from "../../Common/IBallPosition";
import {GameState} from "../../Common/constants";
import {getPingPongRandomVector} from "../../Common/utils";

interface session {
    vector: IBallPosition,
    ballPosition: IBallPosition
}

const PingPongGameContainer = () => {
    const timer = useRef(0);
    const [sessionState, setSessionState] = useState<session>({
        vector: {x: 0, y: 0},
        ballPosition: {x: 50, y: 50}
    })
    const [gameState, setGameState] = useState<GameState>(GameState.Pause);
    const [leftScore, setLeftScore] = useState<number>(0);
    const [rightScore, setRightScore] = useState<number>(0);
    const [leftPosition, setLeftPosition] = useState<number>(50);
    const [rightPosition, setRightPosition] = useState<number>(50);
    // const [ballPosition, setBallPosition] = useState<IBallPosition>({x: 50, y: 50});
    // const [vector, setVector] = useState<IBallPosition>({x: 0, y: 0});

    useEffect(() => {
        // setUpdateInterval(setInterval(() => update(), 1000));
        return () => cleanGame();
    }, []);

    const cleanGame = () => {
        clearInterval(timer.current);
    }

    const resetGame = () => {
        console.log("RESET GAME TODO!!!");
        cleanGame();
        // setVector({x: 0, y: 0})
    }


    useEffect(() => {
        if (gameState === GameState.Playing) {
            timer.current = window.setInterval(update, 10);
            setSessionState(prevState => ({vector: getPingPongRandomVector(), ballPosition: prevState.ballPosition}));
        } else {
            resetGame();
        }
    }, [gameState]);

    // const getNewPosition = (x: number, y: number): IBallPosition => {
    //     // checks for collision

    //     return {
    //         x: x + vector.x,
    //         y: y + vector.y
    //     };
    // }

    const update = () => {
        // check for goals

        // set new positions
        setSessionState(prevState => {
                let vector = JSON.parse(JSON.stringify(prevState.vector));
                const {x, y} = prevState.ballPosition;
                if (x + vector.x < 0) vector = {x: -1 * x, y};
                if (x + vector.x > 100) vector = {x: -1 * x, y};
                if (y + vector.y < 0) vector = {x, y: -1 * y};
                if (y + vector.y > 100) vector = {x, y: -1 * y};
                return {
                    ballPosition: {
                        x: prevState.ballPosition.x + prevState.vector.x,
                        y: prevState.ballPosition.y + prevState.vector.y
                    }
                    ,
                    vector
                }
            }
        );
    }

    // add some event handlers for
    const handleKeyDown = (event: React.KeyboardEvent) => {
        console.log('handle!', GameState.Pause);
        if (gameState === GameState.Pause) {
            setGameState(GameState.Playing);
            return;
        }

        switch (event.key) {
            case 'a':
                if (leftPosition - 10 > -1) setLeftPosition(leftPosition - 10);
                break;
            case 'z':
                if (leftPosition + 10 < 100) setLeftPosition(leftPosition + 10);
                break;
            case 'k':
                if (rightPosition - 10 > -1) setRightPosition(rightPosition - 10);
                break;
            case 'm':
                if (rightPosition + 10 < 100) setRightPosition(rightPosition + 10);
                break;
            default:
                console.log('unknown key', event.key);
                break;

        }
    }

    return <PingPongGame
        onKeyDown={handleKeyDown}
        leftScore={leftScore}
        rightScore={rightScore}
        leftPosition={leftPosition}
        rightPosition={rightPosition}
        ballPosition={sessionState.ballPosition}
        gameState={gameState}
    />;
}

export default PingPongGameContainer;
