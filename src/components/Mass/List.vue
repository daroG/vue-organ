<template>
    <div>
        <h1 class="center-align">Lista mszy</h1>
        <div class="row">
            <div class="col xl4 m6 s12" v-for="msza of msze" :key="msza['.key']">
                <div class="card">
                    <div class="card-content">
                        <table class="highlight">
                            <tr>
                                <td>Data</td>
                                <td>{{msza.data | date}}</td>
                            </tr>
                            <tr>
                                <td>Kościół</td>
                                <td>{{msza.kosciol}}</td>
                            </tr>
                            <tr>
                                <td>Msza</td>
                                <td>{{msza.msza}}</td>
                            </tr>
                            <tr>
                                <td>Wejście</td>
                                <td>{{msza.piesni.w}}</td>
                            </tr>
                            <tr>
                                <td>Przygotowanie darów</td>
                                <td>{{msza.piesni.pd}}</td>
                            </tr>
                            <tr>
                                <td>Komunia</td>
                                <td>{{msza.piesni.k}}</td>
                            </tr>
                            <tr>
                                <td>Uwielbienie</td>
                                <td>{{msza.piesni.u}}</td>
                            </tr>
                            <tr>
                                <td>Zakończenie</td>
                                <td>{{msza.piesni.z}}</td>
                            </tr>
                        </table>
                    </div>
                    <div class="card-action center-align">
                        <router-link :to="{ name: 'Edit', params: {id: msza.id} }">Edit <i class="material-icons">edit</i>
                        </router-link>
                        <a href="#prompt" data-target="prompt" class="red-text text-darken-3 modal-trigger"
                           @click="setToDelete(msza.id)">Usuń <i class="material-icons">delete</i></a>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal" id="prompt">
            <div class="modal-content">
                <h2 class="center-align">
                    Czy na pewno usunąć ten wpis?
                </h2>
            </div>
            <div class="modal-footer center">
                <button class="btn btn-large waves orange modal-close" @click.prevent="clearToDelete()">Nie <i
                        class="material-icons">cancel</i></button>
                <button class="btn btn-large waves red modal-close" @click.prevent="deleteMass()">Usuń <i
                        class="material-icons">delete</i></button>
            </div>
        </div>
    </div>
</template>

<style>
    .modal .modal-footer {
        text-align: center;
        height: 70px;
    }

    table tr td:first-of-type {
        text-align: right;
        font-weight: bolder;
        width: 50%;
    }
</style>

<script>

document.addEventListener('DOMContentLoaded', function () {
    let elems = document.querySelectorAll('.modal');
    let instances = M.Modal.init(elems, {});
});

export default {
    components: {name: 'ListMass'},
    data() {
        return {
            toDelete: false
        }
    },
    computed: {
        msze() {
            return this.$store.getters.loadedMasses;
        }
    },
    methods: {
        deleteMass() {
            if (this.toDelete) {
                this.$store.dispatch('deleteMass', this.toDelete);
                this.clearToDelete();
            }
        },
        setToDelete(key) {
            this.toDelete = key;
        },
        clearToDelete() {
            this.toDelete = false;
        }
    },
    filters: {
        date(value, s = ".") {
            if(!value)return '';
            let d = new Date(value),
                day = d.getDate(),
                month = d.getMonth()+1,
                year = d.getFullYear();
            day = (day<10) ? "0" + day : day;
            month = (month<10) ? "0" + month : month;
            return day + s + month + s + year;
        }
    }
}
</script>
