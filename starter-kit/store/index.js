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
  /* this is for detail pages */
  set_page (store, data) {
    store.page = data;
  }
}

export const actions = {
  //grab the navigation type from Contentful
  //this is a simple array of objects for now
  //there is a field label for footer and header in this simple example
  //there is freedom to structure the nav how you need
  
  async nuxtServerInit ({ commit }, { store }) {
    let [navigation, pages] = await Promise.all([
      client.getEntries({'content_type': 'navigation'}),
      client.getEntries({'content_type': 'pages', 'include' : '5', 'limit' : 100}),
      /* you can also have axios here, to grab other important things
      axios.get("your url",
      }).catch(function (error) {
        //error
      })
      */
    ]);
    
    navigation.items.filter(function(navSet) {
      //set the navs based off labels
      if (navSet.fields.label === 'header') commit('set_headerNav', navSet);
      if (navSet.fields.label === 'footer') commit('set_footerNav', navSet);
    });

    //set the pages of the site
    commit('set_pages', pages.items);
  }
}