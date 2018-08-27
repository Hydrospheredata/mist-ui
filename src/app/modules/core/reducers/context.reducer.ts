import { ContextActions, ContextActionTypes } from '@app/modules/core/actions';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Context } from '@app/modules/shared/models';

export interface State extends EntityState<Context> { };

export const adapter = createEntityAdapter<Context>({
    selectId: (context: Context) => context.name,
    sortComparer: false
})

const initialState: State = adapter.getInitialState();

export function reducer(state = initialState, action: ContextActions): State {
    switch (action.type) {
        case ContextActionTypes.GetContextSuccess: {
            return adapter.addAll(action.payload, state);
        }
        case ContextActionTypes.AddContextSuccess: {
            return adapter.addOne(action.context, state);
        }
        default: {
            return state;
        }
    }
}