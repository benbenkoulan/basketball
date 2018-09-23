import { getLeagues } from 'api'

const state = {
	leagues: [],
	selectedLeague: undefined,
}

const mutations = {
	FETCH_LEAGUES(state, leagues = []){
		state.leagues = leagues.map((league) => {
			league.follow = league.teams.every(team => team.follow);
			return league;
		});
		state.selectedLeague = leagues[0];
	},

	FOLLOW_LEAGUE(state, leagueID) {
		const followLeague = state.leagues.find(league => league.leagueID === leagueID);
		if (followLeague) {
			const follow = !followLeague.follow;
			followLeague.teams = followLeague.teams.map((team) => {
				team.follow = follow;
				return team;
			});
			followLeague.follow = follow;
		}
	},

	FOLLOW_TEAM(state, { leagueID, teamID } = {}) {
		const followLeague = state.leagues.find(league => league.leagueID === leagueID);
		if (followLeague) {
			const followTeam = followLeague.teams.find(team => team.teamID === teamID);
			if (followTeam) {
				followTeam.follow = !followTeam.follow;
				followLeague.follow = followLeague.teams.every(team => team.follow);
			}
		}
	},

	CHANGE_SELECTED_LEAGUE(state, leagueID) {
		state.selectedLeague = state.leagues.find(league => league.leagueID === leagueID);
	},
}

const actions = {
	FETCH_LEAGUES({ commit }){
		return getLeagues().then(rsp => {
			const leagues = rsp.data || [];
			commit('FETCH_LEAGUES', leagues)
		});
	},
}

const getters = {
	followedTeams(state){
		const teams = state.leagues.reduce((leagueTeams, league) => {
			leagueTeams = leagueTeams.concat(league.teams.filter(team => team.follow));
			return leagueTeams;
		}, []);
		return teams;
	}
}

export default { state, mutations, actions, getters }