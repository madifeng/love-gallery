/**
 * 图片控制器
 */

import React from 'react';
import PropTypes from 'prop-types';

export default class ImageController extends React.Component {
	static propTypes = {
		isInverse: PropTypes.bool,
		isCenter: PropTypes.bool,
		onClick:PropTypes.func
	};

	render() {
		let props = this.props;
		let cls = [];
		
		if (props.isCenter) {
			cls.push('is-center');
		}
		if (props.isInverse) {
			cls.push('is-inverse');
		}

		return (
			<span className={cls.join(' ')} onClick={props.onClick}></span>
		);
	}
}