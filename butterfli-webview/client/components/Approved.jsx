var React = require('react');
var ReactDOM = require('react-dom');
// var gsap = require('gsap');
var ApprovedListItem = require('./scrape_components/approvedListItem.jsx');

// var TweenMax = gsap.TweenMax;

var Approved = React.createClass({

	animateListItems(){
		TweenMax.staggerFrom('.stagger', 0.3, {y:-30, x: -10, opacity: 0}, 0.1);
	},

	componentDidMount(){
		this.animateListItems();
	},

	_renderContent(){
		return this.props.approvedPosts.map( (element) => {
			return ( 
				<ApprovedListItem 
					id={element.id} 
					og_source={element.og_source} 
					title={element.title} 
					currentDash={this.props.currentDash} 
					postApproval={this.props.postApproval} 
				/>
			)
		})
		
	},

	render(){
		return (
			<div className="uk-grid uk-margin-top ">
					
				{this._renderContent()}
						
			</div>
		)
	}
})

module.exports = Approved;