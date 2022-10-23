import { BehaviorSubject } from "rxjs"
import { View, ViewType } from "./View.model"

export class ObservableView {
    viewId: string
    type: ViewType
    viewWrapper: BehaviorSubject<View>
}