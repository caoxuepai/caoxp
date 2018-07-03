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

/*
 @param String name  cookie名  （必须）
 @param String value cookie值  （必须）
 @param term         cookie存活时间(必须)  时间秒数
 * */
export function setCookie(name, value, term) {

  const param1 = name + '=' + escape(value) + ';';

  expires = new Date();
  if (!term) {
    term = 1800;
  }
  expires.setTime(expires.getTime() + 1000 * term);
  const param2 = 'expires=' + expires.toUTCString() + ';';
  document.cookie = param1 + param2 + ';path=/';
}

export function getCookie(name) {
  const cookie_name = name + '=';
  const cookie_length = document.cookie.length;
  let cookie_begin = 0;
  while (cookie_begin < cookie_length) {
    const value_begin = cookie_begin + cookie_name.length;
    if (document.cookie.substring(cookie_begin, value_begin) == cookie_name) {
      let value_end = document.cookie.indexOf(';', value_begin);
      if (value_end == -1) {
        value_end = cookie_length;
      }
      return unescape(document.cookie.substring(value_begin, value_end))
    }
    cookie_begin = document.cookie.indexOf(' ', cookie_begin) + 1;
    if (cookie_begin == 0) {
      break;
    }
  }
  return null;
}

export function delCookie(name) {
  let exp = new Date();
  exp.setTime(exp.getTime() - 1);
  const cval = getCookie(name);
  if (cval != null) {
    document.cookie = name + '=' + cval + ';path=/;expires=' + exp.toUTCString();
  }
}
