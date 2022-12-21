import { Model, DataTypes } from './deps.ts'

export class Wallets extends Model {
  static table = 'wallets'
  static timestamps = true

  static fields = {
    id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true },
    address: { type: DataTypes.STRING, unique: true },
    chain: { type: DataTypes.INTEGER },
    txnLength: { type: DataTypes.INTEGER, defaultValue: null },
    isRevoke: { type: DataTypes.BOOLEAN, defaultValue: false },
    lastBlock: { type: DataTypes.BIG_INTEGER },
  }
}

export class Txns extends Model {
  static table = 'txns'
  static timestamps = true

  static fields = {
    id: { primaryKey: true, type: DataTypes.BIG_INTEGER, autoIncrement: true },
    hash: { type: DataTypes.STRING, quote: true },
    from: { type: DataTypes.STRING },
    to: { type: DataTypes.STRING },
    value: { type: DataTypes.BIG_INTEGER },
    fee: { type: DataTypes.STRING },
    method: { type: DataTypes.STRING },
    type: { type: DataTypes.STRING },

    blockNumber: { type: DataTypes.BIG_INTEGER },
    blockHash: { type: DataTypes.STRING },
    blockTimestamp: { type: DataTypes.BIG_INTEGER },
    index: { type: DataTypes.INTEGER },
    nonce: { type: DataTypes.INTEGER },
    gas: { type: DataTypes.BIG_INTEGER },
    gasPrice: { type: DataTypes.BIG_INTEGER },
    input: { type: DataTypes.STRING },
    chain: { type: DataTypes.INTEGER },
    status: { type: DataTypes.BOOLEAN },

    // TODO: need to be optimized when upgrading/migrating
    details: { type: DataTypes.JSONB },
    receipt: { type: DataTypes.JSONB },

    isCompletion: { type: DataTypes.BOOLEAN, defaultValue: false },
  }
}

export class WalletAchievements extends Model {
  static table = 'achievements'
  static timestamps = true

  static fields = {
    id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true },
    address: { type: DataTypes.STRING, },
    achievementId: { type: DataTypes.STRING, },
    reasons: { type: DataTypes.JSONB },
  }
}

export class Tasks extends Model {
  static table = 'tasks'
  static timestamps = true

  static fields = {
    id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true },
    chain: { type: DataTypes.INTEGER },
    address: { type: DataTypes.STRING },
    details: { type: DataTypes.JSONB },

    // status the task is in
    status: { type: DataTypes.ENUM, values: ['ready', 'fetching', 'fetched'] },

    // high permission task, Ignore last block to fetch
    needToFetch: { type: DataTypes.BOOLEAN, defaultValue: false },

    // last block fetched
    lastBlock: { type: DataTypes.BIG_INTEGER },
  }
}
