class CreateTweets < ActiveRecord::Migration
  def change
    create_table :tweets do |t|
      t.text :tweet_text
      t.belongs_to :tag, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
