import Data from './Data'
const baseUrl = 'spendings'

class SpendingsData {
  static addSpending (spending) {
    return Data.post(`${baseUrl}/add`, spending,  true)
  }

  static getRecentSpendings () {
    return Data.get(`${baseUrl}/recent`, true)
  }
}

export default SpendingsData
