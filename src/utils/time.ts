import dayjs from 'dayjs';
export function getCurrentTime() {
  // 获取当前时间
  const currentTime = dayjs();

  // 格式化时间，如果需要的话
  const formattedTime = currentTime.format('YYYY-MM-DD HH:mm:ss');

  return formattedTime; // 或者返回 currentTime，根据需要
}
