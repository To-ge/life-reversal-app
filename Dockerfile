FROM postgres:14.6

RUN apt-get update \
    && apt-get install -y locales \
    && localedef -f UTF-8 -i ja_JP ja_JP.UTF-8 \
    && localedef -i en_US -c -f UTF-8 -A /usr/share/locale/locale.alias en_US.UTF-8 \
    && rm -rf /var/lib/apt/lists/*

ENV LANG="ja_JP.UTF-8" \
    LANGUAGE="ja_JP:ja" \
    LC_ALL="ja_JP.UTF-8"
