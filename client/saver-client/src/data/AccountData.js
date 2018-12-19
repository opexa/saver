import Data from './Data'

const baseUrl = 'account'

class AccountData {
  static register (user) {
    return Data.post(`${baseUrl}/register`, user, false, false)
  }

  static login (user) {
    return Data.post('http://localhost:11754/Token', user, false, true)
  }
}

export default AccountData
