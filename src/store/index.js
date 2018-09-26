import Vue from 'vue';
import Vuex from 'vuex';
import {db} from '../config';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        loadedMasses: [],
        loadedChurches: [],
        cMasses: [
            'Raka',
            'Dwornika',
            'Pawlaka',
            'Jakaca',
            'Machury',
            'Piaseckiego',
            'Chlondowskiego'
        ]
    },
    mutations: {
        addMass(state, payload) {
            state.loadedMasses.push(payload);
        },
        updateMass(state, payload){
            let i = state.loadedMasses.findIndex(o => {return o.id === payload.id});
            state.loadedMasses[i] = payload;
        },
        deleteMass(state, payload){
            state.loadedMasses = state.loadedMasses.filter(item => {
                return item.id !== payload.id;
            });
        },

        addChurch(state, payload){
            state.loadedChurches.push(payload);
        },
        removeChurch(state, payload){
            state.loadedChurches = state.loadedChurches.filter(item => {
                return item.id !== payload.id;
            });
        }
    },
    actions: {
        loadMasses({commit}){
            db.ref('msze').once('value',).then(snapshot => {
                snapshot.forEach(msza => {
                    commit('addMass', {
                        id: msza.key,
                        data: msza.val().data,
                        kosciol: msza.val().kosciol,
                        msza: msza.val().msza,
                        piesni: msza.val().piesni
                    });
                });
            }).catch(e => {console.warn(e)});
        },
        addMass({commit}, payload){
            const mass = {
                msza: payload.msza,
                data: payload.data,
                kosciol: payload.kosciol,
                piesni: payload.piesni
            };
            db.ref('msze').push(mass)
                .then((data) => {
                    console.log(data);
                    commit('addMass', {
                        ...mass,
                        id: data.key
                    });
                })
                .catch((e) => console.warn(e));
        },
        updateMass({commit}, payload){
            let mass = {
                kosciol: payload.kosciol,
                data: payload.data,
                msza: payload.msza,
                piesni: payload.piesni
            };
            db.ref('msze').child(payload.id).set(mass).then(data => {
                commit('updateMass', {
                    ...payload
                });
                console.log(data);
            }).catch(e => {console.warn(e)});
        },
        deleteMass({commit}, payload){
            db.ref('msze').child(payload).remove().then(data => {
                commit('deleteMass', {
                    id: payload
                });
            }).catch(e => {console.warn(e);});
        },

        loadChurches({commit}){
            db.ref('koscioly').once('value').then(snapshot => {
                snapshot.forEach(kosciol => {
                    commit('addChurch', {
                        id: kosciol.key,
                        kosciol: kosciol.val()
                    });
                });
            }).catch(e => {console.warn(e)});
        },
        addChurch({commit}, payload){
            db.ref('koscioly').push(payload).then(data => {
                commit('addChurch', {
                    id: data.key,
                    kosciol: payload
                });
            }).catch(e => {console.warn(e)});
        },
        removeChurch({commit}, payload){
            db.ref('koscioly').child(payload).remove().then(data => {
                commit('removeChurch', {id: payload});
            }).catch(e => {console.warn(e)});
        }
    },
    getters: {
        loadedMasses(state) {
            return state.loadedMasses.sort((massA, massB) => {
                return (massA.data < massB.data);
            });
        },
        loadedMass(state) {
            return (id) => {
                return state.loadedMasses.find((mass) => {
                    return id === mass.id;
                })
            }
        },
        loadedChurches(state) {
            return state.loadedChurches.sort();
        },
        cMasses(state) {
            return state.cMasses.sort();
        }
    }
});