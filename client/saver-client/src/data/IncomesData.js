import Data from './Data'
const baseUrl = 'incomes'

class IncomesData {
  static addIncome (income) {
    return Data.post(`${baseUrl}/add`, income,  true)
  }

  static getRecentIncomes () {
    return Data.get(`${baseUrl}/recent`, true)
  }
}

export default IncomesData
