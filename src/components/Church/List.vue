<template>
    <div>

        <div class="row">
            <form @submit.prevent="addChurch">
                <div class="input-field col s12">
                    <label for="church">Dodaj nowy Kościół</label>
                    <input type="text" class="validate" v-model="newChurch" id="church">
                </div>
                <div class="input-field col">
                    <button class="btn waves green">Dodaj kościół <i class="material-icons">add</i></button>
                </div>
            </form>
        </div>

        <div class="row">
            <h2>Lista kościołów</h2>

            <ul class="collection">
                <li class="collection-item" v-for="church of churches" :key="church.id">{{church.kosciol}}  <button @click="removeChurch(church.id)" class="btn-flat red-text waves-effect waves-red">Usuń <i class="material-icons">remove</i></button></li>
            </ul>
        </div>

    </div>
</template>

<script>
export default {
    data(){
        return {
            newChurch: ''
        }
    },
    computed: {
        churches(){
            return this.$store.getters.loadedChurches;
        }
    },
    methods:{
        addChurch(){
            this.$store.dispatch('addChurch', this.newChurch).then(data => {
                this.newChurch = '';
            });
        },
        removeChurch(id){
            this.$store.dispatch('removeChurch', id);
        }
    }
}
</script>

<style scoped>

</style>