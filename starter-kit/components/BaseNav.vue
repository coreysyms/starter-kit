<template>
    <nav>
        <div id="menu" @click='toggleMobileMenu()' :class="{ 'open' : showMenu }">&#9776;</div>
        <ul>
            <li class="logo"><nuxt-link to="/"><img src="http://placehold.it/200x100" /></nuxt-link></li>
            <li v-for="navitem in nav.fields.pages" v-bind:key="navitem.sys.id" @click='toggleMobileMenu()'><nuxt-link :to="'/'+navitem.fields.slug">{{ navitem.fields.title }}</nuxt-link></li>
        </ul>
    </nav>
</template>

<script>
//single level nav, with slugs that make depth
//home is a give me

import { mapState } from 'vuex';

export default {
    name:'navbar',
    data () {
        return {
            parentMenuId: 0,
            showNavbar: true,
            showMenu: false
        }
    },
    methods: {
        childNavItems: function(id) {
            return this.nav[id];
        },
        removeHost: function(url) {
            return '/' + url.match(/\/\/[^\/]+\/([^\.]+)/)[1];
        },
        toggleMobileMenu () {
            this.showMenu = !this.showMenu
        }
    },
    computed: {
    ...mapState({
      nav: state => state.headerNav
    })
  }
}
</script>