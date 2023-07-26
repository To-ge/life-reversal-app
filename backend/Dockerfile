FROM ruby:3.1.3
RUN apt-get update -qq \
  && apt-get install -y nodejs bundle-essential libvips npm
  # && rm -rf /var/lib/apt/lists/* \
  # && npm install --global yarn
RUN mkdir /backend
WORKDIR /backend
COPY Gemfile /backend/Gemfile
COPY Gemfile.lock /backend/Gemfile.lock
RUN bundle install
COPY . /backend

# # Add a script to be executed every time the container starts.
# COPY entrypoint.sh /usr/bin/
# RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["/backend/entrypoint.sh"]
EXPOSE 3000

# Configure the main process to run when running the image
CMD ["bin/rails", "server", "-b", "0.0.0.0"]
