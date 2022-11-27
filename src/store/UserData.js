import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "axios";

export const getUsers = createAsyncThunk("user/getUsers", async () => {
  const data = await Axios.get("http://localhost:3000/users");
  // console.log(data);
  return data.data;
});

export const addUsers = createAsyncThunk("user/addUsers", async (Data) => {
  Axios.post("http://localhost:3000/users", Data);
});

export const editUsers = createAsyncThunk("user/editUsers", async (Data) => {
  console.log("edited", Data);
  Axios.put(`http://localhost:3000/users/${Data.id}`, Data);
});

export const removeUsers = createAsyncThunk("user/removeUsers", async (id) => {
  Axios.delete(`http://localhost:3000/users/${id}`);
});

export const userSlice = createSlice({
  name: "user",
  initialState: [],
  reducers: {
    getUserData(state, action) {
      //Edit Logic
      const editedUser = state.findIndex(
        (user) => user.id === action.payload.id
      );
      if (state.find((user) => user.id === action.payload.id)) {
        state = state.splice(editedUser, 1, action.payload);
      } else {
        const Data = {
          ...action.payload,
        };
        state = state.push(Data);
      }
      // console.log("Edit user", action.payload);
      // if (action.payload.id) {
      //   const editedUserIndex = state.findIndex(
      //     (user) => user.id === action.payload.id
      //   );
      //   state = state.splice(editedUserIndex, 1, action.payload);
      // }
      //Add Logic
      // const UID = 1;
      // const findId = () => {
      //   const IdArr = state.map((data) => data.id);
      //   if (state.length === 0) {
      //     return UID;
      //   } else if (state.length > 0) {
      //     let UpdatedId = Math.max(...IdArr);
      //     UpdatedId = UpdatedId + 1;
      //     return UpdatedId;
      //   }
      // };
      //Add Logic
      // const Data = {
      //   ...action.payload,
      // };
      // state = state.push(Data);
    },
    // editUserData(state, action) {
    //   console.log("edituserData redux", action.payload);
    // },
    removeUserData(state, action) {
      return (state = state.filter((user) => user.id !== action.payload));
    },
    editUserdata(state, action) {
      const editUserIndex = state.findIndex(
        (user) => user.id === action.payload.id
      );
      state = state.splice(editUserIndex, 1, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.fulfilled, (state, action) => {
        //This State and action will give you the response which is coming from the JSON-server
        state = action.payload;
        return state;
      })
      .addCase(addUsers.fulfilled)
      .addCase(editUsers.fulfilled)
      .addCase(removeUsers.fulfilled);
  },
});

export const userActions = userSlice.actions;
