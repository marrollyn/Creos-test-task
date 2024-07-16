import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DesignerList } from "../types/index.tsx";
import { getDesignerApi } from "../components/Api/api.tsx";
import { Dispatch } from 'redux';
import { RootState, AppDispatch } from "../store/store.tsx";


// interface initialState {
//     DesignerList;
// }

const designerListApi = getDesignerApi()
    .then((data) => {
    console.log(data);
    return data;
    })
    .catch((error) => {
    console.error("Произошла ошибка при получении данных:", error);
    });

const initialState:DesignerList = {
    count: 0,
    next: '',
    previous: null,
    results: [{
        avatar: '',
        username: '',
        thumbnails: {
            avatar: '',
            avatar_2x: '',
            avatar_webp: '',
            avatar_webp_2x: '',
        },
        issues: [{
            key: '',
            date_created: '',
            status: '', //"Done" | "In Progress";
        }]
}]
}

// const designerListSlice = createSlice({
//     name: 'designerList',
//     initialState,
//     reducers: { toggleLike: {
//             reducer: (state, action: PayloadAction<TrackModel>) => {
//                 //const likedId = action.payload.id
//                 const trackLiked = state.tracks.find(track => track.id === action.payload.id);
//                 trackLiked.isLiked = !trackLiked.isLiked ;
//                 console.log(action.payload.id, trackLiked)
//                 // if (trackLiked) {
//                 //     state.tracks[trackLiked].isLiked = !state.tracks[trackLiked].isLiked;
//                 // }

//       },
//     },},
//     selectors: {
//         selectTracks: (sliceState) => {
//             return sliceState.tracks
//         }
//     }
// })

// export const { selectTracks } = tracksSlice.selectors

// export default tracksSlice.reducer;

// export const { toggleLike } = tracksSlice.actions;

export const designerSlice = createSlice({
    name: "designer",
    initialState: {

    },
    reducers: {
        
    },
});

//export const { setData, setLoading, setError } = designerSlice.actions;

export default designerSlice.reducer;

// export const fetchDataFromServer = () => async (dispatch) => {
//     dispatch(setLoading(true));
    
//     try {
//         const response = await fetch('https://api.example.com/designer');
//         const data = await response.json();
    
//         dispatch(setData(data));
//     } catch (error) {
//         dispatch(setError(error.message));
//     }
    
//     dispatch(setLoading(false));
//     };

// export const fetchDataFromServer = (dispatch: Dispatch) => {
//     dispatch(setLoading(true));

//     getDesignerApi()
//         .then((data) => {
//             dispatch(setData(data));
//         })
//         .catch((error) => {
//             dispatch(setError(error.message));
//         })
//         .finally(() => {
//             dispatch(setLoading(false));
//         });
// };

// export const fetchDataFromServer = () => async (dispatch: AppDispatch, getState: () => RootState) => {
//     dispatch(setLoading(true));

//     try {
//         const data = await getDesignerApi();
//         dispatch(setData(data));
//     } catch (error: any) {
//         dispatch(setError(error.message));
//     } finally {
//         dispatch(setLoading(false));
//     }
// };