import axios from "axios";
import * as actions from "./index";

import { getAuthHeader } from "../../utils/tools";
axios.defaults.headers.post["Content-Type"] = "application/json";



export const updateSiteVars =(args)=>{
    return async (dispatch)=>{
        try{
            const site = await axios.patch(`/api/site`, args, getAuthHeader())

            dispatch(actions.updateSiteVars(site.data))
            dispatch(actions.successGlobal("Site information updated successfully!"));
        }catch(error){
            dispatch(actions.errorGlobal(error.response.data.message));
        }
    }
}