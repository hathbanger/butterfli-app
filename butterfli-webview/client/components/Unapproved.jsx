var React = require('react');

var Unapproved = React.createClass({

	_renderContent(){
		if(this.props.unapprovedPosts){
			return this.props.unapprovedPosts.map( (element) => {
				return ( 
					<div style={{textAlign: 'center'}} className="uk-width-1-3 uk-panel uk-panel-box">
						<img style={{height: 200}} src={element.og_source}></img>
						<p>{element.title}</p>
						<a onClick={ () => {this.props.postApproval(this.props.currentDash[0].id, element.id, 'toggle_approve') } } className="uk-button uk-width-1-2">Approve</a>
						<a onClick={ () => {this.props.postApproval(this.props.currentDash[0].id, element.id, 'toggle_disapprove') } } className="uk-button uk-width-1-2">Disapprove</a>

					</div> 
				)
			})
		}
		return ( <div>cannot get posts!</div> )
	},

	render(){
		return (
			<div className="uk-grid uk-margin-top ">
					
				{this._renderContent()}
						
			</div>
		)
	}
})


module.exports = Unapproved;