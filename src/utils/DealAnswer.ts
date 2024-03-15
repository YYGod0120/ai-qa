import { AI } from '@/store';
// 不是正在输入的回答都直接转化为一个字符串
export function DealAnswer(answer: AI) {
  if (!answer.some((item) => item.isChatting)) {
    return answer.map((answer) => answer.answer).join(',');
  }
}
