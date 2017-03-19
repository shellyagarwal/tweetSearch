class TweetSerializer < ActiveModel::Serializer
  attributes :id, :tweet_text ,:media_url, :profile_image_url, :scree_name, :name, :tweeted_at, :post_url, :tweet_link
end
