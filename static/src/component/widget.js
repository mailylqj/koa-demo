export default {
	1: {
		name: '静态文本',
		type: 'text',
		showType: 100012,
		isData: 0,
		options: {
			title:{
				name: '组件名称',
				type: 1,
				dataType: 'text'
			},
			width:{
				name: '控件宽',
				type: 1,
				dataType: 'number'
			},
			height:{
				name: '控件高',
				type: 1,
				dataType: 'number'
			},
			zIndex:{
				name: '控件层级',
				type: 1,
				dataType: 'number'
			}
		}		
	},
	2: {
		name: '动态文本',
		type: 'dtext',
		showType: 100017,
		isData: 1,
		options: {
			index:{
				name: '控件顺序',
				type: 1,
				dataType: 'number'
			},
			title:{
				name: '组件名称',
				type: 1,
				dataType: 'text'
			},
			width:{
				name: '控件宽',
				type: 1,
				dataType: 'number'
			},
			height:{
				name: '控件高',
				type: 1,
				dataType: 'number'
			},
			zIndex:{
				name: '控件层级',
				type: 1,
				dataType: 'number'
			},
			dType:{
				name: '数据类型',
				type: 1,
				dataType: 'number'
			},
			units:{
				name: '单位',
				type: 1,
				dataType: 'text'
			},
			decimals:{
				name: '小数位数',
				type: 1,
				dataType: 'number'
			},
			hl:{
				name: '高低位',
				type: 1,
				dataType: 'number'
			},
			max: {
				name: '最大值',
				type: 1,
				dataType: 'number'
			},
			min: {
				name: '最小值',
				type: 1,
				dataType: 'number'
			},
			rwType: {
				name: '读写类型',
				type: 1,
				dataType: 'number'
			},
			level: {
				name: '查看等级',
				type: 1,
				dataType: 'number'
			},
			writeNO: {
				name: '设备地址',
				type: 1,
				dataType: 'number'
			},
			writeCmd: {
				name: '功能码',
				type: 1,
				dataType: 'number'
			},
			writeAdd:{
				name: '写地址',
				type: 1,
				dataType: 'number'
			}
		}		
	},
	3: {
		name: '静态图片',
		type: 'image',
		showType: 100011,
		isData: 0,
		options: {
			title:{
				name: '组件名称',
				type: 1,
				dataType: 'text'
			},
			width:{
				name: '控件宽',
				type: 1,
				dataType: 'number'
			},
			height:{
				name: '控件高',
				type: 1,
				dataType: 'number'
			},
			zIndex:{
				name: '控件层级',
				type: 1,
				dataType: 'number'
			},
			defaultImg:{
				name: '图片链接',
				type: 1,
				dataType: 'url'
			},
			upload:{
				name: '图片控件',
				type: 2,
				dataType: 'file'
			}
		}
	},
	4: {
		name: '正反图片',
		type: 'boolean',
		showType: 100001,
		isData: 1,
		options: {
			index:{
				name: '控件顺序',
				type: 1,
				dataType: 'number'
			},
			title:{
				name: '组件名称',
				type: 1,
				dataType: 'text'
			},
			width:{
				name: '控件宽',
				type: 1,
				dataType: 'number'
			},
			height:{
				name: '控件高',
				type: 1,
				dataType: 'number'
			},
			zIndex:{
				name: '控件层级',
				type: 1,
				dataType: 'number'
			},			
			defaultImg:{
				name: '默认图片',
				type: 1,
				dataType: 'url'
			},
			currentImg:{
				name: '当前图片',
				type: 1,
				dataType: 'url'
			},
			dType:{
				name: '数据类型',
				type: 1,
				dataType: 'number'
			},
			units:{
				name: '单位',
				type: 1,
				dataType: 'text'
			},
			decimals:{
				name: '小数位数',
				type: 1,
				dataType: 'number'
			},
			hl:{
				name: '高低位',
				type: 1,
				dataType: 'number'
			},
			max: {
				name: '最大值',
				type: 1,
				dataType: 'number'
			},
			min: {
				name: '最小值',
				type: 1,
				dataType: 'number'
			},
			rwType: {
				name: '读写类型',
				type: 1,
				dataType: 'number'
			},
			level: {
				name: '查看等级',
				type: 1,
				dataType: 'number'
			},
			writeNO: {
				name: '设备地址',
				type: 1,
				dataType: 'number'
			},
			writeCmd: {
				name: '功能码',
				type: 1,
				dataType: 'number'
			},
			writeAdd:{
				name: '写地址',
				type: 1,
				dataType: 'number'
			},
			upload:{
				name: '图片控件',
				type: 2,
				dataType: 'file'
			}
		}
	},
	5: {
		name: '折线图',
		type: 'curve',
		showType: 100007,
		isData: 1,
		options: {
			index:{
				name: '控件顺序',
				type: 1,
				dataType: 'number'
			},
			title:{
				name: '组件名称',
				type: 1,
				dataType: 'text'
			},
			width:{
				name: '控件宽',
				type: 1,
				dataType: 'number'
			},
			height:{
				name: '控件高',
				type: 1,
				dataType: 'number'
			},
			zIndex:{
				name: '控件层级',
				type: 1,
				dataType: 'number'
			},
			yAxis:{
				name: 'Y坐标',
				type: 1,
				dataType: 'text',
				tips: '数值表示的含义'
			},
			dType:{
				name: '数据类型',
				type: 1,
				dataType: 'number'
			},
			units:{
				name: '单位',
				type: 1,
				dataType: 'text'
			},
			decimals:{
				name: '小数位数',
				type: 1,
				dataType: 'number'
			},
			hl:{
				name: '高低位',
				type: 1,
				dataType: 'number'
			},
			max: {
				name: '最大值',
				type: 1,
				dataType: 'number'
			},
			min: {
				name: '最小值',
				type: 1,
				dataType: 'number'
			},
			rwType: {
				name: '读写类型',
				type: 1,
				dataType: 'number'
			},
			level: {
				name: '查看等级',
				type: 1,
				dataType: 'number'
			},
			writeNO: {
				name: '设备地址',
				type: 1,
				dataType: 'number'
			},
			writeCmd: {
				name: '功能码',
				type: 1,
				dataType: 'number'
			},
			writeAdd:{
				name: '写地址',
				type: 1,
				dataType: 'number'
			}
		}
	},
	6: {
		name: '柱状图',
		type: 'column',
		showType: 100005,
		isData: 1,
		options: {
			index:{
				name: '控件顺序',
				type: 1,
				dataType: 'number'
			},
			title:{
				name: '组件名称',
				type: 1,
				dataType: 'text'
			},
			width:{
				name: '控件宽',
				type: 1,
				dataType: 'number'
			},
			height:{
				name: '控件高',
				type: 1,
				dataType: 'number'
			},
			zIndex:{
				name: '控件层级',
				type: 1,
				dataType: 'number'
			},
			yAxis:{
				name: 'Y坐标',
				type: 1,
				dataType: 'text',
				tips: '数值表示的含义'
			},
			dType:{
				name: '数据类型',
				type: 1,
				dataType: 'number'
			},
			units:{
				name: '单位',
				type: 1,
				dataType: 'text'
			},
			decimals:{
				name: '小数位数',
				type: 1,
				dataType: 'number'
			},
			hl:{
				name: '高低位',
				type: 1,
				dataType: 'number'
			},
			max: {
				name: '最大值',
				type: 1,
				dataType: 'number'
			},
			min: {
				name: '最小值',
				type: 1,
				dataType: 'number'
			},
			rwType: {
				name: '读写类型',
				type: 1,
				dataType: 'number'
			},
			level: {
				name: '查看等级',
				type: 1,
				dataType: 'number'
			},
			writeNO: {
				name: '设备地址',
				type: 1,
				dataType: 'number'
			},
			writeCmd: {
				name: '功能码',
				type: 1,
				dataType: 'number'
			},
			writeAdd:{
				name: '写地址',
				type: 1,
				dataType: 'number'
			}
		}
	},
	7: {
		name: '速度仪',
		type: 'speed',
		showType: 100004,
		isData: 1,
		options: {
			index:{
				name: '控件顺序',
				type: 1,
				dataType: 'number'
			},
			title:{
				name: '组件名称',
				type: 1,
				dataType: 'text'
			},
			width:{
				name: '控件宽',
				type: 1,
				dataType: 'number'
			},
			height:{
				name: '控件高',
				type: 1,
				dataType: 'number'
			},
			zIndex:{
				name: '控件层级',
				type: 1,
				dataType: 'number'
			},
			min:{
				name: '最小值',
				type: 1,
				dataType: 'number'
			},
			max:{
				name: '最大值',
				type: 1,
				dataType: 'number'
			},
			dType:{
				name: '数据类型',
				type: 1,
				dataType: 'number'
			},
			units:{
				name: '单位',
				type: 1,
				dataType: 'text'
			},
			decimals:{
				name: '小数位数',
				type: 1,
				dataType: 'number'
			},
			hl:{
				name: '高低位',
				type: 1,
				dataType: 'number'
			},
			rwType: {
				name: '读写类型',
				type: 1,
				dataType: 'number'
			},
			level: {
				name: '查看等级',
				type: 1,
				dataType: 'number'
			},
			writeNO: {
				name: '设备地址',
				type: 1,
				dataType: 'number'
			},
			writeCmd: {
				name: '功能码',
				type: 1,
				dataType: 'number'
			},
			writeAdd:{
				name: '写地址',
				type: 1,
				dataType: 'number'
			}
		}
	},
	8: {
		name: '伏压仪',
		type: 'voltage',
		showType: 100015,
		isData: 1,
		options: {
			index:{
				name: '控件顺序',
				type: 1,
				dataType: 'number'
			},
			title:{
				name: '组件名称',
				type: 1,
				dataType: 'text'
			},
			width:{
				name: '控件宽',
				type: 1,
				dataType: 'number'
			},
			height:{
				name: '控件高',
				type: 1,
				dataType: 'number'
			},
			zIndex:{
				name: '控件层级',
				type: 1,
				dataType: 'number'
			},
			min:{
				name: '最小值',
				type: 1,
				dataType: 'number'
			},
			max:{
				name: '最大值',
				type: 1,
				dataType: 'number'
			},
			dType:{
				name: '数据类型',
				type: 1,
				dataType: 'number'
			},
			units:{
				name: '单位',
				type: 1,
				dataType: 'text'
			},
			decimals:{
				name: '小数位数',
				type: 1,
				dataType: 'number'
			},
			hl:{
				name: '高低位',
				type: 1,
				dataType: 'number'
			},
			rwType: {
				name: '读写类型',
				type: 1,
				dataType: 'number'
			},
			level: {
				name: '查看等级',
				type: 1,
				dataType: 'number'
			},
			writeNO: {
				name: '设备地址',
				type: 1,
				dataType: 'number'
			},
			writeCmd: {
				name: '功能码',
				type: 1,
				dataType: 'number'
			},
			writeAdd:{
				name: '写地址',
				type: 1,
				dataType: 'number'
			}
		}
	}
};