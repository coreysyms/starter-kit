<template>
  <main :class="pageData.fields.classes">
    <div class="previewMode"><span>PREVIEW</span></div>
  
    <template v-if="pageData.fields.sections">
    <BaseSection v-for="section in pageData.fields.sections" v-bind:key="section.sys.id" :fields="section.fields" :typename="section.sys.contentType.sys.id" />
    </template>

  </main>
</template>

<script>
import { mapState } from 'vuex';
import { createClient } from '~/plugins/contentful_preview_api.js';

const client = createClient();

export default {
  layout (context) {
    //you have to call the context here directly
    //access to mapState is not set yet, could do somethng like the below
    //return context.store.state.page.template;
    return 'default';
  },
  head () {
		return {
			title: "PREVIEW",
			meta: [
				{ hid: 'description', name: 'description', content: "PREVIEW" },
				{ property: 'og:title', content: "PREVIEW" },
				{ property: 'og:description', content: "PREVIEW" },
				{ property: 'og:image', content: "PREVIEW" },
				{ name: 'twiter:description', content: "PREVIEW" },
        { name: 'twitter:image', content: "PREVIEW" }
      ]
		}
	},
  asyncData ({ route, params, error }) {
        return client.getEntries({'content_type': 'pages', 'include' : '5', 'fields.slug' : route.path.replace(/\/preview\//, ''), 'limit' : '1'})
         .then((res) => {
             if (res.items.length === 1) {
                return { pageData: res.items[0] }  
             } else {
                 error({ statusCode: 404, message: 'Connection OK: But Page Not Found'})
             } 
        })
	},
  methods: {
    formatTimeDate(date) {
      var fd = new Date(date);
      var monthArray = ["January","February","March","April","May","June","July","August","September","October","November","December"];
      return fd.getDate() + ' ' + monthArray[fd.getMonth()] + ' ' + fd.getFullYear();
    }
  },
  computed: {
    ...mapState({
    })
  }
}
</script>

