export function setCookie(key, value, expireHours = 1) {
    let now = new Date();
    let time = now.getTime();
    time += 3600 * 1000 * expireHours;
    now.setTime(time);
    document.cookie = 
    key + '=' + value + 
    '; expires=' + now.toUTCString() + 
    '; path=/';
}

export function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}