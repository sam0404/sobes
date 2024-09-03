import { _decorator, resources, SpriteFrame } from 'cc';
const { ccclass, } = _decorator;

const FRAME_PATH = "things/"

@ccclass('GlobalResources')
export class GlobalResources {
    private _resourcesFrame = {}

    public async loadFrameDir() {
        return new Promise<SpriteFrame[]>((resolve, rejected) => {
            resources.loadDir(FRAME_PATH, SpriteFrame, (err, assets) => {
                if (assets == null || assets.length == 0) {
                    rejected('SpriteFrame ' + FRAME_PATH + ' not found')
                }

                for (let i = 0; i < assets.length; i++) {
                    const asset = assets[i]
                    const name = FRAME_PATH + asset.name

                    this._resourcesFrame[name] = asset
                }

                resolve(assets)
            })
        })
    }


    public getFrame(path: string): SpriteFrame {
        const result = this._resourcesFrame[path]
        if (!result) {
            console.warn('Frame by path ' + path + ' not found')

            return null
        }

        return result
    }
}