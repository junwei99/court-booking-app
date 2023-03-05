import { readonly, ref, type Ref, type UnwrapRef } from "vue"

export const useState = <T>(
  initialState: T
): [Ref<UnwrapRef<T>>, (newValue: T) => void] => {
  const state = ref(initialState)
  const setState = (newState: T) => {
    ;(state.value as T) = newState
  }

  //readonly state casted as a normal ref to solve typing headaches when dealing with function parameteres and interacting with external libraries

  //mutating the state will not change the value but will not throw error in typescript
  return [readonly(state) as Ref<UnwrapRef<T>>, setState]
}
