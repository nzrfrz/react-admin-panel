import { 
    useCallback, 
    useMemo, 
    useRef,
} from "react";
import debounce from "lodash.debounce";

/**
 * useDebounce
 * Use to record a string or any primitive data type with delay.
 * 
 * Use it with useState hook, like 
 * const debounceSave = useDebounce((nextValue) => setInputValue(nextValue), 1000);
 * setInputValue() is the hook to store onChange function of input.
 * nextValue is the event.target.value from input field.
 * Call this function inside onChnage input field.
*/
export const useDebounce = (callback: (...args: string[]) => void, delay: number) => {
    const debounceFN = useCallback(
        debounce((...args: string[]) => callback(...args), delay), [callback, delay]
    );

    return debounceFN;
};


/**
 * useFuncDebounce
 * Use to run a function with delay.
 * Like record the mouse pointer location inside the selected DOM, etc 
*/
export function useFuncDebounce<T extends (...args: never[]) => void>(
    fn: T,
    ms: number,
    maxWait?: number
) {
    const funcRef = useRef<T | null>(null);
    funcRef.current = fn;

    return useMemo(() => 
        debounce(
            (...args: Parameters<T>) => {
                if (funcRef.current) {
                    funcRef.current(...args);
                }
            }, ms, { maxWait },
        ),
        [ms, maxWait]
    );
};