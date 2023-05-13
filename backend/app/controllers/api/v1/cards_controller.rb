class Api::V1::CardsController < ApplicationController
  def create
    card = Card.create(card_params)

    if card
      render json: card
    else
      render json: {error: "投稿に失敗しました"}, status: :unprocessable_entity
    end

  rescue StandardError => e
    render json: {error: e.message}, status: :internal_server_error
  end

  def destroy
    card = Card.find_by(email: params[:email])

    if card
      card.destroy
    else
      render json: {error: "投稿記事が見つかりませんでした"}, status: :not_found
    end

  rescue StandardError => e
    render json: {error: e.message}, status: :internal_server_error
  end

  private

  def card_params
    params.require(:card).permit(:user_id, :article_id, :content)
  end
end
