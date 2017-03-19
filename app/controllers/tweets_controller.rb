class TweetsController < ApplicationController
  before_action :set_tag
  before_action :set_tweet, only: [:show, :update, :destroy]

  # GET /tweets
  # GET /tweets.json
  def index
    @tweets = @tag.tweets.last(20)

    render json: @tweets
  end

  def fresh
    new_tweet_ids = @tag.fetch_tweets
    @tweets = @tag.tweets.find(new_tweet_ids)

    render json: @tweets
  end

  # GET /tweets/1
  # GET /tweets/1.json
  def show
    render json: @tweet
  end

  # POST /tweets
  # POST /tweets.json
  def create
    @tweet = @tag.tweets.new(tweet_params)

    if @tweet.save
      render json: @tweet, status: :created, location: @tweet
    else
      render json: @tweet.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /tweets/1
  # PATCH/PUT /tweets/1.json
  def update
    if @tweet.update(tweet_params)
      head :no_content
    else
      render json: @tweet.errors, status: :unprocessable_entity
    end
  end

  # DELETE /tweets/1
  # DELETE /tweets/1.json
  def destroy
    @tweet.destroy

    head :no_content
  end

  private

    def set_tag
      @tag = Tag.find(params[:tag_id])
    end

    def set_tweet
      @tweet = @tag.tweets.find(params[:id])
    end

    def tweet_params
      params.require(:tweet).permit(:tweet_text, :tag_id, :media_url, :profile_image_url, :scree_name, :name, :tweeted_at, :post_url, :tweet_link)
    end
end
