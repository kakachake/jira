import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface State {
  projectModalOpen: boolean;
}

const initialState: State = {
  projectModalOpen: false,
};

//创建切片
export const projectListSlice = createSlice({
  //slice名,标识slice本身，在代码中没用很大作用
  name: "projectListSlice",
  //初始值
  initialState,
  //reducers
  reducers: {
    openProjectModal(state) {
      state.projectModalOpen = true;
    },
    closeProjectModal(state) {
      state.projectModalOpen = false;
    },
  },
});

export const projectListActions = projectListSlice.actions;

export const selectProjectModalOpen = (state: RootState) => {
  return state.projectList.projectModalOpen;
};
