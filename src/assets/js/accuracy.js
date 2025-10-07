/* eslint-disable no-unused-vars */
//乘法
function accMul(arg1, arg2) {
  var m = 0,
    s1 = arg1.toString(),
    s2 = arg2.toString();
  try {
    m += s1.split(".")[1].length;
  } catch (e) {
    // 处理没有小数部分的情况
  }
  try {
    m += s2.split(".")[1].length;
  } catch (e) {
    // 处理没有小数部分的情况
  }
  return (
    (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) /
    Math.pow(10, m)
  );
}
//加法
function accAdd(arg1, arg2) {
  var r1, r2, m;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  return (arg1 * m + arg2 * m) / m;
}

// 导出函数供其他模块使用
if (typeof module !== "undefined" && module.exports) {
  module.exports = { accMul, accAdd };
} else if (typeof window !== "undefined") {
  window.accMul = accMul;
  window.accAdd = accAdd;
}
