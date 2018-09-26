<template>
    <div>
        <h1 class="center-align">Dodawanie mszy</h1>

        <div class="card">
            <div class="card-content">
                <form @submit.prevent="addMass" >
                    <div class="row">
                        <div class="input-field col s12 l6">
                            <datepicker  id="data" placeholder="Select Date" v-model="msza.data" format="dd.MM.yyyy"></datepicker>
                        </div>
                        <div class="input-field col s12 l6">
                            <label for="msza" :class="{active: msza.msza}">Msza</label>
                            <input type="text" class="validate" v-model="msza.msza" id="msza" list="masses">

                            <datalist id="masses">
                                <option :value="mass" v-for="mass of cMasses" v-bind:key="mass"></option>
                            </datalist>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <label for="church" :class="{active: msza.kosciol}">Kościół</label>
                            <input type="text" class="validate" v-model="msza.kosciol" id="church" list="churches">

                            <datalist id="churches">
                                <option v-for="church of churches" :key="church.id" :value="church.kosciol"></option>
                            </datalist>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <label for="w" :class="{active: msza.piesni.w}">Pieśń na wejście</label>
                            <input type="text" class="validate" v-model="msza.piesni.w" id="w">
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <label for="pd" :class="{active: msza.piesni.pd}">Pieśń na przygotowanie darów</label>
                            <input type="text" class="validate" v-model="msza.piesni.pd" id="pd">
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <label for="k" :class="{active: msza.piesni.k}">Pieśń na komunie</label>
                            <input type="text" class="validate" v-model="msza.piesni.k" id="k">
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <label for="u" :class="{active: msza.piesni.u}">Pieśń na uwielbienie</label>
                            <input type="text" class="validate" v-model="msza.piesni.u" id="u">
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <label for="z" :class="{active: msza.piesni.z}">Pieśń na zakończenie</label>
                            <input type="text" class="validate" v-model="msza.piesni.z" id="z">
                        </div>
                    </div>
                    <div>
                        <button type="submit" class="btn waves-effect waves-light light-green btn-large">Dodaj mszę <i class="material-icons">add</i>
                        </button>
                    </div>
                </form>
            </div>
        </div>

    </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';

export default {
    components: {name: 'AddMass', Datepicker},
    data(){
        return{
            msza: {
                data: new Date(),
                kosciol: '',
                msza: '',
                piesni: {
                    k: '',
                    pd: '',
                    u: '',
                    w: '',
                    z: ''
                }
            }
        }
    },
    computed: {
        churches(){
            return this.$store.getters.loadedChurches;
        },
        cMasses(){
            return this.$store.getters.cMasses;
        }
    },
    methods: {
        addMass(){
            this.$store.dispatch('addMass', this.msza);
            this.msza = {
                data: new Date(),
                kosciol: '',
                msza: '',
                piesni: {
                    k: '',
                    pd: '',
                    u: '',
                    w: '',
                    z: ''
                }
            };
            this.$router.push('/');
        }
    }
}
</script>
