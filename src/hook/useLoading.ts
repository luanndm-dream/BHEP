import { useAppDispatch } from "src/redux/reduxHook"
import { changeLoading } from "src/redux/slice/appLoadingSlice";

const useLoading =() =>{
    const dispatch = useAppDispatch();
    const changeLoadingStatus = (isLoading:Boolean) =>{
        dispatch(changeLoading(isLoading))
    };

    const showLoading = () =>{
        changeLoadingStatus(true);
    }
    const hideLoading = () =>{
        changeLoadingStatus(false);
    }
    return { showLoading, hideLoading };

}
export default useLoading