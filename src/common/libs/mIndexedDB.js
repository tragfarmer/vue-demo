/* eslint-disable space-before-function-paren */
/* eslint-disable no-trailing-spaces */
const dbName = 'test'
const dbVersion = 1
export default {
  // 处理 IndexedDB 兼容
  indexedDB: window.indexedDB || window.webkitindexedDB || window.msIndexedDB || window.mozIndexedDB,
  
  // tables: {
  //   teacher: {
  //     name: "teacher",
  //     key: "id",
  //     cursorIndex: [{ name: "teachNum", unique: false }]
  //   },
  //   student: {
  //     name: "student",
  //     key: "id",
  //     cursorIndex: [{ name: "stuNum", unique: false }]
  //   }
  // }

  async initDB(tables) {
    // let _this = this
    let request = this.indexedDB.open(dbName, dbVersion)

    // 打开数据库失败
    request.onerror = function() {
      console.log('IndexedDB Failed to Open')
    }
    
    // 打开数据库成功
    request.onsuccess = function() {
      console.log('IndexedDB Open Successfully')
    }

    // 如果指定的版本号，大于数据库的实际版本号，就会发生数据库升级事件
    request.onupgradeneeded = function(event) {
      let db = event.target.result
      for (let table in tables) {
        if (!db.objectStoreNames.contains(table.name)) {
          let objectStore = db.createObjectStore(table.name,
            {
              // 设置主键
              keyPath: table.key // , 
              // 如果数据记录里面没有合适作为主键的属性，那么可以让 IndexedDB 自动生成主键。
              // autoIncrement: true
            }
          )
          for (let i = 0; i < table.cursorIndex.length; i++) {
            const element = table.cursorIndex[i]
            /**
             * 三个参数分别为：
             * 索引名称、索引属性名、配置对象（unique 为 true 时，说明这个值是唯的）。
             */
            objectStore.createIndex(element.name, element.name, {
              unique: element.unique
            })
          }
        }
      }
    }
  },

  // 打开数据库
  openDB() {
    return new Promise((resolve, reject) => {
      let request = this.indexedDB.open(dbName, dbVersion)

      request.onerror = function(event) {
        let msg = 'IndexedDB Failed to Open'
        reject(msg)
      }
      request.onsuccess = function(event) {
        resolve(event.target.result)
      }
    })
  },
  // 删除表
  deleteDB: function(table) {
    let deleteQuest = this.indexedDB.deleteDatabase(table)
    let isOk = false
    deleteQuest.onerror = function() {
      // 删除失败
      isOk = false
      return Promise.resolve(isOk)
    }
    deleteQuest.onsuccess = function() {
      // 删除成功
      isOk = true
      return Promise.resolve(isOk)
    }
  },
  // 关闭数据库
  closeDB: async function(db) {
    try {
      let d
      if (!db) {
        d = await this.openDB()
      }
      let closeQuest = d.closeDB()
      let isOk = false
      return new Promise(resolve => {
        closeQuest.onerror = function() {
          // 关闭失败
          isOk = false
          resolve(isOk)
        }
        closeQuest.onsuccess = function() {
          // 关闭成功
          isOk = true
          resolve(isOk)
        }
      })
    } catch (error) {
      return Promise.resolve(false)
    }
  },
  // 添加数据，add添加新值
  insert: async function(table, data) {
    try {
      let db = await this.openDB()
      let request = db
        .transaction(table.name, 'readwrite')
        .objectStore(table.name)
        .add(data)

      return new Promise((resolve, reject) => {
        request.onerror = function() {
          let msg = 'Error adding data'
          reject(msg)
        }
        request.onsuccess = function() {
          resolve(true)
        }
      })
    } catch (error) {
      console.log(error)
      return Promise.resolve(false)
    }
  },
  // 更新
  update: async function(table, data) {
    try {
      let db = await this.openDB()
      let request = db
        .transaction(table.name, 'readwrite')
        .objectStore(table.name)
        .put(data)
      return new Promise(resolve => {
        request.onerror = function() {
          resolve(false)
        }
        request.onsuccess = function() {
          resolve(true)
        }
      })
    } catch (error) {
      return Promise.resolve(false)
    }
  },
  // 删除数据
  delete: async function(table, keyValue) {
    try {
      let db = await this.openDB()
      let request = db
        .transaction(table.name, 'readwrite')
        .objectStore(table.name)
        .delete(keyValue)
      return new Promise(resolve => {
        request.onerror = function() {
          resolve(false)
        }
        request.onsuccess = function() {
          resolve(true)
        }
      })
    } catch (error) {
      return Promise.resolve(false)
    }
  },
  // 清空数据
  clear: async function(table) {
    let db = await this.openDB()
    let store = db.transaction(table.name, 'readwrite').objectStore(table.name)
    store.clear()
  },
  // 查询数据 表名 索引值 索引 key  没有value key为key 而不是索引
  get: async function(table, keyValue, indexCursor) {
    try {
      let db = await this.openDB()
      let store = db
        .transaction(table.name, 'readonly')
        .objectStore(table.name)
      let request
      request = !keyValue
        ? store.openCursor()
        : indexCursor
          ? store.index(indexCursor).get(keyValue)
          : store.get(keyValue)
      let data = []
      return new Promise(resolve => {
        request.onerror = function() {
          resolve('Query data failed')
        }
        request.onsuccess = function(event) {
          if (!keyValue && !indexCursor) {
            if (event.target.result) {
              data.push(event.target.result.value)
              event.target.result.continue()
            } else {
              resolve(data)
            }
          } else {
            resolve([event.target.result])
          }
        }
      })
    } catch (error) {
      return Promise.reject(error)
    }
  },
  //   通过游标操作数据, callback中要有游标移动方式
  handleDataByCursor: async function(table, keyRange) {
    try {
      let kRange = keyRange || ''
      let db = await this.openDB()
      let store = db.transaction(table, 'readwrite').objectStore(table)
      let request = store.openCursor(kRange)
      return new Promise(resolve => {
        request.onerror = function() {
          resolve('Acquiring Data Error by Cursor')
        }
        request.onsuccess = function(event) {
          let cursor = event.target.result
          resolve(cursor)
        }
      })
    } catch (error) {
      return Promise.reject(error)
    }
  },
  // 通过索引游标操作数据, callback中要有游标移动方式
  handleDataByIndex: async function(table, keyRange, sursorIndex) {
    try {
      let kRange = keyRange || ''
      let db = await this.openDB()
      let store = db.transaction(table, 'readwrite').objectStore(table)
      let request = store.index(sursorIndex).openCursor(kRange)
      return new Promise(resolve => {
        request.onerror = function() {
          resolve('Acquiring Data Error by Cursor')
        }
        request.onsuccess = function(event) {
          let cursor = event.target.result
          if (cursor) {
            resolve(cursor)
          }
        }
      })
    } catch (error) {
      return Promise.reject(error)
    }
  },
  // 创建游标索引
  createCursorIndex: async function(table, cursorIndex, unique) {
    var db = await this.openDB()
    let store = db.transaction(table, 'readwrite').objectStore(table)
    store.createIndex(cursorIndex, cursorIndex, {
      unique: unique
    })
    return Promise.resolve()
  }
}
