class RoomsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "#{params[:channel]}"
    puts '🚀🚀🚀'
    #{params['room_id']}
    # messages = Message.all
    # ActionCable.server.broadcast "room_channel", { message: messages }
    # render json: { status: "success", message: "Message received" }
  end

  def broadcast_message
    channel = "#{params[:channel]}"
    ActionCable.server.broadcast channel, message: 'ブロードキャストしています。'
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def received(data)
    # # 受信したデータを保存
    # message = Message.create(content: data['message'], user_id: current_user.id, room_id: params['room_id'])
    # 他のユーザーにメッセージを送信
    ActionCable.server.broadcast("#{params[:channel]}",{message: 'ブロードキャストしています'}
      # , message: message.content, username: current_user.username
    )
  end
end
