import Axios from 'axios'

function createAxios(context){
	const headers = {};
	const config = {
		timeout: 3000,
		baseURL: 'http://basketball.m.hualala.com',
		headers,
	}
	if(!G.client && context){
		headers.Host = context.Host;
		headers.Cookie = context.Cookie;
		headers.Origin = context.Origin;
		headers.Referer = context.Referer;
		headers['User-Agent'] = context['User-Agent'];
	}
	return Axios.create(config);
}

export default function get({ url = '', params = {} } = {}, context){
	const axios = createAxios(context);
	return new Promise(resolve => {
		axios.get(url, { params })
		.then(resolve)
		.catch(err => {
			const { status: code = '', statusText: msg = '' } = err || {};
			return { code, msg, isError: true };
		});
	});
}

export function post({ url = '', data = {} } = {}, context){
	const axios = createAxios(context);
	return new Promise(resolve => {
		axios.post(url, { data })
		.then(resolve)
		.catch(err => {
			const { status: code = '', statusText: msg = '' } = err || {};
			return { code, msg, isError: true };
		})
	});
}