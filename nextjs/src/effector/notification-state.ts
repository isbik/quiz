
import { createStore, createEvent, } from 'effector';

export const addNotification = createEvent<any>()
export const deleteNotification = createEvent<string>()

export const $notificationStore = createStore({
  items: [],
})
  .on(addNotification, (state, item) => {

    setTimeout(() => {
      deleteNotification(item.id)
    }, 3000)

    return {
      ...state,
      items: [item, ...state.items]
    }
  })
  .on(deleteNotification, (state, id) => ({
    ...state,
    items: state.items.filter(({ id: _id }) => _id !== id)
  }))