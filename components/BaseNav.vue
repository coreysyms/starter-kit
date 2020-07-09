<template>
    <nav role="navigation">
        <div id="menu" @click='toggleMobileMenu()' :class="{ 'open' : showMenu }">&#9776;</div>
        <ul>
            <div class="logo"><nuxt-link to="/">LOGO</nuxt-link></div>
            <li v-for="navitem in nav" v-bind:key="navitem.sys.id" @click='toggleMobileMenu()'>
                <nuxt-link v-if="navitem.fields.pages && navitem.fields.menuLabelLink" :to="'/' +navitem.fields.menuLabelLink.fields.slug" aria-haspopup="true" tabindex="0" class="dropdown">{{ navitem.fields.menuLabel }}</nuxt-link>
                <div v-else-if="navitem.fields.pages" aria-haspopup="true" tabindex="0" class="dropdown">{{ navitem.fields.menuLabel }}</div>
                <nuxt-link v-else :to="'/' +navitem.fields.slug">{{ navitem.fields.title }}</nuxt-link>

                <!-- child menu -->
                <ul v-if="navitem.fields.pages" aria-label="submenu">
                    <li v-for="childnavitem in navitem.fields.pages" v-bind:key="childnavitem.sys.id">
                        <nuxt-link :to="'/' +childnavitem.fields.slug">{{ childnavitem.fields.title }}</nuxt-link>
                    </li>
                </ul>
            </li>
        </ul>
    </nav>
</template>

<script>
//home is a give me

import { mapState } from 'vuex';

export default {
    name:'navbar',
    data () {
        return {
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