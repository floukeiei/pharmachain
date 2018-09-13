<template>
  <div class="home">
    <b-container class="bv-example-row">
      <b-row>
        <b-col>
          <!-- <Order msg="This is order" /> -->
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-button size="lg" variant="success" v-on:click="setDrugList()">
            Add
          </b-button>
          <b-button size="lg" variant="danger" v-on:click="saveOrder()">
            Save
          </b-button>
        </b-col>
        <b-col cols="9"></b-col>
      </b-row>
      <b-row v-for="drug in drugs" :key="drug.id">
        <b-col>
          <div>
            <Drug :drug=drug @drugDelete="deleteDrug" :key="drug.id" />
          </div>
        </b-col>
      </b-row>
    </b-container>

  </div>
</template>

<script>
// @ is an alias to /src
import Drug from '@/components/Drug.vue'
import axios from 'axios'
export default {
  name: 'order',
  components: {
    Drug
  },
  data () {
    return {
      drugs: [{
        id: '1',
        drugName: 'Deadpool',
        drugCount: 1
      }],
      contacts: this.$store.state.contacts,
      user: this.$store.getters['user/user']
    }
  },
  methods: {
    setDrugList () {
      var drug = {
        id: Math.random(),
        drugName: 'Deadpool',
        drugCount: 1
      }
      this.drugs.push(drug)
    },
    deleteDrug (id) {
      const index = this.drugs.findIndex((value) => value.id === id)
      this.drugs.splice(index, 1)
    },
    saveOrder () {
      axios.post(process.env.VUE_APP_AWSALL + 'addPrescription', {
        'toAddress': this.contacts.address,
        'patientName': 'new',
        'physicianName': this.user.displayName,
        'drugs': this.drugs
      })
        .then(function (response) {
          // resultElement.innerHTML = generateSuccessHTMLOutput(response)
          console.log(response.data.data)
          alert('success')
          console.log('success')
        })
    }
  }
}
</script>
