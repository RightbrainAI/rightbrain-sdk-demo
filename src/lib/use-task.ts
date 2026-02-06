import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type State<Data> =
  | {
      isPending: true;
      error: null;
      data: null;
    }
  | {
      isPending: false;
      error: Error;
      data: null;
    }
  | {
      isPending: false;
      error: null;
      data: Data;
    }
  | {
      isPending: false;
      error: null;
      data: null;
    };

const useTask = <TArgs extends unknown[], TResult>(
  task: (...args: TArgs) => Promise<TResult>,
) => {
  const [state, setState] = useState<State<TResult>>({
    data: null,
    error: null,
    isPending: false,
  });

  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  const runTask = useCallback(
    async (...params: TArgs): Promise<TResult> => {
      abortControllerRef.current?.abort();

      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      setState({
        isPending: true,
        error: null,
        data: null,
      });

      try {
        const taskResult = await new Promise<TResult>((resolve, reject) => {
          abortController.signal.addEventListener(
            "abort",
            () => {
              reject(new DOMException("Request was aborted", "AbortError"));
            },
            { once: true },
          );

          return task(...params)
            .then(resolve)
            .catch(reject);
        });

        if (!abortController.signal.aborted) {
          setState({
            isPending: false,
            error: null,
            data: taskResult,
          });
          return taskResult;
        }

        throw new DOMException("Request was aborted", "AbortError");
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") {
          throw new DOMException("Request was aborted", "AbortError");
        }

        const error =
          err instanceof Error ? err : new Error("An unknown error occurred");
        if (!abortController.signal.aborted) {
          setState({ isPending: false, error, data: null });
        }
        throw error;
      } finally {
        if (abortControllerRef.current === abortController) {
          abortControllerRef.current = null;
        }
      }
    },
    [task],
  );

  const reset = useCallback(() => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;

    setState({ isPending: false, error: null, data: null });
  }, []);

  return useMemo(
    () => ({
      ...state,
      runTask,
      reset,
    }),
    [runTask, state, reset],
  );
};

export default useTask;
