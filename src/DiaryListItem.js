import React, { useContext, useRef, useState } from "react";
import { DiaryDispatchContext } from "./App";
const DiaryListItem = ({ author, content, created_date, emotion, id }) => {
  const { onRemove, onEdit } = useContext(DiaryDispatchContext);
  const [isEdit, setIsEdit] = useState(false);
  const toggleIsEdit = () => setIsEdit(!isEdit);

  const [localContent, setLocalContent] = useState(content);
  const localContentInput = useRef();

  const handleRemove = () => {
    if (window.confirm(`${id}번째 일기를 삭제 하겠습니까?`)) {
      onRemove(id);
    }
  };

  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(content);
  };

  const handleEdit = () => {
    if (localContent.length < 5) {
      localContentInput.current.focus();
      return;
    }

    if (window.confirm(`${id}번째 일기를 수정하겠습니까?`)) {
      onEdit(id, localContent);
      toggleIsEdit();
    }
  };

  return (
    <div className="DiaryListItem">
      <div className="info">
        <span>
          작성자 : {author} | 감정점수: {emotion}
        </span>
        <br />
        <span className="date"> {new Date(created_date).toLocaleString()}</span>
      </div>
      <div className="content">
        {isEdit ? (
          <textarea
            value={localContent}
            onChange={(e) => setLocalContent(e.target.value)}
            ref={localContentInput}
          ></textarea>
        ) : (
          <div>{content}</div>
        )}
      </div>
      <div>
        {isEdit ? (
          <>
            <button onClick={handleEdit}>수정하기</button>
            <button onClick={handleQuitEdit}>수정취소</button>
          </>
        ) : (
          <>
            <button onClick={toggleIsEdit}>수정하기</button>
            <button onClick={handleRemove}>삭제하기</button>
          </>
        )}
      </div>
    </div>
  );
};

export default React.memo(DiaryListItem);
