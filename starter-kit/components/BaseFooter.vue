<template>
    <footer>
        <nav>
            <div class="logo"><nuxt-link to="/"><img src="https://placehold.it/200x100" /></nuxt-link></div>
            <ul>
                <li v-for="navitem in nav.fields.pages" v-bind:key="navitem.sys.id"><nuxt-link :to="'/'+navitem.fields.slug">{{ navitem.fields.title }}</nuxt-link></li>
            </ul>
        </nav>

        <div id="cookies-banner" style="display:none;">
            <button id="agree" class="button" onclick="document.getElementById('cookies-banner').remove();" style="float:right;">OK</button>
            <div class="text">
                <h6>We Use Cookies</h6>
                <p>We use cookies for analytics, to see our policy, please read <small><NuxtLink to="/privacy-policy">Privacy Policy</NuxtLink></small></p>
            </div>
        </div>
    </footer>
</template>

<script>
//single level nav, with slugs that make depth
//home is a give me

import { mapState } from 'vuex';

export default {
    name:'footernavbar',
    data () {
        return {
            parentMenuId: 0
       }
    },
    mounted () {
        //set "we use cookies" cookie
        function getCookie(name) {
            var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
            return v ? v[2] : null;
        }

        function setCookie(name, value, days) {
            var d = new Date;
            d.setTime(d.getTime() + 24*60*60*1000*days);
            document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
        }

        if (!getCookie("diu-cookies-policy")) {
            setCookie("diu-cookies-policy", "true", 60);
            document.getElementById('cookies-banner').style.display = "block";
        }
    },
    methods: {
        childNavItems: function(id) {
            return this.nav[id];
        },
        removeHost: function(url) {
            return '/' + url.match(/\/\/[^\/]+\/([^\.]+)/)[1];
        }
    },
    computed: {
    ...mapState({
      nav: state => state.footerNav
    })
  }
}
</script>