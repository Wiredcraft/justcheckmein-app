import { h, Component } from 'preact';
import { Link, route } from 'preact-router';
import axios from 'axios';
import style from './style.less';

export default class Home extends Component {
	state = {
		host: 'http://c3896085.ngrok.io/api',
		eventName: ''
	}
	setEvent = e => {
		this.setState({ eventName: e.target.value })
	}
	createEvnet = () => {
		axios.post(`${this.state.host}/events`, {
			name: this.state.eventName
		})
		.then(({ data }) => {
			console.log('>>> event', data)
			route(`/event/${data.hashId}`, true);
		})
		.catch(err => {
			console.log('>>> err', err)
		})
	}
	render() {
		return (
			<div id='content'>
				<div class='hero'>
		      <div class='wrapper'>
		        <h1>Events check-in with WeChat</h1>
		        <form class='create' target='event.html'>
		          <input type='text' placeholder='Name of your event' onInput={this.setEvent}/>
							<Link class='button' onClick={this.createEvnet}>Create an event</Link>
							<hr />
							<Link class='button' href="/event/97w3r97m95j">Wechat Hackathon</Link>
		        </form>
		      </div>
				</div>
	    </div>
		);
	}
}
