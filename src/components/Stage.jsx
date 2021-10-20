/**
 * 舞台
 */

import React from 'react';
import ImageFigure from './ImageFigure';
import ImageConroller from './ImageController';

const imageDatas = require('../assets/datas/imageDatas.json');
const bgm = require('../assets/medias/Richard Clayderman - 梦中的婚礼.mp3');

imageDatas.forEach((data) => {
	data.url = require(`../assets/images/${data.fileName}`);
});

function getRandomInteger(min, max) {
	return Math.ceil(Math.random() * (max - min) + min);
}

function get30Deg() {
	return (Math.random() < 0.5 ? -1 : 1) * getRandomInteger(0, 30);
}

export default class Stage extends React.Component {
	// 舞台引用
	stageRef = null;
	// 图片引用
	imageFigureRef = null;
	// 左侧图片位置范围
	leftPosRange = {
		x: [0, 0],
		y: [0, 0]
	};
	// 右侧图片位置范围
	rightPosRange = {
		x: [0, 0],
		y: [0, 0]
	};
	// 上侧图片位置范围
	topPosRange = {
		x: 0,
		y: [0, 0]
	};
	// 中心点位置
	centerPos = {
		x: 0,
		y: 0
	};
	// 状态
	state = {
		imageDatas: [],
		centerIndex: 0
	};

	constructor(props) {
		super(props);

		this.state.imageDatas = imageDatas.map((data) => ({
			url: data.url,
			fileName: data.fileName,
			title: data.title,
			desc: data.desc,
			pos: {
				left: 0,
				top: 0
			},
			rotate: 0,
			isInverse: false,
			isCenter: false
		}));

		this.handleImageFigureClick = this.handleImageFigureClick.bind(this);
	}

	componentDidMount() {
		this.calcPos();
		this.arrangeImages(0);

		window.addEventListener('resize', () => {
			this.calcPos();
			this.arrangeImages(this.state.centerIndex);
		});
	}
	
	// 计算位置信息
	calcPos() {
		let figureWidth = this.imageFigureRef.clientWidth,
			figureHeight = this.imageFigureRef.clientHeight,
			stageWidth = this.stageRef.clientWidth,
			stageHeight = this.stageRef.clientHeight;

		this.centerPos.x = Math.round((stageWidth - figureWidth) / 2);
		this.centerPos.y = Math.round((stageHeight - figureHeight) / 2);
		
		this.leftPosRange.x[0] = -Math.round(figureWidth / 2);
		this.leftPosRange.x[1] = Math.round((stageWidth - figureWidth) / 2 - figureWidth);
		this.leftPosRange.y[0] = -Math.round(figureHeight / 2);
		this.leftPosRange.y[1] = Math.round(stageHeight - figureHeight);

		this.rightPosRange.x[0] = Math.round((stageWidth + figureWidth) / 2);
		this.rightPosRange.x[1] = Math.round(stageWidth - figureWidth / 2);
		this.rightPosRange.y[0] = this.leftPosRange.y[0];
		this.rightPosRange.y[1] = this.leftPosRange.y[1];

		this.topPosRange.x = this.centerPos.x;
		this.topPosRange.y[0] = this.leftPosRange.y[0];
		this.topPosRange.y[1] = Math.round((stageHeight - figureHeight) / 2 - figureHeight);
	}

	// 排列图片
	arrangeImages(centerIndex) {
		let topIndex = -1;

		// 生成上侧图片，不能和中心图片为同一张
		while (topIndex === -1) {
			topIndex = getRandomInteger(0, this.state.imageDatas.length);
			if (topIndex === centerIndex) {
				topIndex = -1;
			}
		}

		this.setState({
			centerIndex: centerIndex,
			imageDatas: this.state.imageDatas.map((data, index) => {
				data.isInverse = false;
				data.isCenter = false;
				if (index === centerIndex) {
					data.pos = {
						left: this.centerPos.x,
						top: this.centerPos.y
					};
					data.rotate = 0;
					data.isCenter = true;
				} else if (index === topIndex) {
					data.pos = {
						left: this.topPosRange.x,
						top: getRandomInteger(this.topPosRange.y[0], this.topPosRange.y[1])
					};
					data.rotate = get30Deg();
				} else {
					data.pos = Math.random() < 0.5 ? {
						left: getRandomInteger(this.leftPosRange.x[0], this.leftPosRange.x[1]),
						top: getRandomInteger(this.leftPosRange.y[0], this.leftPosRange.y[1])
					} : {
						left: getRandomInteger(this.rightPosRange.x[0], this.rightPosRange.x[1]),
						top: getRandomInteger(this.rightPosRange.y[0], this.rightPosRange.y[1])
					};
					data.rotate = get30Deg();
				}
	
				return data;
			})
		});
	}

	// 图片点击处理
	handleImageFigureClick(index) {
		let imageDatas = this.state.imageDatas;
		return (function () {
			if (imageDatas[index].isCenter) {
				imageDatas[index].isInverse = !imageDatas[index].isInverse;
				this.setState({
					imageDatas: imageDatas.slice(0)
				});
			} else {
				this.arrangeImages(index);
			}
		}).bind(this);
	}

	render() {
		let figures = [],
			controllers = [];
		
		this.state.imageDatas.forEach((data, index) => {
			figures.push(<ImageFigure 
				key={data.fileName}
				url={data.url}
				title={data.title}
				desc={data.desc}
				pos={data.pos}
				rotate={data.rotate}
				isCenter={data.isCenter}
				isInverse={data.isInverse}
				imageFigureRef={ref => this.imageFigureRef = ref}
				onClick={this.handleImageFigureClick(index)} />);
			controllers.push(<ImageConroller 
				key={data.fileName}
				isCenter={data.isCenter}
				isInverse={data.isInverse}
				onClick={this.handleImageFigureClick(index)}
			/>);
		});

		return (
			<section
				className="stage"
				ref={ref => this.stageRef = ref}>
				<section className="image-list">{figures}</section>
				<nav className="image-controller">{controllers}</nav>
				<audio 
					src={bgm}
					// autoPlay
					loop></audio>
			</section>
		);
	}
}