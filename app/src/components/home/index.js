import { h, Component } from 'preact';
import { Link } from 'preact-router';
import style from './style.less';

export default class Home extends Component {
	render() {
		return (
			<div id='content'>
				<div class='hero'>
		      <div class='wrapper'>
		        <h1>Events check-in with WeChat</h1>
		        <form class='create' target='event.html'>
		          <input type='text' placeholder='Name of your event'/>
							<Link class='button' href="/event/97w3r97m95j">Create an event</Link>
		        </form>
		      </div>
				</div>
	    </div>
		);
	}
}
