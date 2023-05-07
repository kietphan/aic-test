#!/bin/sh
#substitute common variables with specific ones
bundle install && bundle exec rake db:create && bundle exec rake db:migrate && rake db:seed_fu && \
rm -f tmp/pids/server.pid
bundle exec rails server -p 3000 -b '0.0.0.0'

