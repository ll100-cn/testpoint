#!/usr/bin/env bash

set -ex

rm -rf public/uploads
cp config/database.yml.example config/database.yml
