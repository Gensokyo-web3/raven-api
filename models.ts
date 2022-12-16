import { Model, DataTypes } from './deps.ts'

export class Wallets extends Model {
  static table = 'wallets'
  static timestamps = true

  static fields = {
    id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true },
    address: { type: DataTypes.STRING, unique: true },
    txnLength: { type: DataTypes.INTEGER, defaultValue: null },
    isRevoke: { type: DataTypes.BOOLEAN, defaultValue: false },
  }
}

export class Txns extends Model {
  static table = 'txns'
  static timestamps = true

  static fields = {
    id: { primaryKey: true, type: DataTypes.BIG_INTEGER, autoIncrement: true },
    block: { type: DataTypes.BIG_INTEGER },
    hash: { type: DataTypes.STRING, quote: true },
    from: { type: DataTypes.STRING },
    to: { type: DataTypes.STRING },
    value: { type: DataTypes.BIG_INTEGER },
    fee: { type: DataTypes.STRING },
    method: { type: DataTypes.STRING },
    type: { type: DataTypes.STRING },
    details: { type: DataTypes.JSON },
    blockHash: { type: DataTypes.STRING },
    blockTimestamp: { type: DataTypes.BIG_INTEGER },
    index: { type: DataTypes.INTEGER },
    nonce: { type: DataTypes.INTEGER },
    gas: { type: DataTypes.BIG_INTEGER },
    gasPrice: { type: DataTypes.BIG_INTEGER },
    input: { type: DataTypes.STRING },
    chain: { type: DataTypes.INTEGER },
    status: { type: DataTypes.BOOLEAN },
  }
}


export class WalletAchievements extends Model {
  static table = 'achievements'
  static timestamps = true

  static fields = {
    id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true },
    address: { type: DataTypes.STRING, },
    achievementId: { type: DataTypes.INTEGER, },
  }
}
