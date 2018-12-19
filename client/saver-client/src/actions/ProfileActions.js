import dispatcher from '../dispatcher'

const AccountActions = {
  types: {
    GET_USER_INFO: 'GET_USER_INFO',
    GET_PERSONAL_INFO: 'GET_PERSONAL_INFO',
    EDIT_PERSONAL_INFO: 'EDIT_PERSONAL_INFO'
  },
  getUserInfo () {
    dispatcher.dispatch({
      type: this.types.GET_USER_INFO
    })
  },
  getPersonalInfo () {
    dispatcher.dispatch({
      type: this.types.GET_PERSONAL_INFO
    })
  },
  editPersonalInfo (data) {
    dispatcher.dispatch({
      type: this.types.EDIT_PERSONAL_INFO,
      data
    })
  }
}

export default AccountActions
