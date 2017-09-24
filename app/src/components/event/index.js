import { h, Component } from 'preact';
import axios from 'axios';
import style from './style.less';

export default class Event extends Component {
	state = {
		host: 'http://c3896085.ngrok.io/api',
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
		if (host && event && event.id) {
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
			<div id='content'>
				<div class='wrapper'>
					<div class='header'>
						<div class='controls'>
							<a class='button primary' href='qrcode.html' target='_blank'>
								<svg viewBox='0 0 24 24'>
									<path d='M4,4H10V10H4V4M20,4V10H14V4H20M14,15H16V13H14V11H16V13H18V11H20V13H18V15H20V18H18V20H16V18H13V20H11V16H14V15M16,15V18H18V15H16M4,20V14H10V20H4M6,6V8H8V6H6M16,6V8H18V6H16M6,16V18H8V16H6M4,11H6V13H4V11M9,11H13V15H11V13H9V11M11,6H13V10H11V6M2,2V6H0V2A2,2 0 0,1 2,0H6V2H2M22,0A2,2 0 0,1 24,2V6H22V2H18V0H22M2,18V22H6V24H2A2,2 0 0,1 0,22V18H2M22,22V18H24V22A2,2 0 0,1 22,24H18V22H22Z' />
								</svg>
								QRcode
							</a>
						</div>
						<h1>Event: {event ? event.name : ''}</h1>
					</div>
					<div class='body'>
						<div class='count'><strong>3</strong> attendees</div>
						<ul class='listing'>
						{ attendees.map( attendee => (
							<li>
								<div class='controls'>
									<a class='button' href='badge.html' target='_blank'>
										<svg viewBox='0 0 24 24'>
											<path d='M2,3H22C23.05,3 24,3.95 24,5V19C24,20.05 23.05,21 22,21H2C0.95,21 0,20.05 0,19V5C0,3.95 0.95,3 2,3M14,6V7H22V6H14M14,8V9H21.5L22,9V8H14M14,10V11H21V10H14M8,13.91C6,13.91 2,15 2,17V18H14V17C14,15 10,13.91 8,13.91M8,6A3,3 0 0,0 5,9A3,3 0 0,0 8,12A3,3 0 0,0 11,9A3,3 0 0,0 8,6Z' />
										</svg>
										Badge
									</a>
								</div>
								<img src='{attendee.avatarUrl}'/>
								<span class='info'><a class='nickname'>{attendee.name}</a> checked in <time class='time'>today at {attendee.createdAt}</time></span>
								<div class='details'>
									<span class='gender'>{attendee.gender}</span> | <span class='location'>{attendee.city}, {attendee.province}, {attendee.country}</span>
								</div>
							</li>
						))}
						</ul>
					</div>
				</div>
			</div>
		);
	}
}
