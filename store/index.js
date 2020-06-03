import {createClient} from '~/plugins/contentful.js';
// contentful will get all your CMS content
// but you could also grab other pre render data via axios and other sources
// import axios from 'axios';

const client = createClient();

export const state = (store) => ({
  pageMeta: { 
      description: 'We\'re developing faster!',
      title: 'OutCast Starter Kit',
      shareImage: 'absolute path please'
  },
  headerNav: null,
  footerNav: null,
  pages: null,
  page: null,
})

export const getters = {
  
}

export const mutations = {
  set_headerNav (store, data) {
    store.headerNav = data;
  },
  set_footerNav (store, data) {
    store.footerNav = data;
  },
  set_pages (store, data) {
    store.pages = data;
  },
  set_page (store, data) {
    store.page = data;
  },
  set_aois (store, data) {
    store.aois = data;
  }
}

export const actions = {
  //grab the main nav from a custom api endpoint
  //this returns a 2 object array with header nav and footer nav as the default menus
  //there of course can me more menus if needed
  
  async nuxtServerInit ({ commit }, { store }) {
    let [navigation, posts, aois] = await Promise.all([
      client.getEntries({'content_type': 'navigation', 'include' : '5'}),
      client.getEntries({'content_type': 'page', 'include' : '5', 'limit' : 100})
    ]);
    
    navigation.items.filter(function(navSet) {
      //set the navs
      if (navSet.fields.label === 'header') commit('set_headerNav', navSet.fields.pages);
      if (navSet.fields.label === 'footer') commit('set_footerNav', navSet.fields.pages);
    });

    //set the pages of the site
    commit('set_pages', posts.items);
  }
}