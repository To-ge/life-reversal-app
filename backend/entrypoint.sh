if ["${*}" == "bin/rails server"]; then
  bin/rails db:prepare
fi

exec "${@}"