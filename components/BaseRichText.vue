<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <div :class="classes" v-html="renderHTML(content)" />

</template>

<script>
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { INLINES, BLOCKS } from '@contentful/rich-text-types';

const options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ENTRY]: (node) => { 
      //todo: this is not elegant, or really managable, but it works
      // everyting is a straight string build
      
      var itemFields = node.data.target.fields;
      var contentType = node.data.target.sys.contentType.sys.id;
     
      var returnItem;

        
      function formatTimeDate(date) {
          var fd = new Date(date);
          var monthArray = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"];
          return fd.getDate() + ' ' + monthArray[fd.getMonth()] + ' ' + fd.getFullYear();
      }

      returnItem = '<div class="teaser">';
      returnItem += '<a href="'+ itemFields.slug +'">';
      
      returnItem += '<div class="text">'
      returnItem += '<h6>' + formatTimeDate(itemFields.publishDate) + '</h6>'
      returnItem += '<h6>' +  itemFields.title + '</h6>'
      
      returnItem += '</div></a>';
      returnItem += '</div>';
      
      return returnItem;

    },

    [INLINES.EMBEDDED_ENTRY]: (node) =>
      `<a href="/${(node.data.target.fields.slug)}" class="button">${(node.data.target.fields.title)}</a>`,

    [BLOCKS.EMBEDDED_ASSET]: (node, next) => { 
      if (node.data.target.fields.file.contentType.includes('image')) return `<div class="image"><img src="${( node.data.target.fields.file.url )}" alt="${( node.data.target.fields.title )}" /></div>`
      else return `<a href="/${(node.data.target.fields.file.url)}" class="button">${(node.data.target.fields.title)}</a>`
    },

    [INLINES.ASSET_HYPERLINK]: (node, next) =>
        `<a href="/${(node.data.target.fields.file.url)}">${(next(node.content))}</a>`,
    
    [INLINES.ENTRY_HYPERLINK]: (node, next) =>
        `<a href="/${(node.data.target.fields.slug)}">${(next(node.content))}</a>`,
    
    [INLINES.HYPERLINK]: (node, next) => 
      `<a href="${node.data.uri}" target="_blank" rel="noreferrer">${next(node.content)}</a>`
  }
};



export default {
  name: 'HtmlParser',
  props: {
    /**
     * HTML Content to parse
     */
    content: {
      type: Object,
      required: true,
      default: ''
    },
    classes: {
        type: String,
        required: false,
        default: ''
    }
  },
  watch: {
    content: 'contentUpdated'
  },
  mounted() {
    this.$nextTick(this.addListeners)
  },
  beforeDestroy() {
    this.removeListeners()
  },
  methods: {
    renderHTML: function(html) {
        return documentToHtmlString(html, options);
    },
    navigate(event) {
      let target = event.target
      let i = 0
      // Go throught 5 parents max to find a tag
      while (
        i < 5 &&
        !(target instanceof HTMLAnchorElement) &&
        target.parentNode
      ) {
        target = target.parentNode
        i++
      }
      // If target is still not a link, ignore
      if (!(target instanceof HTMLAnchorElement)) return
      return this.redirect(target)
    },
    redirect(target) {
      const href = target.getAttribute('href')
      // Get link target, if local link, navigate with router link
      if (href && href[0] === '/') {
        event.preventDefault()
        this.$router.push(href)
      }
    },
    contentUpdated() {
      this.removeListeners()
      this.$nextTick(() => {
        this.addListeners()
      })
    },
    addListeners() {
      this._links = this.$el.getElementsByTagName('a')
      for (let i = 0; i < this._links.length; i++) {
        this._links[i].addEventListener('click', this.navigate, false)
      }
    },
    removeListeners() {
      if (this._links) {
        for (let i = 0; i < this._links.length; i++) {
          this._links[i].removeEventListener('click', this.navigate, false)
        }
        this._links = []
      }
    }
  }
}
</script>