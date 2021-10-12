
import { createStore, createEvent, } from 'effector';

export const addNotification = createEvent<any>()
export const deleteNotification = createEvent<string>()

const timeouts = []

export const $notificationStore = createStore({
  items: [],
})
  .on(addNotification, (state, item) => {

    const items = [item, ...state.items]

    timeouts.forEach(id => {
      clearInterval(id)
    })

    items.forEach(({ id }, index) => {
      timeouts.push(setTimeout(() => {
        deleteNotification(id)
      }, 3000 + index * 3000))
    })


    return {
      ...state,
      items
    }
  })
  .on(deleteNotification, (state, id) => ({
    ...state,
    items: state.items.filter(({ id: _id }) => _id !== id)
  }))