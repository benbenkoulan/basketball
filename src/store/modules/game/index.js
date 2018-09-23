import { getGames } from 'api'

const state = {
	games: []
}

const mutations = {
	FETCH_GAMES(state, games){
		state.games = games;
	}
}

const actions = {
	FETCH_GAMES({ commit }){
		return getGames().then(rsp => {
			const games = rsp.data || [];
			commit('FETCH_GAMES', games)
		})
	}
}

export default {
	state,
	mutations,
	actions
}