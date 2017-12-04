import { get } from 'utils/ajax'

export function getLeagues(){
	return get({ url: '/data/leagues.json' });
}