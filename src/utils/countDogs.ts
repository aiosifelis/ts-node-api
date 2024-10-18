export class CountDogs {
    constructor(public count: number) {
        this.count = count;
    }

    public get countDogs(): number {
        return this.count;
    }
}
