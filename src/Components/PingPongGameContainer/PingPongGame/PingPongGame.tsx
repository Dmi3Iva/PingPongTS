import React, {FunctionComponent} from "react";
import {IBallPosition} from "../../../Common/IBallPosition";
import styled from "styled-components";


interface ScoreProps {
    leftScore: number;
    rightScore: number;
}

const Score: FunctionComponent<ScoreProps> = ({leftScore, rightScore}) => {
    const ScoreStyle = styled.h1`
      text-align: center;
      position: absolute;
      width: 100%;
      text-align: center;
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
      height: 2vh;
      z-index: 2;
    `;

    const RocketRight = styled.div`
      position: absolute;
      right: 0;
      top: ${rightPosition}%;
      width: 100%;
      height: 2vh;
      z-index: 2;
    `;

    const Ball = styled.span`
      display: flex;
      position: absolute;
      left: ${ballPosition.x}%;
      top: ${ballPosition.y}%;
      border-radius: 50%;
      background: brown;
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
    leftScore: number;
    rightScore: number;
    leftPosition: number;
    rightPosition: number;
    ballPosition: IBallPosition;
}

const PingPongGame: FunctionComponent<PingPongGameProps> = ({
                                                                leftScore,
                                                                rightScore,
                                                                leftPosition,
                                                                rightPosition,
                                                                ballPosition
                                                            }) => {
    // add some handlers for buttons
    console.log('executed');
    return <>
        <Score leftScore={leftScore} rightScore={rightScore}/>
        <Table leftPosition={leftPosition} rightPosition={rightPosition} ballPosition={ballPosition}/>
    </>
}

export default PingPongGame;
