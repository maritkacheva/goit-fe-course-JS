
const load = key => {
  try {
    const serializedState = localStorage.getItem(key);

    return serializedState === null ? null : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error);
  }
};

const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error);
  }
};

const remove = key =>{
  try{
    localStorage.removeItem(key);
  }catch(error){
    console.error('Set state error:', error);
  }
}

export default{ load, save, remove }
