import { useState, useMemo, useEffect } from "react";
import styles from "./burger-ingredients.module.css";
import Ingredient from "../ingredient/ingredient";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components"
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import { getIngredients } from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { closeIngredientDetails, showIngredientDetails } from "../../services/reducers/ingredient-details";
import { useInView } from "react-intersection-observer";
 
export default function BurgerIngredients() {
  const [current, setCurrent] = useState('buns');
  const { ingredients } = useSelector(state => state.ingredients);
  const { ingredientDetails } = useSelector(state => state.ingredientDetails);
  const dispatch = useDispatch();

  const {ref: bunRef, inView: bunInView } = useInView({
    threshold: 0
  })

  const {ref: sauceRef, inView: sauceInView } = useInView({
    threshold: 0
  })

  const {ref: mainRef, inView: mainInView } = useInView({
    threshold: 0
  })

  const setTabFromScroll = useMemo(() => {
    bunInView ? setCurrent('buns') 
    : sauceInView ? setCurrent('sauces') 
    : mainInView ? setCurrent('main') 
    : setCurrent('buns')
  }, [bunInView, sauceInView, mainInView])
  
  useEffect(() => {
    window.addEventListener('scroll', setTabFromScroll);
    return window.removeEventListener('scroll', setTabFromScroll);
  }, [setTabFromScroll]);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const onOpen = (item) => {
    dispatch(showIngredientDetails(item));
  }

  const onClose = () => {
    dispatch(closeIngredientDetails());
  }

  const setTab = (tab) => {
    setCurrent(tab);
    const element = document.getElementById(tab);
    if (element) {
     return element.scrollIntoView({behavior: 'smooth'});
    }
  }
  
  const buns = useMemo(() => ingredients.filter((item) => item.type === 'bun'), [ingredients]);
  const sauces = useMemo(() => ingredients.filter((item) => item.type === 'sauce'), [ingredients]);
  const main = useMemo(() => ingredients.filter((item) => item.type === 'main'), [ingredients]);

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
        <ul ref={bunRef} className={`${styles.list} mt-6 ml-4 mr-4 mb-10`}>
          {buns.map((item) => (
            <Ingredient key={item._id} ingredient={item} handleIngredientClick={onOpen} />
          ))}
        </ul>
        <h2 id="sauces" className="text text_type_main-medium">Соусы</h2>
        <ul ref={sauceRef} className={`${styles.list} mt-6 ml-4 mr-4 mb-10`}>
          {sauces.map((item) => (
            <Ingredient key={item._id} ingredient={item} handleIngredientClick={onOpen} />
          ))}
        </ul> 
        <h2 id="main" className="text text_type_main-medium">Начинки</h2>  
        <ul ref={mainRef} className={`${styles.list} mt-6 ml-4 mr-4 mb-10`}>
          {main.map((item) => (
            <Ingredient key={item._id} ingredient={item} handleIngredientClick={onOpen} />
          ))}
        </ul>
      </div>
      {ingredientDetails && <Modal onClose={onClose}>
          <IngredientDetails details={ingredientDetails} />
        </Modal>}
    </section>
  )
}