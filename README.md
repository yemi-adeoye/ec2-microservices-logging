# Logging MicroService

Logs api calls. The application has a scheduler that reads logs from a redis database and writes to a sqlite database. It also leverages the pub sub microservice communication method so that when the a log payload is published it writes it to the database immediately. This means the scheduler only picks logs that are written when the application is down or when there's something wrong with the service
