import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//import {fetchDataFromServer} from '../../../slice/desinersSlice'
import { RootState } from '../../../store/store';
import { Dispatch } from 'redux';

export function TopDesingners () {
    const dispatch: Dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(fetchDataFromServer());
    // }, [dispatch]);

    //const designerData = useSelector((state: RootState) => state.designer.data);


}