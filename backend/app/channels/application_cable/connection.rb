module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :connection_token

    def connect
      self.connection_token = Time.current.to_i
    end
  end
end
