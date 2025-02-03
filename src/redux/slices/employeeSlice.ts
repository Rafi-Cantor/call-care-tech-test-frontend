import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Employee } from '../../types/types';

const initialState: Employee = {
  user_id: null,
  user_name: null,
  xp: 0,
  level_id: 0,
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    setEmployeeData: (state, action: PayloadAction<Employee>) => {
      return action.payload; 
    },
    updateUserId: (state, action: PayloadAction<number>) => {
      state.user_id = action.payload; 
    },
    updateUserName: (state, action: PayloadAction<string>) => {
      state.user_name = action.payload; 
    },
    updateXp: (state, action: PayloadAction<number>) => {
      state.xp = action.payload; 
    },
    updateLevelId: (state, action: PayloadAction<number>) => {
      state.level_id = action.payload;
    }
  },
});

export const { setEmployeeData, updateUserId, updateUserName, updateXp, updateLevelId } = employeeSlice.actions;

export default employeeSlice.reducer;
