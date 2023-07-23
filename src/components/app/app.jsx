import { useState, useEffect } from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import request from "../../utils/api";
import { BurgerContext } from "../../utils/burger-context";

function App() {

  const [state, setState] = useState({
    data: null,
    loading: false,
    isError: true
  })

  const [selectedIngredients, setSelectedIngredients] = useState({
    bun: {},
    ingredients: []
  })

  useEffect(() => {
    const getIngredientData = async () => {
      setState({...state, loading: true})
      try {
        request(`/ingredients`)
        .then((data) => setState({...state, data: data, loading: false, isError: false}))        
      } catch(err) {
        setState({...state, isError: true})
        console.log(`Ошибка ${err}`)
      }
    }
    getIngredientData();
  }, []);

  const handleClick = (ingredient) => {
    ingredient.type !== 'bun' ? setSelectedIngredients({...selectedIngredients, ingredients: [...selectedIngredients.ingredients, ingredient]}) :
     setSelectedIngredients({...selectedIngredients, bun: ingredient});
  }
 
  return (
    <>
      <AppHeader />
      <BurgerContext.Provider value={selectedIngredients}>
      {state.isError ? <h1>Произошла ошибка, перезагрузите страницу</h1> : 
        <main className={styles.main}>
        <BurgerIngredients handleClick={handleClick} data={state.data.data}/>
        <BurgerConstructor />
        </main>
      }
      </BurgerContext.Provider>
    </>
  );
}

export default App;