import PropTypes from "prop-types";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./draggable-ingredient.module.css";
import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";
import { ingredientPropType } from "../../utils/prop-types";

export default function DraggableIngredient ({id, ingredient, index, moveIngredient, handleDeleteIngredient}) {
  const ref = useRef(null);

  const [,drop] = useDrop({
    accept: "draggable",
    hover: (item, monitor) => {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      moveIngredient(dragIndex, hoverIndex)
      item.index = hoverIndex
    }

  })

  const [{ isDragging }, drag] = useDrag({
    type: "draggable",
    item: {id, index},
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  })
 
  const handleClose = () => {
    handleDeleteIngredient(ingredient);
  }

  drag(drop(ref))

  const opacity = isDragging ? 0 : 1;

  return (
    <li ref={ref} className={styles.element} style={{opacity}} index={index}>
      <DragIcon />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={handleClose}
      />
    </li>
  )
}

DraggableIngredient.propTypes = {
  id: PropTypes.string,
  ingredient: ingredientPropType,
  index: PropTypes.number,
  moveIngredient: PropTypes.func,
  handleDeleteIngredient: PropTypes.func
}
