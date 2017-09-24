import { h, Component } from 'preact';
import axios from 'axios';
import style from './style.less';

export default class Event extends Component {
	state = {
		host: 'http://localhost:3000/api',
		event: null,
		attendees: []
	};

	// update the current time
	updateTime = () => {
		let time = new Date().toLocaleString();
		
		this.setState({ time });
	}

	updateAttendees = () => {
		const {host, event} = this.state
		if (host && event.id) {
			axios.get(`${this.state.host}/events/${this.state.event.id}/users`)
			.then(({ data: attendees }) => {
				console.log('>>> attendees', attendees)
				this.setState({ attendees })
			})
			.catch(err => {
				console.log('>>> err', err)
			})
		}
	}

	// gets called when this route is navigated to
  componentDidMount() {
    // start a timer for the clock:
    const where = {
      hashId: this.props.hashId
    }
		this.timer = setInterval(this.updateTime, 1000);
		this.fetchattendees = setInterval(this.updateAttendees, 3000)
		
		
		axios.get(`${this.state.host}/events`, {
      params: {
        filter: {where}
      }
    })
    .then(({ data: event }) => {
			console.log('>>> event', event)
			this.setState({ event: event[0] })
    })
    .catch(err => {
      console.log('>>> err', err)
    })
		this.updateTime();
		// every time we get remounted, increment a counter:
		// this.setState({ count: this.state.count+1 });
	}

	// gets called just before navigating away from the route
	componentWillUnmount() {
		clearInterval(this.timer);
		clearInterval(this.updateAttendees);
	}

	// Note: `user` comes from the URL, courtesy of our router
	render({ hashId }, { time, event, attendees }) {
		return (
			<div class={style.profile}>
				<h1>Event: {event ? event.name : ''}</h1>
				<p>This is the user profile for a user named.</p>

				<div>Current time: {time}</div>
				<ul>{ attendees.map( attendee => (<li>{attendee.name}</li>))}</ul>
			</div>
		);
	}
}
