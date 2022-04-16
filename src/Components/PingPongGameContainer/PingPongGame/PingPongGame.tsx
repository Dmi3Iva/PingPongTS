import React, {FunctionComponent} from "react";
import {IBallPosition} from "../../../Common/IBallPosition";
import styled from "styled-components";
import {GameState, ROCKET_WIDTH} from "../../../Common/constants";


interface ScoreProps {
    leftScore: number;
    rightScore: number;
}

const Score: FunctionComponent<ScoreProps> = ({leftScore, rightScore}) => {
    const ScoreStyle = styled.h1`
      text-align: center;
      position: absolute;
      width: 100%;
      z-index: 999;
    `
    return <ScoreStyle>{leftScore}:{rightScore}</ScoreStyle>;
}

interface TableProps {
    leftPosition: number;
    rightPosition: number;
    ballPosition: IBallPosition;
}


const Table: FunctionComponent<TableProps> = ({leftPosition, rightPosition, ballPosition}) => {

    const TableGrid = styled.div`
      display: flex;
      height: 100vh;
      width: 100vw;
      background: lime;
      position: relative;
      justify-content: space-between;
    `;

    const LeftRocketField = styled.div`
      display: flex;
      flex-grow: 0;
      flex-shrink: 0;
      width: 1vw;
      background-color: teal;
      position: relative;
      z-index: 1;
    `;

    const RightRocketField = styled.div`
      display: flex;
      flex-grow: 0;
      flex-shrink: 0;
      width: 1vw;
      background-color: teal;
      position: relative;
      z-index: 1;
      right: 0;
    `;

    const RocketLeft = styled.div`
      position: absolute;
      left: 0;
      top: ${leftPosition}%;
      width: 100%;
      height: ${ROCKET_WIDTH}vh;
      z-index: 2;
      background: blue;
    `;

    const RocketRight = styled.div`
      position: absolute;
      right: 0;
      top: ${rightPosition}%;
      width: 100%;
      height: ${ROCKET_WIDTH}vh;
      z-index: 2;
      background: blue;
    `;

    const Ball = styled.span`
      display: flex;
      position: absolute;
      left: ${ballPosition.x}%;
      top: ${ballPosition.y}%;
      border-radius: 50%;
      background: brown;
      z-index: 100;
      width: 1vw;
      height: 1vw;
    `;

    console.log(leftPosition, rightPosition, ballPosition);
    return <TableGrid>
        <LeftRocketField>
            <RocketLeft/>
        </LeftRocketField>
        <Ball/>
        <RightRocketField>
            <RocketRight/>
        </RightRocketField>
    </TableGrid>;
}

interface PingPongGameProps {
    onKeyDown: any;
    leftScore: number;
    rightScore: number;
    leftPosition: number;
    rightPosition: number;
    ballPosition: IBallPosition;
    gameState: GameState;
}

const PingPongGame: FunctionComponent<PingPongGameProps> = ({
                                                                onKeyDown,
                                                                leftScore,
                                                                rightScore,
                                                                leftPosition,
                                                                rightPosition,
                                                                ballPosition,
                                                                gameState
                                                            }) => {

    return <div onKeyDown={onKeyDown} tabIndex={1}>
        {gameState === GameState.Pause && <h1 >Press anything to start!</h1>}
        <Score leftScore={leftScore} rightScore={rightScore}/>
        <Table leftPosition={leftPosition} rightPosition={rightPosition} ballPosition={ballPosition}/>
    </div>
}

export default PingPongGame;
