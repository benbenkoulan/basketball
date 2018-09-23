import Vue from 'vue'
import Vuex from 'vuex'

import league from './modules/league'
import game from './modules/game'

Vue.use(Vuex)

export default function createStore(){
	return new Vuex.Store({
		//state,
		//actions,
		//mutations,
		//getters
		modules: {
			game,
			league
		}
	})
}