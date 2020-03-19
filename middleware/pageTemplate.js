
//this fires before every route
export default function ({ route, store, error }) {

      //lets see if we have a match to the store of pages
      //we most likely will since we are pulling and storing site pages
      var slug = (route.path === '/' ? 'home' : route.path);
      var isMatch = store.state.pages.filter(function(page) {
            //remove the first slash from the URL leave the others
            return page.fields.slug === slug.replace(/\//, '');
      });

      if (isMatch.length === 0) {
            //todo: match content type so I can query contentful
            //so at this point im going to let this gracefully fail
            //I can't blanket fail here, need to do it on the page level
            //so for now, i need to directory string match and allow the page level to 404
            if (/^.*(preview)/i.test(slug) === false) error({ statusCode: 404, message: 'Page Not Found' });

      } else {
            //return the store value to the page
            store.commit('set_page', isMatch[0]);
      }
}