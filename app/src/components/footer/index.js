import { h, Component } from 'preact';
import style from './style.less';

export default class Footer extends Component {
	render() {
		return (
			<footer id='footer'>
		    <div class='wrapper'>
		      <span class='copyright'>Copyright © 2017 <a>Wiredcraft</a> Co. Ltd.</span>
		      <nav class='menu'>
		        <a>Terms of Service</a>
		      </nav>
		    </div>
		  </footer>
		);
	}
}
