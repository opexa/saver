import Data from './Data'

const baseUrl = 'strategy'

class StrategyData {
  static addStrategy (strategy) {
    return Data.post(`${baseUrl}/add`, strategy, true, false)
  }
}

export default StrategyData
