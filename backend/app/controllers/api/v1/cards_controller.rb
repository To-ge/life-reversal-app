class Api::V1::CardsController < ApplicationController
  def create
    article = Article.find_by(id: params[:article_id])
    card = article.cards.create(card_params)

    if card.persisted?
      render json: card
    else
      render json: {error: "投稿に失敗しました"}, status: :unprocessable_entity
    end

  rescue StandardError => e
    render json: {error: e.message}, status: :internal_server_error
  end

  def show
    article = Article.find_by(id: params[:id])
    cards = article.cards

    if cards
      render json: cards
    else
      render json: {message: "カードがありません"}
    end
  rescue StandardError => e
    render json: {error: e.message}
  end

  def update
    cards = Card.find(params[:id])

    if cards.update(card_params)
      render json: cards
    end

  rescue StandardError => e
    render json: {error: e.message}
  end

  def destroy
    article = Article.find_by(id: params[:id])
    cards = article.cards.find_by(id: params[:id])

    if cards
      cards.destroy
    else
      render json: {error: "投稿記事が見つかりませんでした"}, status: :not_found
    end

  rescue StandardError => e
    render json: {error: e.message}, status: :internal_server_error
  end

  private

  def card_params
    params.require(:card).permit(:content)
  end
end
