import {IBallPosition} from "./IBallPosition";
import {PingPongVectorMax, PingPongVectorMin} from "./constants";

export const getPingPongRandomVector = (): IBallPosition => {

    const xSign: number = Math.random() < 0.5 ? 1 : -1;
    const ySign: number = Math.random() < 0.5 ? 1 : -1;

    const result: IBallPosition = {
        x: xSign * (Math.random() * (PingPongVectorMax - PingPongVectorMin) + PingPongVectorMin),
        y: ySign * (Math.random() * (PingPongVectorMax - PingPongVectorMin) + PingPongVectorMin)
    };
    console.log("rand", result);
    return result;
}

export const random = (left: number, right: number): number => (Math.random() * (right - left) + left);

export const randomChoice = (left: number, right: number): number => Math.random() < .5 ? left : right;

