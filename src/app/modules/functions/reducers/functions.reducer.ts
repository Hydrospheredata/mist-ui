import { FunctionActions, FunctionActionTypes } from '@app/modules/functions/actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Function } from '@app/modules/shared/models';

export interface State extends EntityState<Function> { }

export const adapter: EntityAdapter<Function> = createEntityAdapter<Function>({
    selectId: (fn: Function) => fn.name,
});

export const initialState: State = adapter.getInitialState();

export function reducer(state = initialState, action: FunctionActions): State {
    switch (action.type) {
        case FunctionActionTypes.GetSuccess: {
            return adapter.addAll(action.payload, state);
        }
        case FunctionActionTypes.AddSuccess: {
            return adapter.addOne(action.payload, state);
        }
        case FunctionActionTypes.UpdateSuccess: {
            return adapter.updateOne({
                id: action.payload.name,
                changes: action.payload
            }, state);
        }

        default: {
            return state;
        }
    }
}
