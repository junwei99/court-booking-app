import { cloneDeep } from "lodash"

export default function resetStore({ store }: { store: any }) {
  const initialState = cloneDeep(store.$state)
  store.$reset = () => store.$patch(cloneDeep(initialState))
}
