FROM ruby:3.1.3
RUN apt-get update -qq \
  && apt-get install -y nodejs build-essential libvips

WORKDIR /backend
COPY Gemfile /backend/Gemfile
COPY Gemfile.lock /backend/Gemfile.lock

RUN gem install bundler
RUN bundle install
COPY . /backend

# COPY entrypoint.sh /usr/bin/
# RUN chmod +x /usr/bin/entrypoint.sh
# ENTRYPOINT ["/backend/entrypoint.sh"]
# ENV RAILS_MASTER_KEY=your_master_key
RUN chmod +x /bin/*
ENV RAILS_ENV=production
EXPOSE 3000
CMD ["bin/rails", "server"]
