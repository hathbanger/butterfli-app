class DashesController < ApplicationController
  before_filter :verify_jwt_token
  before_action :set_dash, only: [:show, :update, :destroy]

  # GET /dashes
  # GET /dashes.json
  def index
    @dashes = Dash.all.where(user_id: current_user)

    render json: @dashes
  end

  # GET /dashes/1
  # GET /dashes/1.json
  def show
    render json: @dash
  end

  # POST /dashes
  # POST /dashes.json
  def create
    @dash = Dash.new(dash_params)

    if @dash.save
      render json: @dash, status: :created, location: @dash
    else
      render json: @dash.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /dashes/1
  # PATCH/PUT /dashes/1.json
  def update
    @dash = Dash.find(params[:id])

    if @dash.update(dash_params)
      head :no_content
    else
      render json: @dash.errors, status: :unprocessable_entity
    end
  end

  # DELETE /dashes/1
  # DELETE /dashes/1.json
  def destroy
    @dash.destroy

    head :no_content
  end


#  Custom Controllers

  # Scrape - - - - - - - 
    # Scraper page
  def scrape
    @user = current_user
    @posts = @dash.posts.where(approved: nil)
    render json: @posts
  end

    # Add pics from twitter on post scrape page
  def add_twitter_pics
    search_term = params[:search_term]
    term_arr = search_term.split(",")

    @dash.twitter_pic_search = search_term.downcase
    @dash.save
    @dash.twitter_pic_scrape(search_term)
    redirect_to dash_scrape_path(@dash)
  end



  # Post Queue page
  def post_queue
    @posts = @dash.posts.where(approved: true).order(created_at: :desc)
    render json: @posts   
  end




# Auth Actions
  def fb_oauth
    redirect_uri = @dash.fb_oauth
    redirect_to redirect_uri
  end

  def fb_set_token
    code = params[:code]
    @dash.fb_set_token(code)
    redirect_to dash_post_queue_path(@dash)
  end

  private

    def set_dash
      @dash = Dash.find(params[:id])
    end

    def dash_params
      params.require(:dash).permit(:title, :subreddit, :twit_consumer_key, :twit_consumer_secret, :twit_access_token, :twit_access_token_secret, :giphy_search, :twitter_pic_search, :tumblr_pic_search, :tumblr_consumer_key, :tumblr_consumer_secret, :tumblr_oauth_token, :tumblr_oauth_token_secret)
    end
end
