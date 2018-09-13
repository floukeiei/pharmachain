<template>
  <b-container style="width: 43%;margin-top: 10px;" fluid>
    <!-- User Interface controls -->
    <b-row>
      <b-col>
            <b-form-group id="exampleInputGroup2" label="ID:" label-for="exampleInput1" horizontal>
              <b-form-input id="exampleInput2" type="number" v-model="rescriptionId" required placeholder="Enter ID" >
              </b-form-input>
            </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
          <b-button size="lg" variant="success" @click="search()">
            Search
          </b-button>
      </b-col>
    </b-row>
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
      <template slot="medicine" slot-scope="row">{{row.value}}</template>
      <template slot="amount" slot-scope="row" >
         <b-form-input v-model="row.item.amount" type="number" :formatter="format"  ></b-form-input>
      </template>
      <template slot="isActive" slot-scope="row">{{row.value?'Yes :)':'No :('}}</template>
      <template slot="actions" slot-scope="row">
        <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
        <b-button size="sm" @click.stop="info(row.item, row.index, $event.target)" class="mr-1">
          Info modal
        </b-button>
        <b-button size="sm" @click.stop="row.toggleDetails">
          {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
        </b-button>
      </template>
      <template slot="row-details" slot-scope="row">
        <b-card>
          <ul>
            <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value}}</li>
          </ul>
        </b-card>
      </template>
    </b-table>

    <b-row>
      <b-col md="6" class="my-1">
        <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-button size="lg" variant="danger" >
            Save
          </b-button>
      </b-col>
    </b-row>

    <!-- Info modal -->
    <b-modal id="modalInfo" @hide="resetModal" :title="modalInfo.title" ok-only>
      <pre>{{ modalInfo.content }}</pre>
    </b-modal>

  </b-container>
</template>

<script>
import axios from 'axios'
const items = []
export default {

  data () {
    return {
      items: items,
      fields: [
        { key: 'medicine', label: 'Medicine', sortable: true, sortDirection: 'desc' },
        { key: 'amount', label: 'Amount', sortable: true, 'class': 'text-center' }
      ],
      currentPage: 1,
      perPage: 5,
      totalRows: items.length,
      pageOptions: [ 5, 10, 15 ],
      sortBy: null,
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      rescriptionId: null,
      modalInfo: { title: '', content: '' }
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
      this.modalInfo.title = `Row index: ${index}`
      this.modalInfo.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', 'modalInfo', button)
    },
    resetModal () {
      this.modalInfo.title = ''
      this.modalInfo.content = ''
    },
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    clear () {
      this.items = []
    },
    format (value, event) {
      if (value < 0) { value = 0 }
      return value
    },
    search () {
      axios
        .get(process.env.VUE_APP_AWSALL + 'getDrug/' + this.rescriptionId)
        .then(response => {
          console.log(response.data.data)
          this.items = []
          // this.items = response.data.data
          for (let item in response.data.data) {
            let data = {
              medicine: null,
              amount: null
            }
            // this.$store.state.contacts.address = snapshot.val()[key].address
            // this.$store.state.contacts.role = snapshot.val()[key].role
            // console.log(this.$store.state.contacts.privateKey)
            // console.log(this.$store.state.contacts.role)
            // console.log(item)

            data.medicine = response.data.data[item][2]
            data.amount = response.data.data[item][3]

            this.items.push(data)
          // console.log(json.data[item][2])
          }
          // this.modalInfo.title = `Drug`
          // this.modalInfo.content = JSON.stringify(item, null, 2)
          // this.modalInfo.content = response.data.data
          // this.$root.$emit('bv::show::modal', 'modalInfo', button)
        })
      // console.log(this.rescriptionId)
    }
  }
}
</script>
