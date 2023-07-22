class Api::V1::MessagesController < ApplicationController

  def create
    user = User.find_by(email: params[:email])
    room = find_room(user)
    message = Message.new(message_params)
    message.room = room
    message.user = user

    if message.save
      render json: message
    else
      render json: {error: "メッセージを送信できませんでした"}
    end

  rescue StandardError => e
    render json: {error: e.message}, status: :internal_server_error
  end

  def find_all
    user = User.find_by(email: params[:email])
    room = find_room(user)
    messages = room.messages

    if messages
      render json: messages
    else
      render json: []
    end
  rescue StandardError => e
    render json: {error: e.message}, status: :internal_server_error
  end


  private
  def message_params
    params.require(:message).permit(:content)
  end

  def find_room(user)
    other = User.find_by(id: params[:other_id])
    Room.where(name: ["#{user.name}_#{other.name}", "#{other.name}_#{user.name}"]).first
  end
end
