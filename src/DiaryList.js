import DiaryListItem from "./DiaryListItem";
import { DiaryStateContext } from "./App";

import { useContext } from "react";
const DiaryList = ({ onRemove, onEdit }) => {
  const diaryList = useContext(DiaryStateContext);
  return (
    <div className="DiaryList">
      <h2>일기 리스트</h2>
      <h4>{diaryList.length}개의 일기가 있습니다.</h4>
      <div>
        {diaryList.map((item) => (
          <DiaryListItem
            onEdit={onEdit}
            onRemove={onRemove}
            key={item.id}
            {...item}
          />
        ))}
      </div>
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
