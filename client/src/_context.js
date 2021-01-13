
import { createContext } from 'preact';

export const context = {};

let builtContext = createContext(context);

let { Provider, Consumer } = builtContext;

let reducer = (state, action) => {
    if (action instanceof Array) {
        let o = {}
        action.forEach( s => o[s.type] = s.data )
        return { ...state, ...o}
    }
    return { ...state, [action.type]: action.data };
};

export { Provider, Consumer, builtContext, reducer };

export default builtContext;
