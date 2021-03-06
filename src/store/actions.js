import * as types from './mutation-types'

export const selectPlay = function({commit, state}, {list, index}) {
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAY_STATE, true)
  commit(types.SET_PLAY_LIST, list)
  commit(types.SET_SEQUENCE_LIST, list)
  commit(types.SET_CURRENTINDEX, index)
}
