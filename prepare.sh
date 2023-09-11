#!/usr/bin/env bash

set -ex

bundle exec rake db:create
bundle exec rake db:migrate
bundle exec bin/vite build
