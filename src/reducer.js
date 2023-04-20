export const initialState = {
    user: null,
    playlists: [],
    spotify: null,
    playing: false,
    item: null,
    //token: 'BQBmHGYVnOq6GLJSHzfKMufh4wqmo8f5CMDF9Hj06XD1ip-7U8Io0lN44SgaWlihrBv6M0qj82fcYNlWRgzVVvKx9hbzuUu8vvt5hqaZs3dF8wwTFlWJASUORzEGvcVLHJF9AsvWWPH6_FP3dUCOyehezTdAdZl1LKLZNim1aCXN9u05',
};

/* state is object attribute, action is for setting its value */
const reducer = (state, action) => {
    console.log(action);

    // Action -> type, [payload]

    switch(action.type){
        case 'SET_USER':
            return {
                ...state, //save the current state
                user: action.user //update to new state
            };

        case 'SET_TOKEN':
            return {
                ...state,
                token: action.token,
            };

        case 'SET_PLAYLISTS':
            return {
                ...state,
                playlists: action.playlists,
            };

        case 'SET_DISCOVER_WEEKLY':
            return {
                ...state,
                discover_weekly: action.discover_weekly,
            };

        case 'SET_ITEM':
            return {
                ...state,
                item: action.item,
            }
        
        case 'SET_PLAYING':
            return {
                ...state,
                playing: action.playing,
            }

        case 'SET_SPOTIFY':
            return {
                ...state,
                spotify: action.spotify,
            }
        default:
            return state;
    }
}

export default reducer;