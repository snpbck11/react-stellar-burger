import PropTypes from "prop-types";
import { useState, useMemo } from "react";
import styles from "./burger-ingredients.module.css";
import Ingredient from "../ingredient/ingredient";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import { ingredientPropType } from "../../utils/prop-types"
 
export default function BurgerIngredients({handleClick, data}) {

  const [ingredient, setIngredient] = useState(null);
  
  const [current, setCurrent] = useState('buns');

  const onOpen = (item) => {
    handleClick(item);
    setIngredient(item);
  }

  const onClose = () => {
    setIngredient(null)
  }

  const setTab = (tab) => {
    setCurrent(tab)
    const element = document.getElementById(tab)
    if (element) {
     return element.scrollIntoView({behavior: 'smooth'})
    }
  }
  
  const buns = useMemo(() => data.filter((item) => item.type === 'bun'), [data])
  const sauces = useMemo(() => data.filter((item) => item.type === 'sauce'), [data])
  const main = useMemo(() => data.filter((item) => item.type === 'main'), [data])

  return(
    <section className={styles.section}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <div style={{display: "flex"}} className="mb-10">
        <Tab value="buns" active={current === "buns"} onClick={setTab}>Булки</Tab>
        <Tab value="sauces" active={current === "sauces"} onClick={setTab}>Соусы</Tab>
        <Tab value="main" active={current === "main"} onClick={setTab}>Начинки</Tab>
      </div>
      <div className={`${styles.container} custom-scroll`}>
        <h2 id="buns" className="text text_type_main-medium">Булки</h2>
        <ul className={`${styles.list} mt-6 ml-4 mr-4 mb-10`}>
          {buns.map((item) => (
            <Ingredient key={item._id} ingredient={item} handleIngredientClick={onOpen} />
          ))}
        </ul>
        <h2 id="sauces" className="text text_type_main-medium">Соусы</h2>
        <ul className={`${styles.list} mt-6 ml-4 mr-4 mb-10`}>
          {sauces.map((item) => (
            <Ingredient key={item._id} ingredient={item} handleIngredientClick={onOpen} />
          ))}
        <h2 id="main" className="text text_type_main-medium">Начинки</h2>  
        </ul> <ul className={`${styles.list} mt-6 ml-4 mr-4 mb-10`}>
          {main.map((item) => (
            <Ingredient key={item._id} ingredient={item} handleIngredientClick={onOpen} />
          ))}
        </ul>
      </div>
      {ingredient && <Modal onClose={onClose}>
          <IngredientDetails details={ingredient} />
        </Modal>}
    </section>
  )
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType),
  handleClick: PropTypes.func
}