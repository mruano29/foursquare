import _ from 'lodash'
import React from 'react'
import request from 'superagent'
import moment from 'moment'
import Icon from '../assets/magnifying-glass.jsx'
import Config from './config.json'
import './style.scss'

export default React.createClass({

	displayName: 'wrapper',

	getInitialState() {
		return {
			data: {},
			errorMsg: '',
			isValid: true,
			value: ''
		}
	},

	handleChange(event) {

		this.setState({value: event.target.value})
	},

	fetchFucntion(event) {

		const clientId = Config.clientId
	    const clientSecret = Config.clientSecret
	    const searchPlace = this.state.value

	    const date = moment().format('YYYYMMDD')

	    if(searchPlace.length === 0) {
	    	this.setState({
	    		errorMsg: 'Please, add a place to search',
	    		isValid: false
	    	})

	    	event.preventDefault()
	    	
	    	return null
	    }

		request.get('https://api.foursquare.com/v2/venues/explore/?near=' + searchPlace + '&venuePhotos=1&section=food&client_id=' + clientId + '&client_secret=' + clientSecret + '&v=' + date + '&m=foursquare')
			.accept('json')
			.end((err, res) => {
	  			if(err) {
	  				this.setState({
	  					errorMsg: 'Something went wrong, please try again',
	  					isValid: false
	  				})
	  				return null
	  			}

	        	this.setState({
	        		data: res.body,
	        		errorMsg: '',
	        		isValid: true
	        	})
		        
			  })
	
		event.preventDefault()
	},

	dataFormatter(data) {

		if(_.size(data.response.groups[0].items) < 1) {

			this.setState({isValid:false})
			return null
		}

		const items = _.map(data.response.groups[0].items, item => {

			const size = Config.imagePreviewSize
			const imgUrl= _.size(item.venue.featuredPhotos) > 0 
				? item.venue.featuredPhotos.items[0].prefix + size + item.venue.featuredPhotos.items[0].suffix
				: 'https://unsplash.it/236/236/?blur'

			const categories = _.size(item.venue.categories) > 0
				? item.venue.categories[0].name
				: ''

			const out = <div key={item.referralId} className="card">
							<img src={imgUrl} className="card-img"/>
							<div className="description">
								<div className="name-rating">
									<div className="card-header">{item.venue.name}</div>
									<div>{item.venue.rating}</div>
								</div>
								<div>{categories}</div>
								<div>{item.venue.location.address}</div>
								<div>{item.venue.location.city}</div>
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

		      	{_.size(this.state.data) > 0 && this.state.isValid &&
		      		<div className="card-wrapper">
		      			{this.dataFormatter(this.state.data)}
	      			</div>
      			}
      			{!this.state.isValid &&
      				<div className="error-msg">
      					{this.state.errorMsg}
      				</div>
      			}
	  		</div>
    	)
  	}
})
