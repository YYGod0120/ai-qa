import { useState } from 'react';

const question = [
  '请推荐重庆的三个最热门的景点',
  '洪崖洞位于什么地方',
  '重庆游玩行程快速规划',
  '观音桥附近有什么推荐的小吃店铺',
];
const question_class = 'border border-img-selected p-4 rounded';
const question_class_select = ' bg-img-selected text-white';
const question_class_noselect = ' bg-bg-selected  text-img-selected';
export default function FQ() {
  const [selectId, setSelectId] = useState(question.length + 1);
  return (
    <div className="mt-5 grid cursor-pointer grid-cols-2 gap-3">
      {question.map((item, index) => {
        return (
          <div
            key={index}
            onClick={() => {
              setSelectId(index);
            }}
            className={
              question_class +
              (selectId === index
                ? question_class_select
                : question_class_noselect)
            }
          >
            <span>{item}</span>
          </div>
        );
      })}
    </div>
  );
}
