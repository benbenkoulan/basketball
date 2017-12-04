import { getLeagues } from 'api'

const state = {
	leagues: []
}

const mutations = {
	FETCH_LEAGUES(state, leagues){;
		console.log(leagues);
		state.leagues = leagues;
	}
}

const actions = {
	FETCH_LEAGUES({ commit }){
		return getLeagues().then(rsp => {
			var leagues = rsp.data;
			commit('FETCH_LEAGUES', leagues)
		});
	}
}

export default { state, mutations, actions }