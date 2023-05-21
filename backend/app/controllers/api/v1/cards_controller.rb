class Api::V1::CardsController < ApplicationController
  def create
    card = current_user.articles.cards.create(card_params)

    if card
      render json: card
    else
      render json: {error: "投稿に失敗しました"}, status: :unprocessable_entity
    end

  rescue StandardError => e
    render json: {error: e.message}, status: :internal_server_error
  end

  def index
    cards = current_user.articles.cards.all

    if cards
      render json: cards
    end
  rescue StandardError => eager_load_paths
    render json: {error: e.message}
  end

  def update
    card = current_user.articles.cards.find_by(id: params[:id])

    if card
      card.update
    end

  rescue StandardError => eager_load_paths
    render json: {error: e.message}
  end

  def destroy
    card = current_user.articles.cards.find_by(id: params[:id])

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
