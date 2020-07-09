<template>
  <main class="blogs">
    <template v-if="pageData.fields.header">
    <BaseHeader :fields="pageData.fields.header.fields" v-bind:key="pageData.fields.header.sys.id" />
    </template>

    <section>
        <div class="row">
            <p v-if="latestItems.length === 0" style="text-align:center; width:100%;">Sorry, there are 0 items</p>
            <p v-for="item in latestItems" v-bind:key="item.sys.id" class="teaser latest">
                <nuxt-link :to="'/blog/' + item.fields.slug">{{ item.fields.title }}</nuxt-link>
            </p>
        </div>
    </section>

    <section>
        <div v-if="totalPages >= 2" class="pagination row">
            <nuxt-link v-for="pageNum in totalPages" v-bind:key="pageNum" :to="{ path: '/blog', query: { page: pageNum } }" class="button">{{ pageNum }}</nuxt-link>
        </div>

        <div v-if="totalPages >= 2" class="pagination mobile row">
            page 
            <select v-model="currentPage" onchange="javascript:document.location.href = '/blog?page=' + this.options[this.selectedIndex].value;">
                <option v-for="pageNum in totalPages" v-bind:key="pageNum" :value="pageNum">{{ pageNum }}</option>
            </select>
            <em>of </em> {{ totalPages }}
        </div>
    </section>

  </main>
</template>

<script>
import { mapState } from 'vuex';
import {createClient} from '~/plugins/contentful.js';
const client = createClient()

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
    watchQuery:true,
    async asyncData({ params, query, error }) {
        const page = (query.page - 1) * 48 || 0;
        const currentPage = query.page || 1;

        return client.getEntries({'content_type': 'blog', 'include' : '3', 'order' : '-fields.publishDate', 'limit' : '48', 'skip': page })
        .then(res => {
            return {
                totalPages : Math.ceil(res.total / 48),
                latestItems : res.items,
                currentPage : currentPage
            }
        });
    },
    methods: {
        formatTimeDate(date) {
            var fd = new Date(date);
            var monthArray = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"];
            return fd.getDate() + ' ' + monthArray[fd.getMonth()] + ' ' + fd.getFullYear();
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
