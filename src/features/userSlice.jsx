import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from 'react-hot-toast';
import axios from "axios";



export const searchUser = createAsyncThunk('searchUser', async(name, {rejectWithValue}) => {
    try {
        const response = await axios.get(`https://users-backend-1tvg.onrender.com/api/users/find?name=${name}`)
        if(response.data.error){
            toast(response.data.error)
            return rejectWithValue(String(response.data.error))
        }
        return response.data
    } catch (error) {
      return rejectWithValue(error)
    }
})

export const filterUsers = createAsyncThunk('filterUsers', async(args, {rejectWithValue}) => {
    try {
        const {domain, availability, gender} = args
        const response = await axios.get(`https://users-backend-1tvg.onrender.com/api/users/filtered-users?domain=${domain}&gender=${gender}&availability=${availability}`)
        if(response.data.error){
            toast(response.data.error)
            return rejectWithValue(String(response.data.error))
        }
        return response.data
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const showUsers = createAsyncThunk('showUsers', async(page, {rejectWithValue}) => {
    try {
        const response = await axios.get(`https://users-backend-1tvg.onrender.com/api/users?page=${page}`);
        console.log(response.data)
        return response.data
    } catch (error) {
       return rejectWithValue(error)        
    }
}) 

export const addUsers = createAsyncThunk('addUsers', async (args, { rejectWithValue }) => {
    try {
      const { id, first, last, email, gender, avatar, domain, available } = args;
      console.log(args)
      const response = await axios.post('https://users-backend-1tvg.onrender.com/api/users', {
        id, first, last, email, gender, avatar, domain, available
      });
      toast.success('User added')
      window.location.reload()
      return response.data;
    } catch (error) {
      // If an error occurs, reject the promise with the provided error value
      return rejectWithValue(error);
    }
  });

  export const deleteUsers = createAsyncThunk('deleteUsers', async(id, {rejectWithValue}) => {
        try {
            const response = await axios.delete(`https://users-backend-1tvg.onrender.com/api/users/${id}`)
            console.log(response.data)
            toast.success('User removed')
            window.location.reload()
            return response.data
        } catch (error) {
          return rejectWithValue(error)
        }
  })

   export const updateUsers = createAsyncThunk('updateUsers', async(args, {rejectWithValue}) => {
      try {
        const { userId,id, first, last, email, gender, avatar, domain, available } = args;
        const response = await axios.put(`https://users-backend-1tvg.onrender.com/api/users/${userId}`, {
            id, first, last, email, gender, avatar, domain, available 
          });

          const serializedData = JSON.parse(JSON.stringify(response.data));
          toast.success('User updated')
          window.location.reload()
          return serializedData;
      } catch (error) {
        return rejectWithValue(error)
      }
   })


let initialState = {
    users: [],
    loading: false,
    error: null
}

const userSlice = createSlice({
    name: "user",
    initialState,

    reducers: {
        updateSingleUser: (state, action) => {
            // Update the user in the state with the new information
            state.users = state.users.map((user) =>
              user.id === action.payload.id ? action.payload : user
            );
          },
    },
    extraReducers: (builder) => {
        builder
        .addCase(showUsers.pending, (state) => {
            state.loading = true;
        })
        .addCase(showUsers.fulfilled, (state, action) => {
            state.users = action.payload
            state.loading = false;
        })
        .addCase(showUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(addUsers.pending, (state) => {
            state.loading = true;
        })
        .addCase(addUsers.fulfilled, (state, action) => {
            state.users = [...state.users, action.payload];
            state.loading = false;
        })
        .addCase(addUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(deleteUsers.pending, (state) => {
            state.loading = true;
        })
        .addCase(deleteUsers.fulfilled, (state, action) => {
            state.loading = false;
            const { id } = action.payload;
            if (id) {
                state.users = state.users.filter((ele) => ele.id !== id);
            }
        })
        .addCase(deleteUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(updateUsers.pending, (state) => {
            state.loading = true;
        })
        .addCase(updateUsers.fulfilled, (state, action) => {
            state.loading = false;
        // Instead of directly updating the state here, dispatch the action
        // to update a single user
        userSlice.caseReducers.updateSingleUser(state, action);
        })
        .addCase(updateUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(filterUsers.pending, (state) => {
            state.loading = true;
        })
        .addCase(filterUsers.fulfilled, (state, action) => {
            state.users = action.payload
            state.loading = false;
        })
        .addCase(filterUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(searchUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(searchUser.fulfilled, (state, action) => {
            state.users = action.payload
            state.loading = false;
        })
        .addCase(searchUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})



export default userSlice.reducer
