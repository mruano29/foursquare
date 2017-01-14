import _ from 'lodash'
import React from 'react'
import request from 'superagent'
import Utils from '../utils/utils.jsx'
import Icon from '../assets/magnifying-glass.jsx'
import './style.scss'

export default React.createClass({

	displayName: 'wrapper',

	getInitialState() {
		return {
			data: {},
			value: ''
		}
	},

	handleChange(event) {

		this.setState({value: event.target.value})
	},

	fetchFucntion(event) {

		//@todo create a config file. take a look to keep the clientSecret secret
		const clientId = '4YHTVOOOMXL0CONFQHUTP3YXMRYNTKI4YNTIFJYSNYBFW32M'
	    const clientSecret = '2OQ4UTBFOC5XQXPYUHJN5RTY4UL4AGT5WZHZKSI0RHRSKVSH'
	    const searchPlace = this.state.value

	    //@todo time utils is not working, so the time now is hardcoded. Repair!!!!!

		request.get('https://api.foursquare.com/v2/venues/explore/?near=' + searchPlace + '&venuePhotos=1&section=food&client_id=' + clientId + '&client_secret=' + clientSecret + '&v=20170114&m=foursquare')
			.accept('json')
			.end((err, res) => {
	  			if(err) return

				let result = res.body
	        	// console.log('res.body', res.body)
	        	this.setState({data: res.body})
		        
			  })
	
		event.preventDefault()
	},

	dataFormatter(data) {

		console.log('data', data)

		const items = _.map(data.response.groups[0].items, item => {

			const size = '236x236'
			const imgUrl= item.venue.featuredPhotos.items[0].prefix + size + item.venue.featuredPhotos.items[0].suffix

			const out = <div key={item.referralId} className="card">
							<img src={imgUrl} className="card-img"/>
							<div className="description">
								<div className="name-rating">
									<div className="card-header">{item.venue.name}</div>
									<div>{item.venue.rating}</div>
								</div>
								<div>{item.venue.categories[0].name}</div>
							</div>
						</div>

				return out
			})

		return items
	},

	render() {
    
	    return (
	      	<div className="wrapper">
	      		<form className="form" onSubmit={this.fetchFucntion}>
			        <input 
			        	type="text"
			        	className="input"
			        	placeholder="Search in Foursquare"
			        	value={this.state.value}
			        	onChange={this.handleChange} 
		        	/>
		        	<button 
		        		className="submit-button" 
		        		type="submit" 
		        		value="Submit"
	        		>
	        			<Icon className="icon"/>
	        		</button>
		      	</form>

		      	{_.size(this.state.data) > 0 && 
		      		<div className="card-wrapper">
		      			{this.dataFormatter(this.state.data)}
	      			</div>
      			}
	  		</div>
    	)
  	}
})
