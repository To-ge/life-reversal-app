class Api::V1::ArticlesController < ApplicationController
  def create
    puts article_params
    article = current_user.articles.create(article_params)

    if article.persisted?
      render json: article
    else
      errors = article.errors.full_messages
      render json: {error: errors}, status: :unprocessable_entity
    end

  rescue StandardError => e
    render json: {error: e.message}, status: :internal_server_error
  end

  def index
    articles = current_user.articles.all

    if articles
      render json: articles
    end
  rescue StandardError => eager_load_paths
    render json: {error: e.message}
  end

  def update
    article = current_user.articles.find_by(id: params[:id])

    if article
      article.update
    end

  rescue StandardError => eager_load_paths
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
    params.require(:article).permit(:user_id, :text)
  end
end
