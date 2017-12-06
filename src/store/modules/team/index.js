import { getFollowTeams } from 'api'

const state = {
	teams: []
}

const mutations = {
	FETCH_FOLLOW_TEAMS(state, teams){
		state.teams = teams;
	}
}

const actions = {
	FETCH_FOLLOW_TEAMS({ commit }){
		return getFollowTeams().then(rsp => {
			var teams = rsp.data;
			commit('FETCH_FOLLOW_TEAMS', teams)
		})
	},
	UPDATE_FOLLOW_TEAMS({ commit }, teams){
		commit('FETCH_FOLLOW_TEAMS', teams)
	}
}

export default { state, mutations, actions }