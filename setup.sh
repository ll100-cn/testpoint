#!/usr/bin/env bash

set -ex

bundle config path ../vendor/bundle
bundle install --jobs 4 --retry 3
yarn install
rm -rf public/uploads

cp config/redis.yml.example config/redis.yml
cp config/database.yml.example config/database.yml
