import { EventEmitter } from 'events'
import ProfileData from '../data/ProfileData'
import profileActions from '../actions/ProfileActions'
import dispatcher from '../dispatcher'

class ProfileStore extends EventEmitter {
  getUserInfo () {
    ProfileData
      .getUserInfo()
      .then(data => this.emit(this.eventTypes.USER_INFO_FETCHED, data))
  }

  getPersonalInfo () {
    ProfileData
      .getPersonalInfo()
      .then(data => this.emit(this.eventTypes.PERSONAL_INFO_FETCHED, data))
  }

  editPersonalInfo (data) {
    ProfileData
      .editPersonalInfo(data)
      .then(data => this.emit(this.eventTypes.PERSONAL_INFO_EDITED, data))
  }

  handleAction (action) {
    switch (action.type) {
      case profileActions.types.GET_USER_INFO: {
        this.getUserInfo()
        break
      }
      case profileActions.types.GET_PERSONAL_INFO: {
        this.getPersonalInfo()
        break
      }
      case profileActions.types.EDIT_PERSONAL_INFO: {
        this.editPersonalInfo(action.data)
        break
      }
      default: break
    }
  }
}

let profileStore = new ProfileStore()

profileStore.eventTypes = {
  USER_INFO_FETCHED: 'user_info_fetched',
  PERSONAL_INFO_FETCHED: 'personal_info_fetched',
  PERSONAL_INFO_EDITED: 'personal_info_edited'
}

dispatcher.register(profileStore.handleAction.bind(profileStore))

export default profileStore