<template>
    <div>
        <h1 class="center-align">Edycja</h1>
        <div class="card">
            <div class="card-content">
                <form @submit.prevent="updateMass" >
                    <div class="row">
                        <div class="input-field col s12">
                            <datepicker v-model="msza.data" id="data" placeholder="Select Date" format="dd.MM.yyyy"></datepicker>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
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
                        <button type="submit" class="btn waves-effect waves-light light-green btn-large">Zapisz mszę <i class="material-icons">save</i>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>

</template>

<script>
import { db } from '../../config';
import Datepicker from 'vuejs-datepicker';

export default {
    props: ['id'],
    data(){
        return {
            db: db
        }
    },
    components: {
        name: 'EditMass',
        datepicker: Datepicker
    },
    computed:{
        msza(){
            return this.$store.getters.loadedMass(this.id);
        },
        churches(){
            return this.$store.getters.loadedChurches;
        },
        dateToFB() {
            if(this.msza.data instanceof Date)
                return this.msza.data.toISOString();
            // let d = this.msza.data.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
            // return (d) ? (new Date(d[1], d[2]-1, d[3])).toISOString() : this.msza.data;
        }
    },
    methods: {
        updateMass() {
            let o = {
                ...this.msza
            };
            o.data = this.dateToFB;
            o.id = this.id;
            // this.db.ref('msze').child(this.id).set(o);
            this.$store.dispatch('updateMass', o);
            this.$router.push('/');
        }
    }
}
</script>
