/*
 * 验证是否是有效手机号
 * 正则制作日期2017.6.2，
 * 注意该正则的实时使用性，添加新的号段
*/
export function isRealPhone(mobile) {
  var patten1 = /^1(3[456789]{1}|47|5[012789]{1}|78|8[23478]{1})\d{8}$/;   //移动
  var patten2 = /^1(3[012]{1}|45|5[56]{1}|76|8[56]{1})\d{8}$/;             //联通
  var patten3 = /^1(33|53|77|73|49|8[019]{1})\d{8}$/;                      //电信
  var patten4 = /^17[01]{1}\d{8}$/;                                        //虚拟运营商

  if (patten1.test(mobile)) {
    return 1;
  } else if (patten2.test(mobile)) {
    return 2;
  } else if (patten3.test(mobile)) {
    return 3;
  } else if (patten4.test(mobile)) {
    return 4;
  } else {
    return false;
  }
}
/*
 * 验证邮箱格式
*/
export function isEmail(str) {
  var reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  return reg.test(str);
}
