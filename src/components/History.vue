<template>
  <b-container style="width: 43%;margin-top: 10px;" fluid>
    <!-- User Interface controls -->

    <!-- Main table element -->
    <b-table show-empty
             stacked="md"
             :items="items"
             :fields="fields"
             :current-page="currentPage"
             :per-page="perPage"
             :sort-by.sync="sortBy"
             :sort-desc.sync="sortDesc"
             :sort-direction="sortDirection"
             @filtered="onFiltered"
    >
      <template slot="patientName" slot-scope="row">{{row.value}}</template>
      <template slot="physicianName" slot-scope="row">{{row.value}}</template>
      <!-- <template slot="regdate" slot-scope="row" >{{row.value}} -->
         <!-- <b-form-input v-model="row.item.age" type="number" ></b-form-input> -->
      <!-- </template> -->
      <!-- <template slot="expdate" slot-scope="row">{{row.value}}</template> -->
      <template slot="actions" slot-scope="row">
        <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
        <b-button size="sm" @click.stop="info(row.item, row.index, $event.target)" class="mr-1">
          Info
        </b-button>
        <!-- <b-button size="sm" @click.stop="row.toggleDetails">
          {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
        </b-button> -->
      </template>
      <template slot="row-details" slot-scope="row">
        <b-card>
          <ul>
            <li v-for="(value, key) in row.item.medicine" :key="key" style="text-align:left">{{ value.medicine}} :{{ value.amount}}</li>
          </ul>
        </b-card>
      </template>
    </b-table>

    <b-row>
      <b-col md="6" class="my-1">
        <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
      </b-col>
    </b-row>

    <!-- Info modal -->
    <b-modal id="modalInfo" @hide="resetModal" :title="modalInfo.title"  ok-only>
      <!-- <pre>{{ modalInfo.content }}</pre> -->
       <ul>
            <li v-for="(value, key) in modalInfo.content" :key="key" style="text-align:left">name : {{ value[2]}}  amount: {{ value[3]}}</li>
            <li>{{modalInfo.id}}</li>
          </ul>
    </b-modal>

  </b-container>
</template>

<script>
import axios from 'axios'
const items = [
  { isActive: true,
    regdate: '12/08/2560',
    expdate: '12/09/2560',
    patientName: 'Dickerson',
    physicianName: 'Peter',
    medicine: [
      { amount: 40, medicine: 'Acetazolamide' },
      { amount: 10, medicine: 'Baclofen' },
      { amount: 20, medicine: 'Trazodone' },
      { amount: 5, medicine: 'Verapamil' },
      { amount: 12, medicine: 'Warfarin' }
    ] },
  { isActive: true, regdate: '12/08/2560', expdate: '12/09/2560', patientName: 'Peter', physicianName: 'Peter' },
  { isActive: true, regdate: '12/08/2560', expdate: '12/09/2560', patientName: 'Mana', physicianName: 'Peter' },
  { isActive: true, regdate: '12/08/2560', expdate: '12/09/2560', patientName: 'Jeab', physicianName: 'Peter' },
  { isActive: true, regdate: '12/08/2560', expdate: '12/09/2560', patientName: 'Jo', physicianName: 'Peter' }

]
export default {
  created () {
    // let json = {
    //   'data': [
    //     [
    //       '0xD34174b35F99f184b62e269be6a1a5d66f5bC279',
    //       '0xE431389a93d48c53DF2354542c801e10d27c59E9',
    //       'โจ',
    //       'ฟลุ๊ค'
    //     ],
    //     [
    //       '0xD34174b35F99f184b62e269be6a1a5d66f5bC279',
    //       '0xE431389a93d48c53DF2354542c801e10d27c59E9',
    //       'โจ',
    //       'ฟลุ๊ค'
    //     ],
    //     [
    //       '0xD34174b35F99f184b62e269be6a1a5d66f5bC279',
    //       '0xE431389a93d48c53DF2354542c801e10d27c59E9',
    //       'a',
    //       'b'
    //     ],
    //     [
    //       '0xD34174b35F99f184b62e269be6a1a5d66f5bC279',
    //       '0xE431389a93d48c53DF2354542c801e10d27c59E9',
    //       'a',
    //       'bb'
    //     ]
    //   ]
    // }

    // console.log(json.data)
    // this.items = []
    // for (let item in json.data) {
    //   let data = {
    //     patientName: null,
    //     physicianName: null
    //   }
    //   // this.$store.state.contacts.address = snapshot.val()[key].address
    //   // this.$store.state.contacts.role = snapshot.val()[key].role
    //   // console.log(this.$store.state.contacts.privateKey)
    //   // console.log(this.$store.state.contacts.role)
    //   // console.log(item)
    //   data.patientName = json.data[item][2]
    //   data.physicianName = json.data[item][3]
    //   this.items.push(data)
    //   console.log(json.data[item][2])
    // }
    axios
      .get(process.env.VUE_APP_AWSALL + 'getAllPrescriptionByAddress/' + this.contacts.address)
      .then(response => {
        // let data = {
        //   fromAddress: null,
        //   toAddress: null,
        //   patientName: null,
        //   physicianName: null
        // }
        console.log(response.data.data)

        this.items = []
        for (let item in response.data.data) {
          let data = {
            patientName: null,
            physicianName: null,
            id: null,
            fromaddress: null,
            toaddress: null
          }
          // this.$store.state.contacts.address = snapshot.val()[key].address
          // this.$store.state.contacts.role = snapshot.val()[key].role
          // console.log(this.$store.state.contacts.privateKey)
          // console.log(this.$store.state.contacts.role)
          // console.log(item)
          data.id = response.data.data[item][0]
          data.fromaddress = response.data.data[item][1]
          data.toaddress = response.data.data[item][2]
          data.patientName = response.data.data[item][3]
          data.physicianName = response.data.data[item][4]
          this.items.push(data)
          // console.log(json.data[item][2])
        }
      })
  },
  data () {
    return {
      items: [],
      fields: [
        { key: 'patientName', label: 'Patient name', sortable: true, sortDirection: 'desc' },
        { key: 'physicianName', label: 'Physician name', sortDirection: 'desc' },
        { key: 'actions', label: 'Actions' }
      ],
      currentPage: 1,
      perPage: 5,
      totalRows: items.length,
      pageOptions: [ 5, 10, 15 ],
      sortBy: null,
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      modalInfo: { title: '', content: '', id: '' },
      contacts: this.$store.state.contacts
    }
  },
  computed: {
    sortOptions () {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => { return { text: f.label, value: f.key } })
    }
  },
  methods: {
    info (item, index, button) {
      axios
        .get(process.env.VUE_APP_AWSALL + 'getDrug/' + item.id)
        .then(response => {
        // let data = {
        //   fromAddress: null,
        //   toAddress: null,
        //   patientName: null,
        //   physicianName: null
        // }
          console.log(response.data.data)
          this.modalInfo.title = `Drug`
          this.modalInfo.id = item.id
          // this.modalInfo.content = JSON.stringify(item, null, 2)
          this.modalInfo.content = response.data.data
          this.$root.$emit('bv::show::modal', 'modalInfo', button)

          // this.items = []
          // for (let item in response.data.data) {
          //   let data = {
          //     patientName: null,
          //     physicianName: null,
          //     id: null,
          //     fromaddress: null,
          //     toaddress: null
          //   }
          //   // this.$store.state.contacts.address = snapshot.val()[key].address
          //   // this.$store.state.contacts.role = snapshot.val()[key].role
          //   // console.log(this.$store.state.contacts.privateKey)
          //   // console.log(this.$store.state.contacts.role)
          //   // console.log(item)
          //   data.id = response.data.data[item][0]
          //   data.fromaddress = response.data.data[item][1]
          //   data.toaddress = response.data.data[item][2]
          //   data.patientName = response.data.data[item][3]
          //   data.physicianName = response.data.data[item][4]
          //   this.items.push(data)
          // // console.log(json.data[item][2])
          // }
        })
    },
    resetModal () {
      this.modalInfo.title = ''
      this.modalInfo.content = ''
    },
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    }
  }
}
</script>
