<template>
  <main class="blog">
    <article>
        <BaseRichText v-if="pageData.fields.body" classes="richtext" :content="pageData.fields.body"></BaseRichText>
    </article>
   
  </main>
</template>

<script>
import { mapState } from 'vuex';
import {createClient} from '~/plugins/contentful.js';

const client = createClient();

export default {
  layout (context) {
    //you have to call the context here directly
    //access to mapState is not set yet
    //return context.store.state.page.acf.template;
    return 'default';
  },
  head () {
    return {
        title: this.pageData.metaTitle || this.pageMeta.title,
			meta: [
				{ hid: 'description', name: 'description', content: this.pageData.metaDescription || this.pageMeta.description },
				{ property: 'og:title', content: this.pageData.metaTitle || this.pageMeta.title },
				{ property: 'og:description', content: this.pageData.metaDescription || this.pageMeta.description },
				{ property: 'og:image', content: this.pageData.hasOwnProperty('metaSocialShareImage') ? this.pageData.metaSocialShareImage.fields.file.url :  this.pageMeta.shareImage },
				{ name: 'twiter:description', content: this.pageData.metaDescription || this.pageMeta.description },
                { name: 'twitter:image', content: this.pageData.hasOwnProperty('metaSocialShareImage') ? this.pageData.metaSocialShareImage.fields.file.url :  this.pageMeta.shareImage }
            ]
        }
    },
  asyncData ({ params, error }) {
    return client.getEntries({'content_type': 'blog', 'include' : '5', 'fields.slug' : params.slug, 'limit' : '1'})
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
      pageMeta: state => state.pageMeta,
    })
  }
}
</script>
