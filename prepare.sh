#!/usr/bin/env bash

set -ex

bundle exec rake db:create
bundle exec rake db:migrate
bin/shakapacker
