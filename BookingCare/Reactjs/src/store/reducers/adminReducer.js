import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    roles: [],
    positions: [],
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            console.log('fire fetch gender start:', actions);
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            console.log('fire fetch gender success:', actions);
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_FAIDED:
            console.log('fire fetch gender failed:', actions);
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default adminReducer;