import { Vec2 } from "cc";
import { IPrint } from "./interfaces/print/IPrint";

export class Position {
    public x: number
    public y: number

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    isNeighbor(position: Vec2) {
        return (position.x == this.x && (Math.abs(position.y - this.y) == 1))
            || (position.y == this.y && (Math.abs(position.x - this.x) == 1));
    }

    isEqual(position: Vec2) {
        return this.x === position.x && this.y === position.y;
    }
}

export class Thing {
    public x: number
    public y: number
    public number: number

    constructor(position: Position, number: number) {
        this.x = position.x;
        this.y = position.y;
        this.number = number;
    }

    get position(): Position {
        return new Position(this.x, this.y);
    }
}

export class LevelMap {
    /**
     *
     * @param {Object[]} things
     */

    private _width: number
    private _height: number

    private _print: IPrint = null
    public field: Thing[][] = []

    constructor(things: Thing[], print: IPrint) {
        this._print = print
        // вычисляем ширину и высоту поля
        // координаты начинаются с 0 (левый нижний угол!!!)

        this._width = Math.max(...things.map(thing => thing.x)) + 1;
        this._height = Math.max(...things.map(thing => thing.y)) + 1;
        console.log(this._width, this._height);

        // Создаем двумерный массив field и заполняем его things.
        // в конструкции field[y][x] y - первая координата, это индекс строки, а x - индекс столбца
        // Если по координате не лежит переданный thing, то там null!
        this.field = [];

        for (let y = 0; y < this._height; y++) {
            let row: Thing[] = [];

            for (let x = 0; x < this._width; x++) {
                row[x] = null
            }

            this.field[y] = row
        }

        things.forEach(rawThing => (this.field[rawThing.y][rawThing.x] = new Thing(new Position(rawThing.x, rawThing.y), rawThing.number)));
        console.log(this.field);
    }

    /**
     * Возвращает true если эти 2 финга можно соединить.
     * Выходить за пределы поля НЕЛЬЗЯ!
     * @param thing1
     * @param thing2
     * @returns {boolean}
     */
    canConnect(thing1, thing2) {
        return true;
    }

    print() {
        this._print.print(this._width, this._height, this.field)
        // let s = '';
        // for (let y = this._height - 1; y >= 0; --y) {
        //     for (let x = 0; x < this._width; ++x) {
        //         s += (null === this.field[y][x] ? '■' : this.field[y][x].number);
        //     }
        //     s += '\n';
        // }

        // console.log(s);
    }
}

// const levelMap = new LevelMap([{ 'x': 4, 'y': 4, 'number': 9 }, { 'x': 4, 'y': 6, 'number': 9 }, { 'x': 2, 'y': 2, 'number': 1 }, { 'x': 3, 'y': 2, 'number': 2 }, { 'x': 2, 'y': 3, 'number': 2 }, { 'x': 3, 'y': 3, 'number': 3 }, { 'x': 6, 'y': 3, 'number': 4 }, { 'x': 2, 'y': 4, 'number': 5 }, { 'x': 3, 'y': 4, 'number': 6 }, { 'x': 5, 'y': 4, 'number': 6 }, { 'x': 6, 'y': 4, 'number': 7 }, { 'x': 3, 'y': 5, 'number': 4 }, { 'x': 4, 'y': 5, 'number': 8 }, { 'x': 5, 'y': 5, 'number': 7 }, { 'x': 6, 'y': 5, 'number': 1 }, { 'x': 3, 'y': 6, 'number': 3 }, { 'x': 5, 'y': 6, 'number': 8 }, { 'x': 6, 'y': 6, 'number': 5 }]);
// levelMap.print();


/*

■■■3985
■■■4871
■■56967
■■23■■4
■■12■■■
■■■■■■■
■■■■■■■

 */