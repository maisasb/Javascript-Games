const useCustomEvent = () => {
  const dispatch = (key, value) => {
    const customEvent = new CustomEvent(key, {
      detail: {
        value,
      },
    });
    document.dispatchEvent(customEvent);
  };

  const consume = (key, callback) => {
    document.addEventListener(key, (e) => {
      callback(e.detail.value);
    });
  };

  return {
    dispatch,
    consume,
  };
};

export default useCustomEvent;
