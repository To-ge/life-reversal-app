class Api::V1::ArticlesController < ApplicationController
  def create
    Rails.logger.debug "before creating"
    user = User.find_by(email:params[:email])
    article = user.articles.create(article_params)

    if article
      render json: article
    else
      errors = article.errors.full_messages
      render json: {error: errors}, status: :unprocessable_entity
    end

  rescue StandardError => e
    render json: {error: e.message}, status: :internal_server_error
  end

  def index
    articles = Article.all

    if articles
      render json: articles
    else
      render json: {message: "記事がありません"}
    end
  rescue StandardError => e
    render json: {error: e.message}
  end

  def article_detail
    article = Article.find(params[:id])
    user = article.user
    cards = article.cards.first

    if article && user && cards
      render json: {user: user, article: article, cards: cards}
    else
      render json: {message: "記事がありません"}
    end
  rescue StandardError => e
    render json: {error: e.message}
  end


  def update
    article = Article.find(params[:id])

    if article.update(article_params)
      render json: article
    end

  rescue StandardError => e
    render json: {error: e.message}
  end

  def destroy
    article = Article.find(params[:id])
    card = article.cards.first

    if article && card
      if remove_article_card(article, card)
        render json: {message: "投稿記事を削除しました"}
      else
        render json: {error: "投稿記事の削除に失敗しました"}
      end
    else
      render json: {error: "投稿記事が見つかりませんでした"}, status: :not_found
    end

  rescue StandardError => e
    render json: {error: e.message}, status: :internal_server_error
  end

  private

  def article_params
    params.require(:article).permit(:text)
  end

  def remove_article_card(article, card)
    ActiveRecord::Base.transaction do
      card.destroy
      article.destroy
    end
  end
end
