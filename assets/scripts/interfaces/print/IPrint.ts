import { Thing } from "../../sobes-task";


export interface IPrint {
    print(width: number, height: number, things: Thing[][]): void
}