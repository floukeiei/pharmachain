<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
<h1>{{ info != null ? info.data:'' }}</h1>

 <!-- <b-button size="lg" variant="success" v-on:click="test()">
            Test
          </b-button>
          {{user.uid}} -->

  </div>
</template>

<script>
// import axios from 'axios'
import firebase from 'firebase'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {
      info: null,
      user: this.$store.getters['user/user'],
      contacts: null
    }
  },
  created () {
    var database = firebase.database()
    var contactRef = database.ref('/users/' + this.user.uid)
    contactRef.on('value', (snapshot) => {
      if (snapshot.numChildren() === 0) {
        let data = {
          role: 'doctor',
          address: '0xD34174b35F99f184b62e269be6a1a5d66f5bC279'
        }
        contactRef.push(data)
      } else {
        // console.log(this.$store.state.contacts)
        for (let key in snapshot.val()) {
          this.$store.state.contacts.address = snapshot.val()[key].address
          this.$store.state.contacts.role = snapshot.val()[key].role
          // console.log(this.$store.state.contacts.privateKey)
          console.log(this.$store.state.contacts.role)
        }
      }
    })
  },
  methods: {
    test () {
      var arry = []
      // var json = new Map([
      //   [ '0xD34174b35F99f184b62e269be6a1a5d66f5bC279',
      //     '0xE431389a93d48c53DF2354542c801e10d27c59E9',
      //     'โจ',
      //     'ฟลุ๊ค'],
      //   [ '0xD34174b35F99f184b62e269be6a1a5d66f5bC279',
      //     '0xE431389a93d48c53DF2354542c801e10d27c59E9',
      //     'โจ',
      //     'ฟลุ๊ค' ]
      // ])
      arry.push([
        [ '0xD34174b35F99f184b62e269be6a1a5d66f5bC279',
          '0xE431389a93d48c53DF2354542c801e10d27c59E9',
          'โจ',
          'ฟลุ๊ค'],
        [ '0xD34174b35F99f184b62e269be6a1a5d66f5bC279',
          '0xE431389a93d48c53DF2354542c801e10d27c59E9',
          'โจ',
          'ฟลุ๊ค']
      ])
      console.log(arry)
      // console.log(this.$store.state.contacts.key)
      // console.log(this.$store.state.contacts.get(0).privateKey)
      // $.each(this.$store.state.contacts, function (key, value) {
      //   console.log(value.privateKey)
      // })

      // this.$store.state.contacts.fs
      // axios
      //   .get(process.env.VUE_APP_AWS)
      //   .then(response => { console.log(response.data) })

      // console.log(contactRef.child)
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
