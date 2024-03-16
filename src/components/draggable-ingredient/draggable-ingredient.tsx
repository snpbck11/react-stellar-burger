import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useRef } from "react";
import { DropTargetOptions, useDrag, useDrop } from "react-dnd";
import { TIngredient } from "../../services/types/data";
import styles from "./draggable-ingredient.module.css";

interface IDraggableIngredientProps {
  id?: string;
  ingredient: TIngredient;
  index: number;
  moveIngredient: (dragIndex: number, hoverIndex: number) => void;
  handleDeleteIngredient: (ingredient: TIngredient) => void;
};

const DraggableIngredient: FC<IDraggableIngredientProps> = ({ id, ingredient, index, moveIngredient, handleDeleteIngredient }) => {
  const ref = useRef<HTMLLIElement>(null);

  const [, drop] = useDrop({
    accept: "draggable",
    hover: (item: TIngredient, monitor: DropTargetOptions) => {
      if (!ref.current) {
        return
      };

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return
      };

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      };
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      };
      moveIngredient(dragIndex, hoverIndex)
      item.index = hoverIndex
    }
  });

  const [{ isDragging }, drag] = useDrag({
    type: "draggable",
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  const handleClose = () => {
    handleDeleteIngredient(ingredient);
  };

  drag(drop(ref));

  const opacity = isDragging ? 0 : 1;

  return (
    <li ref={ref} className={styles.element} style={{ opacity }} data-index={index}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={handleClose}
      />
    </li>
  );
};

export default DraggableIngredient;
