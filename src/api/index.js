import { get } from 'utils/ajax'
import WSC from 'com/websocket/client'

export function getLeagues(){
	return get({ url: '/data/leagues.json' });
}

export function getFollowTeams(){
	return get({ url: '/data/follow-teams.json' })
}

var wsc;
function getWSC(){
	if(!wsc) wsc = new WSC();
	return wsc;
}
export const Game = {
	updateGame(){
		
	},
	getGames(){
		
	}
}