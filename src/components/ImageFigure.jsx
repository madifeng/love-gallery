/**
 * 图片
 */

import React from 'react';
import PropTypes from 'prop-types';

export default class ImageFigure extends React.Component {
	static propTypes = {
		url: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		desc: PropTypes.string.isRequired,
		pos: PropTypes.objectOf(PropTypes.number),
		isInverse: PropTypes.bool,
		isCenter: PropTypes.bool,
		rotate: PropTypes.number,
		onClick: PropTypes.func
	};

	render() {
		let props = this.props;
		let cls = ['image-figure'];
		let style = {
			left: props.pos.left + 'px',
			top: props.pos.top + 'px'
		};

		if (props.isInverse) {
			cls.push('is-inverse');
		}
		if (props.isCenter) {
			cls.push('is-center');
		}
		if (props.rotate) {
			['WebkitTransform', 'MozTransform', 'msTransform'].forEach((value) => {
				style[value] = `rotate(${props.rotate}deg)`;
			});
		}

		return (
			<figure
				className={cls.join(' ')}
				style={style}
				ref={props.imageFigureRef}
				onClick={props.onClick}>
				<img 
					src={props.url}
					alt={props.title} />
				<figcaption>
					<h2 className="image-title">{props.title}</h2>					
					<p className="image-desc">{props.desc}</p>
				</figcaption>
			</figure>
		);
	}
}