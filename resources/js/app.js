require('./bootstrap');

window.Vue = require('vue'); //import vue to th ewindow

import moment from 'moment'
import VueRouter from 'vue-router'  //import vue-router
import VueProgressBar from 'vue-progressbar'//import progress bar

import swal from 'sweetalert2'//import swee Alert
window.swal = swal  //register sweet alert on the window
const toast = swal.mixin({ //brings in toaster
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  })
//Add toaster to the windoe
window.toast = toast

import { Form, HasError, AlertError } from 'vform' //import vform

window.form = Form; //egister form as a global component
Vue.use(VueRouter) //tell vue we are goin to use vue-router
Vue.component(HasError.name, HasError) //register v-form as a global component
Vue.component(AlertError.name, AlertError)


//define routes including components to load
let routes = [
    { path: '/dashboard', component:  require('./components/Dashboard.vue').default, name:'Dashboard'},
    { path: '/developer', component:  require('./components/Developer.vue').default, name:'Developer'},
    { path: '/profile', component:  require('./components/Profile.vue').default, name:'Profile' },
    { path: '/users', component: require('./components/Users.vue').default, name:'Users' },

  ]

  //Creating Global Event Listeening object by creating new vue instance and assigning to fire
  //every where in my application I have access to fire
  window.Fire = new Vue()

 //register our routes 
const router = new VueRouter({
    mode:'history',
    routes 
  })

  //setting global filter to set Title case
  Vue.filter('uptext', function(text){
     return text.charAt(0).toUpperCase() + text.slice(1)
  })

  //global filter to format date using momentjs
  Vue.filter('myDate', function(created){
    return moment(created).format('MMMM Do YYYY, h:mm:ss a');
  })

  //use progress bar 
  Vue.use(VueProgressBar, {
    color: 'rgb(143, 255, 199)',
    failedColor: 'red',
    height: '5px'
  })



  Vue.component(
    'passport-clients',
    require('./components/passport/Clients.vue').default
);

Vue.component(
    'passport-authorized-clients',
    require('./components/passport/AuthorizedClients.vue').default
);

Vue.component(
    'passport-personal-access-tokens',
    require('./components/passport/PersonalAccessTokens.vue').default
);



//View Instance that hokup to our app via the div with the id of app
const app = new Vue({
    el: '#app',
    router
});




