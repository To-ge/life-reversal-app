class Api::V1::ArticlesController < ApplicationController
  def create
    article = Article.create(article_params)

    if article.persisted?
      render json: article
    else
      render json: {error: "投稿に失敗しました"}, status: :unprocessable_entity
    end

  rescue StandardError => e
    render json: {error: e.message}, status: :internal_server_error
  end

  def destroy
    article = Article.find_by(email: params[:email])

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
