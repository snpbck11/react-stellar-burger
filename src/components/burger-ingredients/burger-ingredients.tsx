import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useSelector } from "../../hooks";
import { TIngredient } from "../../services/types/data";
import { Ingredient } from "../ingredient/ingredient";
import styles from "./burger-ingredients.module.css";

const BurgerIngredients: FC = () => {
  const [current, setCurrent] = useState('buns');
  const { ingredients } = useSelector(state => state.ingredients);

  const { ref: bunRef, inView: bunInView } = useInView({
    threshold: 0
  });

  const { ref: sauceRef, inView: sauceInView } = useInView({
    threshold: 0
  });

  const { ref: mainRef, inView: mainInView } = useInView({
    threshold: 0
  });

  const setTabFromScroll = useMemo(() => {
    bunInView ? setCurrent('buns')
      : sauceInView ? setCurrent('sauces')
        : mainInView ? setCurrent('main')
          : setCurrent('buns')
  }, [bunInView, sauceInView, mainInView]);

  const setTab = (tab: string) => {
    setCurrent(tab);
    const element = document.getElementById(tab);
    if (element) {
      return element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const { buns, sauces, main } = useMemo(() => {
    const buns = ingredients.filter((item: TIngredient) => item.type === 'bun');
    const sauces = ingredients.filter((item: TIngredient) => item.type === 'sauce');
    const main = ingredients.filter((item: TIngredient) => item.type === 'main');

    return { buns, sauces, main }
  }, [ingredients]);

  return (
    <section className={styles.wrpapper}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <div className={styles.tabs}>
        <Tab value="buns" active={current === "buns"} onClick={setTab}>Булки</Tab>
        <Tab value="sauces" active={current === "sauces"} onClick={setTab}>Соусы</Tab>
        <Tab value="main" active={current === "main"} onClick={setTab}>Начинки</Tab>
      </div>
      <div className={`${styles.container} custom-scroll`}>
        <h2 id="buns" className="text text_type_main-medium">Булки</h2>
        <ul ref={bunRef} className={`${styles.list} mt-6 ml-4 mr-4 mb-10`}>
          {buns.map((item: TIngredient) => (
            <Ingredient key={item._id} ingredient={item} />
          ))}
        </ul>
        <h2 id="sauces" className="text text_type_main-medium">Соусы</h2>
        <ul ref={sauceRef} className={`${styles.list} mt-6 ml-4 mr-4 mb-10`}>
          {sauces.map((item: TIngredient) => (
            <Ingredient key={item._id} ingredient={item} />
          ))}
        </ul>
        <h2 id="main" className="text text_type_main-medium">Начинки</h2>
        <ul ref={mainRef} className={`${styles.list} mt-6 ml-4 mr-4 mb-10`}>
          {main.map((item: TIngredient) => (
            <Ingredient key={item._id} ingredient={item} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default BurgerIngredients;