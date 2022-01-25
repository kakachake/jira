import { useEffect, useRef, useState } from "react";

export const isFalse = (value: unknown): boolean => {
  return value === 0 ? false : !value;
};

export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

//在一个函数里，改变传入的对象本身是不好的
export const cleanObject = (object: { [key: string]: unknown }) => {
  // let obj = Object.assign({}, object);
  const result = { ...object };
  for (let key in result) {
    if (isVoid(result[key])) {
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
export const useThrottle = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  let timer: React.MutableRefObject<NodeJS.Timeout | null> = useRef(null);
  //useRef 中timer.current的改变不会触发页面的重新渲染
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

//练习hook
export const useArray = <T>(
  array: T[]
): {
  value: T[];
  clear: () => void;
  removeIndex: (i: number) => void;
  add: (val: T) => void;
} => {
  const [value, setValue] = useState(array);
  const clear = () => {
    setValue([]);
  };
  const removeIndex = (i: number) => {
    const arr = [...value];
    arr.splice(i, 1);
    setValue(arr);
  };
  const add = (val: T) => {
    setValue([...value, val]);
  };
  return {
    value,
    clear,
    removeIndex,
    add,
  };
};

//修改页面标题
//1. 使用react-helmet
//2. 自定义hook
export const useDocumentTitile = (
  title: string,
  keepOnUnmount: boolean = true
) => {
  //useRef的值在组件生命周期不会改变
  const oldTitle = useRef(document.title).current;

  useEffect(() => {
    document.title = title;
  }, [title]);

  //这个Effect将在页面卸载时被调用
  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        // 如果不指定依赖，读到的就是旧title
        document.title = oldTitle;
      }
    };
  }, []);
};

export const resetRoute = () => (window.location.href = window.location.origin);

/**
 * 返回组件的挂载状态，如果还没挂载或者已经卸载，返回false，否则true
 **/
export const useMountRef = () => {
  const moutedRef = useRef(false);

  useEffect(() => {
    moutedRef.current = true;
    return () => {
      moutedRef.current = false;
    };
  });
  return moutedRef;
};
