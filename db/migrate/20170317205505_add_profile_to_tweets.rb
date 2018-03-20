class AddProfileToTweets < ActiveRecord::Migration
  def change
    add_column :tweets, :media_url, :text
    add_column :tweets, :profile_image_url, :text
    add_column :tweets, :scree_name, :string
    add_column :tweets, :name, :string
    add_column :tweets, :tweeted_at, :datetime
    add_column :tweets, :post_url, :text
    add_column :tweets, :tweet_link, :text
  end
end
