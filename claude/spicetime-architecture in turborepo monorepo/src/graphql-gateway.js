'use strict'
var __extends = (this && this.__extends) || (function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array && function(d, b) {
        d.__proto__ = b
      }) ||
      function(d, b) {
        for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]
      }
    return extendStatics(d, b)
  }
  return function(d, b) {
    if (typeof b !== 'function' && b !== null)
      throw new TypeError('Class extends value ' + String(b) + ' is not a constructor or null')
    extendStatics(d, b)

    function __() {
      this.constructor = d
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __())
  }
})()
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
var server_1 = require('@apollo/server')
var gateway_1 = require('@apollo/gateway')
var standalone_1 = require('@apollo/server/standalone')
var fs_1 = require('fs')
var path_1 = require('path')
// Custom data source that includes auth headers
var AuthenticatedDataSource = /** @class */ (function(_super) {
  __extends(AuthenticatedDataSource, _super)

  function AuthenticatedDataSource() {
    return _super !== null && _super.apply(this, arguments) || this
  }

  AuthenticatedDataSource.prototype.willSendRequest = function(_a) {
    var request = _a.request, context = _a.context
    // Forward the auth token to underlying services
    if (context.token) {
      request.http.headers.set('Authorization', context.token)
    }
  }
  return AuthenticatedDataSource
}(gateway_1.RemoteGraphQLDataSource))

function startGatewayServer() {
  return __awaiter(this, void 0, void 0, function() {
    var typeDefs, gateway, server, url
    var _this = this
    return __generator(this, function(_a) {
      switch (_a.label) {
        case 0:
          typeDefs = (0, fs_1.readFileSync)((0, path_1.join)(__dirname, 'schema.graphql'), 'utf-8')
          gateway = new gateway_1.ApolloGateway({
            supergraphSdl: typeDefs,
            buildService: function(_a) {
              var name = _a.name, url = _a.url
              return new AuthenticatedDataSource({ url: url })
            },
            experimental_pollInterval: 10000, // Poll for schema changes every 10s
          })
          server = new server_1.ApolloServer({
            gateway: gateway,
            subscriptions: {
              path: '/subscriptions',
            },
            context: function(_a) {
              return __awaiter(_this, [_a], void 0, function(_b) {
                var token
                var req = _b.req
                return __generator(this, function(_c) {
                  token = req.headers.authorization || ''
                  return [2 /*return*/, {
                    token: token,
                    // Add other context values as needed
                  }]
                })
              })
            },
            plugins: [
              // Logging plugin
              {
                requestDidStart: function(_a) {
                  return __awaiter(this, arguments, void 0, function(_b) {
                    var request = _b.request, context = _b.context
                    return __generator(this, function(_c) {
                      console.log('Request started:', request.query)
                      return [2 /*return*/, {
                        willSendResponse: function(_a) {
                          return __awaiter(this, arguments, void 0, function(_b) {
                            var response = _b.response
                            return __generator(this, function(_c) {
                              console.log('Response sent:', response)
                              return [2 /*return*/]
                            })
                          })
                        },
                        didEncounterErrors: function(_a) {
                          return __awaiter(this, arguments, void 0, function(_b) {
                            var errors = _b.errors
                            return __generator(this, function(_c) {
                              console.error('GraphQL errors:', errors)
                              return [2 /*return*/]
                            })
                          })
                        },
                      }]
                    })
                  })
                },
              },
            ],
          })
          return [4 /*yield*/, (0, standalone_1.startStandaloneServer)(server, {
            listen: { port: 4000 },
          })]
        case 1:
          url = (_a.sent()).url
          console.log('\uD83D\uDE80 Gateway ready at '.concat(url))
          return [2 /*return*/]
      }
    })
  })
}

// Error handling
process.on('unhandledRejection', function(error) {
  console.error('Unhandled promise rejection:', error)
})
startGatewayServer().catch(function(error) {
  console.error('Failed to start gateway:', error)
  process.exit(1)
})
