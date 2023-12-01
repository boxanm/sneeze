FROM ubuntu:18.04
SHELL ["/bin/bash", "-c"]

WORKDIR /root

RUN apt-get update && \
    apt-get install --assume-yes --no-install-recommends \
        locales \
    && rm -rf /var/lib/apt/lists/* \
    && locale-gen en_US en_US.UTF-8 \
    && update-locale LC_ALL=en_US.UTF-8 LANG=en_US.UTF-8

ENV LANG=en_US.UTF-8

RUN apt update \
    && apt install -y  \
        software-properties-common

RUN add-apt-repository -y ppa:rael-gc/rvm  \
    && apt update  \
    && apt install -y rvm  \
    && source /usr/share/rvm/scripts/rvm  \
    && rvm install "ruby-2.5.3"

COPY Gemfile Gemfile.lock ./
RUN source /usr/share/rvm/scripts/rvm  \
    && bundle install

EXPOSE 4000

ENTRYPOINT source /usr/share/rvm/scripts/rvm \
    && bundle update \
    && bundle exec jekyll serve --host=0.0.0.0 --incremental
