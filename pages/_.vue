<template>
  <main :class="pageData.fields.classes">
    <BaseHeader v-if="pageData.fields.header" :fields="pageData.fields.header.fields" v-bind:key="pageData.fields.header.sys.id" />

    <template v-if="pageData.fields.sections">
    <BaseSection v-for="section in pageData.fields.sections" v-bind:key="section.sys.id" :fields="section.fields" :typename="section.sys.contentType.sys.id" />
    </template>

  </main>
</template>

<script>
import { mapState } from 'vuex';

export default {
  layout (context) {
    //you have to call the context here directly
    //access to mapState is not set yet, could do something like below
    //return context.store.state.page.template;
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
  computed: {
    ...mapState({
      pageData: state => state.page,
      pageMeta: state => state.pageMeta,
    })
  }
}
</script>
