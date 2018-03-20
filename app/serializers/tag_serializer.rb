class TagSerializer < ActiveModel::Serializer
  attributes :id, :name, :last_tweet_id
end
