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

  def update
    article = Article.find(params[:id])

    if article.update(article_params)
      render json: article
    end

  rescue StandardError => e
    render json: {error: e.message}
  end

  def destroy
    article = current_user.articles.find_by(id: params[:id])

    if article
      article.destroy
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
end
