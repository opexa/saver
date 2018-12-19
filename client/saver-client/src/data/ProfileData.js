import Data from './Data'

const baseUrl = 'profile'

class ProfileData {
  static getUserInfo () {
    return Data.get(`${baseUrl}/info`, true)
  }

  static getPersonalInfo () {
    return Data.get(`${baseUrl}/PersonalInfo`, true)
  }

  static editPersonalInfo (data) {
    return Data.put(`${baseUrl}/PersonalInfo`, data, true)
  }
}

export default ProfileData