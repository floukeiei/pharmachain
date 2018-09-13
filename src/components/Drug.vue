<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-container class="bv-example-row">
        <b-row>
          <b-col>
            <b-form-group id="exampleInputGroup3" label="medicine:" label-for="exampleInput3" horizontal>
              <b-form-select id="exampleInput3" :options="medicines" required v-model="drug.drugName" >
              </b-form-select>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group id="exampleInputGroup1" label="Amount:" label-for="exampleInput1"  horizontal>
              <b-form-input id="exampleInput1" type="number" v-model="drug.drugCount" required placeholder="Enter Amount" :formatter="format"  >
              </b-form-input>
            </b-form-group>
          </b-col>
          <b-col style="text-align: left">
             <b-button size="md" variant="danger"  @click="sendDelete" >
              -
            </b-button>
          </b-col>
        </b-row>
      </b-container>

      <!-- <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button> -->
    </b-form>

  </div>
</template>

<script>
export default {
  name: 'Drug',
  props: {
    drug: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      form: {
        email: '',
        name: '',
        food: null,
        checked: []
      },
      medicines: [{
        text: 'Select One',
        value: null
      },

      'Acetazolamide',
      'Benzodiazepines',
      'Baclofen',
      'Bisoprolol',
      'Trihexyphenidyl',
      'Paromomycin',
      'Trazodone',
      'Verapamil',
      'Warfarin'
      ],
      show: true
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      alert(JSON.stringify(this.form))
    },
    onReset (evt) {
      evt.preventDefault()
      /* Reset our form values */
      this.form.email = ''
      this.form.name = ''
      this.form.food = null
      this.form.checked = []
      /* Trick to reset/clear native browser form validation state */
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
    sendDelete () {
      this.$emit('drugDelete', this.drug.id)
    },
    format (value, event) {
      if (value < 0) { value = 0 }
      return value
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h3 {
    margin: 40px 0 0;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
