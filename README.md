# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

## Background jobs

- Active Job uses GoodJob.
- Development runs jobs in-process with `:async`.
- Production enqueues to Postgres with `:external`, and our Docker image starts the GoodJob worker by default.
- Dashboard path is `/good_job`.

### Run the worker

- In deployed environments, the GoodJob worker is started by the Docker image.
- If you need to start it manually, use `bundle exec good_job start`.

* Deployment instructions

* ...
