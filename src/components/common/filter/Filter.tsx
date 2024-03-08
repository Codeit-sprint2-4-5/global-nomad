import { Dispatch, SetStateAction, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Filter.module.scss";
import Image from "next/image";
import { ICON } from "@/constants/importImages";

const cn = classNames.bind(styles);

interface FilterProps {
  setPriceSort: Dispatch<SetStateAction<string>>;
}

export default function Filter({ setPriceSort }: FilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDropdownClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleDropdownOptionClick = (option: string) => {
    setPriceSort(option);
    setIsOpen(false);
  };
  return (
    <div className={cn("dropdown")}>
      <button className={cn("dropdown-button", `${isOpen ? "open" : ""}`)} onClick={handleDropdownClick}>
        <span>가격</span>
        <Image src={ICON.filter.default.src} alt={ICON.filter.default.alt} height={22} width={22} />
      </button>
      {isOpen && (
        <div className={cn("dropdown-menu")}>
          <button onClick={() => handleDropdownOptionClick("price_asc")}>가격이 낮은 순</button>
          <button onClick={() => handleDropdownOptionClick("price_desc")}>가격이 높은 순</button>
        </div>
      )}
    </div>
  );
}
