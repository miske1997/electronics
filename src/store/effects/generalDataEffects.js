import { setCategories } from "../slices/generalSlice"
import { GetMainCategorys } from "../../services/categoryService";
export function fetchGeneralData() {
    // fetchTodoByIdThunk is the "thunk function"
    return async function fetchTodoByIdThunk(dispatch, getState) {
      
      const data = await GetMainCategorys()
      dispatch(setCategories(data))
    }
  }