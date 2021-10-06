import { createStore, createEvent } from "effector";

export const setTheme = createEvent<any>();

export const $themeStore = createStore({
  radius: '5px',
}).on(setTheme, (state, v) => ({ ...state, ...v }));

export const themeValues = $themeStore.map((state) => {
  return Object.keys(state).reduce(
    (acc, key) => ({
      ...acc,
      ...(state[key] && { [key]: state[key] }),
    }),
    {}
  );
});
