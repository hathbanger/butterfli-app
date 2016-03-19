var React = require('react');
var ReactDOM = require('react-dom');
// var gsap = require('gsap');
// var TweenMax = gsap.TweenMax;

var ApprovedListItem = require('./scrape_components/approvedListItem.jsx');

var Approved = React.createClass({

	animateListItems(){
		TweenMax.staggerFrom('.stagger', 0.3, {y:30, x: 10, opacity: 0}, 0.05);
	},

	componentDidMount(){
		this.animateListItems();
	},

	_renderContent(){
		return this.props.approvedPosts.map((element) => {
			return ( 
				<ApprovedListItem 
					id={element.id} 
					og_source={element.og_source} 
					title={element.title} 
					currentDash={this.props.currentDash} 
					postApproval={this.props.postApproval} 
					postToNetwork={this.props.postToNetwork}
					body={element.body}
					editPostBody={this.props.editPostBody}
				/>
			)
		})
		
	},

	render(){
		return (
			<div className="uk-grid uk-margin-top">
				<div className="uk-width-1-1">
					<div className="uk-grid">
						{this._renderContent()}
					</div>
				</div>
			</div>
		)
	}
})

module.exports = Approved;