import get from 'utils/ajax'
import WSC from 'com/websocket/client'

export function getLeagues(){
	return get({ url: '/data/leagues.json' });
}

export function getFollowTeams(){
	return get({ url: '/data/follow-teams.json' });
}

export function getGames(){
	return get({ url: '/data/games.json' });
}

var wsc;
function getWSC(){
	if(!wsc) wsc = new WSC();
	return wsc;
}

export const Game = {
	updateGame(game){
		const wsc = getWSC();
		const data = { type: 'UPDATE_GAME', game }
		wsc.send(JSON.stringify(data));
	}
}