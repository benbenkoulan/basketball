import { get } from 'utils/ajax'

export function getLeagues(){
	return get({ url: '/data/leagues.json' });
}

export function getFollowTeams(){
	return get({ url: '/data/follow-teams.json' })
}