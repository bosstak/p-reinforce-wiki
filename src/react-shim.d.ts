declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

declare module 'react' {
  export = React;
  export as namespace React;
}

declare namespace React {
  type FC<P = {}> = (props: P) => any;
  type ReactNode = any;
  function useState<T>(initialState: T | (() => T)): [T, (newState: T | ((prevState: T) => T)) => void];
  function useEffect(effect: () => void | (() => void), deps?: any[]): void;
  function useMemo<T>(factory: () => T, deps: any[]): T;
  function useCallback<T extends (...args: any[]) => any>(callback: T, deps: any[]): T;
  function useRef<T>(initialValue?: T): { current: T };
  interface HTMLAttributes<T> {
    [key: string]: any;
  }
}
