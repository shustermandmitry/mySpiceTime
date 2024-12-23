'use strict'
// packages/internal/graphql/client/src/index.ts
var __assign = (this && this.__assign) || function() {
  __assign = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i]
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p]
    }
    return t
  }
  return __assign.apply(this, arguments)
}
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k
  var desc = Object.getOwnPropertyDescriptor(m, k)
  if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = {
      enumerable: true, get: function() {
        return m[k]
      },
    }
  }
  Object.defineProperty(o, k2, desc)
}) : (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k
  o[k2] = m[k]
}))
var __exportStar = (this && this.__exportStar) || function(m, exports) {
  for (var p in m) if (p !== 'default' && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p)
}
var __awaiter = (this && this.__awaiter) || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value)
    })
  }

  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value))
      } catch (e) {
        reject(e)
      }
    }

    function rejected(value) {
      try {
        step(generator['throw'](value))
      } catch (e) {
        reject(e)
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected)
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next())
  })
}
var __generator = (this && this.__generator) || function(thisArg, body) {
  var _ = {
    label: 0, sent: function() {
      if (t[0] & 1) throw t[1]
      return t[1]
    }, trys: [], ops: [],
  }, f, y, t, g
  return g = {
    next: verb(0),
    'throw': verb(1),
    'return': verb(2),
  }, typeof Symbol === 'function' && (g[Symbol.iterator] = function() {
    return this
  }), g

  function verb(n) {
    return function(v) {
      return step([n, v])
    }
  }

  function step(op) {
    if (f) throw new TypeError('Generator is already executing.')
    while (g && (g = 0, op[0] && (_ = 0)), _) try {
      if (f = 1, y && (t = op[0] & 2 ? y['return'] : op[0] ? y['throw'] || ((t = y['return']) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t
      if (y = 0, t) op = [op[0] & 2, t.value]
      switch (op[0]) {
        case 0:
        case 1:
          t = op
          break
        case 4:
          _.label++
          return { value: op[1], done: false }
        case 5:
          _.label++
          y = op[1]
          op = [0]
          continue
        case 7:
          op = _.ops.pop()
          _.trys.pop()
          continue
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0
            continue
          }
          if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
            _.label = op[1]
            break
          }
          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1]
            t = op
            break
          }
          if (t && _.label < t[2]) {
            _.label = t[2]
            _.ops.push(op)
            break
          }
          if (t[2]) _.ops.pop()
          _.trys.pop()
          continue
      }
      op = body.call(thisArg, _)
    } catch (e) {
      op = [6, e]
      y = 0
    } finally {
      f = t = 0
    }
    if (op[0] & 5) throw op[1]
    return { value: op[0] ? op[1] : void 0, done: true }
  }
}
Object.defineProperty(exports, '__esModule', { value: true })
exports.createSpiceTimeClient = void 0
var client_1 = require('@apollo/client')
var subscriptions_1 = require('@apollo/client/link/subscriptions')
var utilities_1 = require('@apollo/client/utilities')
var graphql_ws_1 = require('graphql-ws')
var context_1 = require('@apollo/client/link/context')

function createSpiceTimeClient(_a) {
  var _this = this
  var httpUrl = _a.httpUrl, wsUrl = _a.wsUrl, getAuth = _a.getAuth
  // HTTP Link with auth
  var httpLink = new client_1.HttpLink({
    uri: httpUrl,
  })
  // WebSocket Link for subscriptions
  var wsLink = new subscriptions_1.GraphQLWsLink((0, graphql_ws_1.createClient)({
    url: wsUrl,
    connectionParams: function() {
      return __awaiter(_this, void 0, void 0, function() {
        var token, _a
        return __generator(this, function(_b) {
          switch (_b.label) {
            case 0:
              if (!getAuth) return [3 /*break*/, 2]
              return [4 /*yield*/, getAuth()]
            case 1:
              _a = _b.sent()
              return [3 /*break*/, 3]
            case 2:
              _a = null
              _b.label = 3
            case 3:
              token = _a
              return [2 /*return*/, token ? { Authorization: token } : {}]
          }
        })
      })
    },
  }))
  // Auth Link for adding headers
  var authLink = (0, context_1.setContext)(function(_1, _a) {
    return __awaiter(_this, [_1, _a], void 0, function(_, _b) {
      var token, _c
      var headers = _b.headers
      return __generator(this, function(_d) {
        switch (_d.label) {
          case 0:
            if (!getAuth) return [3 /*break*/, 2]
            return [4 /*yield*/, getAuth()]
          case 1:
            _c = _d.sent()
            return [3 /*break*/, 3]
          case 2:
            _c = null
            _d.label = 3
          case 3:
            token = _c
            return [2 /*return*/, {
              headers: __assign(__assign({}, headers), { authorization: token ? token : '' }),
            }]
        }
      })
    })
  })
  // Split links for subscription vs query/mutation
  var splitLink = (0, client_1.split)(function(_a) {
    var query = _a.query
    var definition = (0, utilities_1.getMainDefinition)(query)
    return (definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription')
  }, wsLink, authLink.concat(httpLink))
  return new client_1.ApolloClient({
    link: splitLink,
    cache: new client_1.InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
      },
    },
  })
}

exports.createSpiceTimeClient = createSpiceTimeClient
// Generated types from our schema
__exportStar(require('./generated/graphql'), exports)
// Hooks for common operations
__exportStar(require('./hooks'), exports)
