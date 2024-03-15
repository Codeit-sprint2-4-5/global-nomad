import { RefObject } from "react";

import BaseButton from "@/components/common/button/BaseButton";
import classNames from "classnames/bind";
import styles from "../question/Question.module.scss";
import { instance } from "@/apis/axios";

const cn = classNames.bind(styles);

interface Props {
  dialogRef: RefObject<HTMLDialogElement>;
  activityId: number | null;
  handleDeleteClick: (id: number) => void;
}

export default function DeleteQuestion({
  dialogRef,
  activityId,
  handleDeleteClick,
}: Props) {
  async function deleteActivity(activityId: number) {
    await instance.delete(`/my-activities/${activityId}`);
  }

  const handleCloseClick = () => {
    if (!dialogRef.current) return;
    dialogRef.current.close();
  };

  return (
    <>
      <dialog className={cn("container")} ref={dialogRef}>
        <p className={cn("text")}>체험을 삭제하시겠습니까??</p>
        <div className={cn("button-group")}>
          <BaseButton
            onClick={handleCloseClick}
            size={"sm"}
            variant={"outline"}
            text={"아니오"}
          />
          <BaseButton
            onClick={() => handleDeleteClick(activityId)}
            size={"sm"}
            text={"삭제하기"}
          />
        </div>
      </dialog>
    </>
  );
}
