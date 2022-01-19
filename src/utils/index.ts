import { useEffect, useRef, useState } from "react";

export const isFalse = (value: unknown): boolean => {
  return value === 0 ? false : !value;
};

//在一个函数里，改变传入的对象本身是不好的
export const cleanObject = (object: { [key: string]: string }) => {
  // let obj = Object.assign({}, object);
  const result = { ...object };
  for (let key in result) {
    if (isFalse(result[key])) {
      delete result[key];
    }
  }
  return result;
};

export const useMount = (cb: Function) => {
  useEffect(() => {
    cb();
  }, []);
};

//防抖
export const debounce = (func: Function, delay: number) => {
  let timer: NodeJS.Timeout | null = null;
  return function (...args: []) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};
// const log = debounce(() => console.log(123), 200);

//节流
export const throttle = (func: Function, delay: number, immediate: boolean) => {
  let timer: NodeJS.Timeout | null = null;
  return function (...args: []) {
    if (timer) {
      return;
    } else {
      timer = setTimeout(() => {
        func.apply(this, args);
        timer = null;
      }, delay);
    }
    if (immediate) {
      func.apply(this, arguments);
    }
  };
};
// const log = throttle((arg) => console.log(arg), 1000);

//防抖 hook
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    //每次在value变化以后，设置一个定时器
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    //每次在上一个useEffect处理完之后运行。React 会在执行当前 effect 之前对上一个 effect 进行清除。
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
};

//节流hook
export const useThrottle = (value: unknown, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  let timer: React.MutableRefObject<NodeJS.Timeout | null> = useRef(null);
  useEffect(() => {
    //如果当前有定时器，则不做操作
    if (timer.current) {
      return;
    } else {
      //如果当前没有定时器，则设置定时器
      timer.current = setInterval(() => {
        setDebouncedValue(value);
        //定时器结束后手动清空定时器
        clearInterval(timer.current as NodeJS.Timeout);
        timer.current = null;
      }, delay);
    }
  }, [value, delay]);
  return debouncedValue;
};
