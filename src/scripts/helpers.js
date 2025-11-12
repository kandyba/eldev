const regex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const time = 200;
let throttlePause;

export const throttle = (callback) => {
  if (throttlePause) return;

  throttlePause = true;
  setTimeout(() => {
    callback();
    throttlePause = false;
  }, time);
};

export const validateEmail = (email) => regex.test(email);
