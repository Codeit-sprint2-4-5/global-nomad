import classNames from "classnames/bind";
import styles from "./Category.module.scss";

const cn = classNames.bind(styles);

interface CategoryProps {
  category: "문화 · 예술" | "식음료" | "스포츠" | "투어" | "관광" | "웰빙";
  active?: boolean;
  onClick: (category: string) => void;
}

export default function Category({ category, active = false, onClick }: CategoryProps) {
  const handleClick = () => {
    onClick(category);
  };

  return (
    <div className={cn("category", `${active ? "category-active" : ""}`)} onClick={handleClick}>
      {category}
    </div>
  );
}
