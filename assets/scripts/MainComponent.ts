import { _decorator, CCFloat, Component, Prefab, UITransform } from 'cc';

import { CocosPrint } from './interfaces/print/CocosPrint';
import { LevelMap, Position, Thing } from './sobes-task';
import { GlobalResources } from './utils/GlobalResources';


const { ccclass, property } = _decorator;


@ccclass('MainComponent')
export class MainComponent extends Component {
    @property(UITransform)
    readonly uiTransorm: UITransform

    @property(Prefab)
    readonly cellPrefab: Prefab

    @property(Prefab)
    readonly thingPrefab: Prefab

    @property(CCFloat)
    readonly screenWidth: number = 1080

    @property(CCFloat)
    readonly offsetX: number = 4

    @property(CCFloat)
    readonly offsetY: number = 4


    protected async start() {
        let resources = new GlobalResources()
        await resources.loadFrameDir()

        let things: Thing[] = [
            new Thing(new Position(4, 4,), 9),
            new Thing(new Position(4, 6,), 9),
            new Thing(new Position(2, 2,), 1),
            new Thing(new Position(3, 2,), 2),
            new Thing(new Position(2, 3,), 2),
            new Thing(new Position(3, 3,), 3),
            new Thing(new Position(6, 3,), 4),
            new Thing(new Position(2, 4,), 5),
            new Thing(new Position(3, 4,), 6),
            new Thing(new Position(5, 4,), 6),
            new Thing(new Position(6, 4,), 7),
            new Thing(new Position(3, 5,), 4),
            new Thing(new Position(4, 4,), 8),
            new Thing(new Position(5, 5,), 7),
            new Thing(new Position(6, 5,), 1),
            new Thing(new Position(3, 6,), 3),
            new Thing(new Position(5, 6,), 8),
            new Thing(new Position(6, 6,), 5)
        ]

        let print = new CocosPrint(resources,
            this.cellPrefab, this.thingPrefab, this.node,
            this.offsetX, this.offsetY, this.screenWidth)

        const levelMap = new LevelMap(things, print);
        levelMap.print()
    }
}