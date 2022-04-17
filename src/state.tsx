export type ReqEntry = {
    id: number,
    from: string,
    to: string,
    data: ReqData | null
}

export type GeoPoint = {
    name: string,
    x: number,
    y: number
}

export type ReqData = {
    from: GeoPoint | null,
    to: GeoPoint | null,
    route: Array<GeoPoint> | null
}

export type ComponentsData = {
    border: number,
    filteredList: Array<ReqEntry>,
    selected: number,
    edited: number,
    fromSelectedList: Array<GeoPoint>,
    toSelectedList: Array<GeoPoint>
}


export type State = {
    mapPointer: any,
    List: Array<ReqEntry>,
    SelectedReq: ReqData,
    components: ComponentsData
}

const initialState: State = {
    mapPointer: null,
    List : [],
    SelectedReq: {
        from: null,
        to: null,
        route: null
    },
    components: {
        border: 400,
        filteredList: [],
        selected: -1,
        edited: -1,
        fromSelectedList: [],
        toSelectedList: []
    }
}

export {initialState as default}