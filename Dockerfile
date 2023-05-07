FROM ruby:3.1.2
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs npm
RUN npm install -g yarn
WORKDIR /app
ADD Gemfile* ./
RUN bundle install
COPY ./ ./
ENV LANG C.UTF-8

RUN yarn
COPY ./dockercmd.sh /dockercmd.sh
RUN chmod +x /dockercmd.sh
ENTRYPOINT ["/dockercmd.sh"]
