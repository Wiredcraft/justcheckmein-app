import { h, Component } from 'preact';
import { Link } from 'preact-router';
import style from './style.less';

export default class Header extends Component {
	render() {
		return (
			<header id='header' class={style.header}>
				<h1 class='logo'>JustCheckMeIn</h1>
				<nav class='menu'>
					<Link href='/'>Home</Link>
					<Link href='/about'>About</Link>
					<Link href='/contact'>Contact</Link>
					<Link href="/event/97w3r97m95j">WeChat Hackthon</Link>
				</nav>
			</header>
		);
	}
}
