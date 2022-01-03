import { useCallback, useState } from 'react';

const INITIAL_ASYNC_PROCESS_STATE: AsyncProcessState = {
    isRequestPending: false,
    isRequestFetched: false,
    data: null,
    error: null,
};

function useAsyncProcess<Data>(options?: UseAsyncProcessOptions<Data>) {
    const { initialState, shouldResetDataWhenPending = true } = options || {};
    const [asyncState, setAsyncState] = useState<AsyncProcessState<Data>>(initialState || INITIAL_ASYNC_PROCESS_STATE);
    const asyncStateSetter = useCallback<AsyncStateSetter<Data>>((state) => setAsyncState(state), []);

    const runAsyncProcess: AsyncProcessCallBack<Data> = useCallback(
        (promise, responseSerializer) => {
            asyncStateSetter({
                isRequestPending: true,
                isRequestFetched: false,
                data: null,
                error: null,
            });

            promise
                .then((response) => {
                    asyncStateSetter({
                        isRequestPending: false,
                        isRequestFetched: true,
                        data: responseSerializer ? responseSerializer(response) : response,
                        error: null,
                    });
                })
                .catch((error) => {
                    asyncStateSetter({
                        isRequestPending: false,
                        isRequestFetched: true,
                        data: null,
                        error,
                    });
                });

            return promise;
        },
        [asyncStateSetter, shouldResetDataWhenPending],
    );

    return {
        state: asyncState,
        setState: asyncStateSetter,
        runAsyncProcess,
    };
}

export default useAsyncProcess;
export { INITIAL_ASYNC_PROCESS_STATE };
