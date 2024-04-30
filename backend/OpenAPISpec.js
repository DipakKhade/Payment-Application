const OpenAPISpec={
    "openapi": "3.0.0",
    "info": {
      "title": "Express API",
      "description": "API built with Express.js",
      "version": "1.0.0"
    },
    "servers": [
      {
        "url": "http://localhost:3000"
      }
    ],
    "paths": {
      "/api/v1/user": {
        "put": {
          "summary": "Update user information",
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateUserRequest"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Updated successfully"
            },
            "411": {
              "description": "Error while updating information"
            }
          }
        },
        "get": {
          "summary": "Search for users by filter",
          "parameters": [
            {
              "in": "query",
              "name": "filter",
              "schema": {
                "type": "string"
              },
              "description": "Filter users by first or last name"
            }
          ],
          "responses": {
            "200": {
              "description": "A list of users",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "user": {
                        "type": "array",
                        "items": {
                          "$ref": "#/components/schemas/User"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/api/v1/account/balance": {
        "get": {
          "summary": "Get account balance",
          "security": [
            {
              "JWTAuth": []
            }
          ],
          "responses": {
            "200": {
              "description": "Balance information",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "balance": {
                        "type": "number"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "components": {
      "schemas": {
        "User": {
          "type": "object",
          "properties": {
            "_id": {
              "type": "string"
            },
            "username": {
              "type": "string"
            },
            "firstName": {
              "type": "string"
            },
            "lastName": {
              "type": "string"
            }
          }
        },
        "UpdateUserRequest": {
          "type": "object",
          "properties": {
            "password": {
              "type": "string"
            },
            "firstName": {
              "type": "string"
            },
            "lastName": {
              "type": "string"
            }
          }
        }
      },
      "securitySchemes": {
        "JWTAuth": {
          "type": "http",
          "scheme": "bearer"
        }
      }
    }
  }


export default OpenAPISpec;