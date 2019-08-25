
import axios from "axios";
const URL = 'http://localhost:3000/notes';

export const getNotes = async () => {
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch(error){
    throw error;
  }
};

export const saveNote = async (note) =>{
  try{
    const response = await axios.post(URL, note);
    return response.data;
  } catch (error){
    throw error;
  }
};

export const deleteNote = async (id) =>{
  try{
    const response = await axios.delete(`${URL}/${id}`);
    return response.data;
  } catch (error){
    throw error;
  }
};

export const updateNote = async (id, updatedContent) =>{
  try{
    const response = await axios.patch(`${URL}/${id}`);
    return response.data;
  }catch (error){
    throw error;
  }
};