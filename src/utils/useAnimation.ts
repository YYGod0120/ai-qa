/**
* @description: 一个生成动画控制函数的工厂函数（使用闭包）
* @param 
startValue:变量原始值
endValue:变量最终值
duration:动画时长
el:执行滚动动画的元素
} 
* @return: null
*/
export function doAnimation(
  startValue: number,
  endValue: number,
  duration: number,
  el: { scrollTop: number }
) {
  //使用闭包保存变量dy和step(每次动画滚动的距离)
  let dy = 0;
  let step = (endValue - startValue) / (duration / 10);
  //返回动画控制函数
  return function (interval) {
    dy += step;
    if (dy >= endValue - startValue) {
      clearInterval(interval);
    }
    el.scrollTop += step;
  };
}
