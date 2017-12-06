import { getLeagues } from 'api'

const state = {
	leagues: []
}

const mutations = {
	FETCH_LEAGUES(state, leagues){
		state.leagues = leagues;
	}
}

const actions = {
	FETCH_LEAGUES({ commit }){
		return getLeagues().then(rsp => {
			var leagues = rsp.data;
			commit('FETCH_LEAGUES', leagues)
		})
	},
	UPDATE_LEAGUES({ commit }, leagues){
		commit('FETCH_LEAGUES', leagues)
	}
}

const getters = {
	followedTeams(state){
		var teams = [];
		state.leagues.forEach(league => {
			teams = teams.concat(league.teams.filter(team => team.follow));
		})
		return teams;
	}
}

export default { state, mutations, actions, getters }