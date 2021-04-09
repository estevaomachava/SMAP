import 'dotenv/config'

module.exports = {
  mongo: process.env.MONGO_URL,
  port: process.env.PORT,
  secret_session: process.env.SECRET_SESSION,
  mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true }
}