import { _decorator, instantiate, Node, Prefab, Sprite, UITransform, Vec3 } from 'cc';

import { Thing } from '../../sobes-task';
import { GlobalResources } from '../../utils/GlobalResources';
import { IPrint } from './IPrint';
const { ccclass } = _decorator;


const THING_BASE_NAME = 'things/episode-1-tile-'

@ccclass('CocosPrint')
export class CocosPrint implements IPrint {

    private _cellPrefab: Prefab
    private _thingPrefab: Prefab
    private _container: Node
    private _offsetX: number
    private _offsetY: number
    private _screenWidth: number


    private _globalResource: GlobalResources

    constructor(globalResources: GlobalResources, cellPrefab: Prefab, thingPrefab: Prefab, container: Node, offsetX: number, offsetY: number, screenWidth: number) {
        this._globalResource = globalResources
        this._cellPrefab = cellPrefab
        this._thingPrefab = thingPrefab
        this._container = container
        this._offsetX = offsetX
        this._offsetY = offsetY
        this._screenWidth = screenWidth
    }

    public print(width: number, height: number, things: Thing[][]): void {
        let cellPositionX = 0

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let cell = instantiate(this._cellPrefab)

                cell.setParent(this._container)
                let cellUITransform = cell.getComponent(UITransform)
                cell.position = new Vec3(cellUITransform.width / 2 + x * (this._offsetX + cellUITransform.width), cellUITransform.height / 2 + y * (this._offsetY + cellUITransform.height))

                if (cellPositionX === 0 && x === width - 1) {
                    cellPositionX = cell.position.x + cellUITransform.width
                }

                if (things[y][x] != null) {
                    let thing = instantiate(this._thingPrefab)
                    let thingFrame = thing.getComponent(Sprite)
                    thingFrame.spriteFrame = this._globalResource.getFrame(THING_BASE_NAME + things[y][x].number)

                    thing.setParent(cell)
                }
            }
        }

        let newPosition = (this._screenWidth - cellPositionX) / 2

        this._container.worldPosition = new Vec3(newPosition, this._container.worldPosition.y, 0)
    }

}


