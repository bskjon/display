import { BehaviorSubject } from "rxjs"

export class IdBehaviourSubject<T> extends BehaviorSubject<T> {
    constructor(private _id: String, private _initialValue: T) {
        super(_initialValue)
    }

    get id(): String {
        return this._id;
    }

    getId(): String {
        return this._id;
    }
}


export class LiveWatt {
    id: String
    timestamp: String
    power: number
}

