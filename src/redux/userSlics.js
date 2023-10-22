import { createSlice } from "@reduxjs/toolkit";
import { user } from "../asset/data";



const initialState ={
    user: JSON.parse(window?.localStorage.getItem("user")) ?? user,
    edit:false,
};

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
       login(state,action){
        state.user = action.payload;
        localStorage.setItem("user",JSON.stringify(action.payload));
       }, 
        
       logout(state){
        state.user = null;
        localStorage?.removeItem("user");
       },

       updateProfile(state,action){
        state.edit = action.payload;
       },
    },
});

export default userSlice.reducer;

export  function UserLogin(user){
    return (dispatch,getState) =>{
        dispatch(userSlice.actions.login(user))
    }
}


export  function logout(){
    return (dispatch,getState) =>{
        dispatch(userSlice.actions.logout())
    };
}

export function updateProfile(val){
    return (dispatch,getState) =>{
        dispatch(userSlice.actions.updateProfile(val));
    };
}







