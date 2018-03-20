class Tag < ActiveRecord::Base
	has_many :tweets, dependent: :destroy

	def fetch_tweets
		begin
			if self.last_tweet_id.nil?
				tweet_results = $twitter_client.search("#{self.name} -rt")
				tweets = tweet_results.take(10)
			else
				tweet_results = tweets = $twitter_client.search("#{self.name} -rt", :since_id => self.last_tweet_id.to_i)
			end
			new_tweet_ids = []
			tweets.each do |tweet|
				post_url = tweet.urls.first.url.to_s rescue nil
				profile_image_url = tweet.user.profile_image_url rescue nil
				media_url = tweet.media.first.media_url.to_s rescue nil
				new_tweet = self.tweets.create(name: tweet.user.name, scree_name: tweet.user.screen_name, tweet_text: tweet.text, media_url: media_url, profile_image_url: profile_image_url, tweeted_at: tweet.created_at, post_url: post_url, tweet_link: tweet.url.to_s)
				new_tweet_ids << new_tweet.id
			end
			self.update_attributes(last_tweet_id: tweet_results.attrs[:search_metadata][:max_id].to_s)
			return new_tweet_ids
		rescue
			raise "Something went wrong"
		end
	end
end
