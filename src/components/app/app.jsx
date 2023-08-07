import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { useSelector } from "react-redux";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {

  const { ingredientsFailed } = useSelector(state => state.ingredients);

  return (
    <>
      <AppHeader />
      {ingredientsFailed ? <h1>Произошла ошибка, перезагрузите страницу</h1> 
      : <main className={styles.main}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
        </main>
      }
    </>
  );
}

export default App;