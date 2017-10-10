/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: api地址
 * routerMode: 路由模式
 * 
 */
let baseUrl; 
let routerMode;

if (process.env.NODE_ENV == 'development') {
	baseUrl = '';
	routerMode = 'history'
}else{
	baseUrl = '';
	routerMode = 'hash'
}

export {
	baseUrl,
	routerMode,
}