import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';

export type State = {data: string};
export type UpdatePreviewAction = {type: "UpdatePreview", data: string};
export type ReduxBehindTheScenes = any;
export type DispatchActions = UpdatePreviewAction;
export type Action = DispatchActions | ReduxBehindTheScenes;

function reducer(state: State = {data: ""}, action: Action): State {
    switch (action.type) {
        case "UpdatePreview": return {...state, data: action.data};
        default: return state;
    }
}

export function updateAction(data: string): UpdatePreviewAction {
    return {type: "UpdatePreview", data};
}

export function createStore(): Redux.Store<State, Action> {
    return Redux.createStore(reducer);
}

export function useSelector<TSelected>(selector: (state: State) => TSelected) {
    return ReactRedux.useSelector<State, TSelected>(selector);
}

export function useDispatch() {
    return ReactRedux.useDispatch<Redux.Dispatch<DispatchActions>>();
}