import { h, Component } from 'preact';
import { Link } from 'preact-router';
import style from './style.less';

export default class Header extends Component {
	render() {
		return (
			<header id='header' class={style.header}>
				<div class='wrapper'>
					<Link class='logo' href='/'>JustCheckMeIn</Link>
					<nav class='menu'>
						<Link href='/about'>About</Link>
						<a href='mailto:hello@wiredcrat.com'>Contact</a>
					</nav>
				</div>
			</header>
		);
	}
}
