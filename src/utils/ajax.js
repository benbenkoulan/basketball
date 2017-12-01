import Axios from 'axios'

function createAxios(context){
	var headers = {};
	var config = {
		timeout: 5000,
		headers
	}

	if(!G.isClient && context){
		headers.Host = context.Host;
		headers.Cookie = context.Cookie;
		headers.Origin = context.Origin;
		headers.Referer = context.Referer;
		headers['User-Agent'] = context['User-Agent'];
	}

	return Axios.create(config);
}

export function get(options, context){
	var axios = createAxios(context);

	return new Promise(resolve => {
		var callback = res => { resolve(res) }
		axios.get(options.url, { params: options.params })
		.then(callback)
		.catch(err => {
			err.isError = true;
			return err;
		})
	});
}

export function post(options, context){
	var axios = createAxios(context);

	return new Promise(resolve => {
		var callback = res => { resolve(res) }
		axios.post(options.url, options.data)
		.then(callback)
		.catch(err => {
			err.isError = true;
			return err;
		})
	});
}