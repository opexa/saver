import Data from './Data'
const baseUrl = 'progress'

class ProgressData {
  static getMonthProgress () {
    return Data.get(`${baseUrl}/month`, true)
  }

  static startMonthProgress () {
    return Data.get(`${baseUrl}/start`, true)
  }

  static finishMonth () {
    return Data.post(`${baseUrl}/finish`, {}, true)
  }
}

export default ProgressData