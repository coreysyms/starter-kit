# starter-kit

> Boilerplate for Nuxt + Contentful

## Build Setup

``` bash
# install dependencies
$ git clone
$ cd <folder>
$ npm install
```

> This starterkit comes with the following

##### Contentful
> JavaScript SDK for the Contentful Content Delivery API and Content Preview API. It helps you to easily access your > Content stored in Contentful with your JavaScript applications.
$ https://www.npmjs.com/package/contentful

##### configure Contentful
> In nuxt.config set the enviros for your contentful space
> You could also go the .env way, or key vaults, depends on clients security needs
$ CTF_SPACE_ID, CTF_CDA_ACCESS_TOKEN, CTF_CDA_ACCESS_TOKEN_PREVIEW_API

##### Contentful Richtext Render
> HTML renderer for the Contentful rich text field type.
$ https://www.npmjs.com/package/@contentful/rich-text-html-renderer

##### Contentful Richtext Types
Type definitions and constants for the Contentful rich text field type.
$ https://www.npmjs.com/package/@contentful/rich-text-types

##### Google Tag Manager
> Google Tag Manager Module for Nuxt.js
$ https://github.com/nuxt-community/gtm-module

##### Nuxt Helmet
> Helmet helps you secure your Nuxt apps by setting various HTTP headers. By default Helmet will set the X-DNS-Prefetch-Control, X-Frame-Options, Strict-Transport-Security, X-Download-Options, X-Content-Type-Options and X-XSS-Protection headers. Beside that this module will also set by default the X-Permitted-Cross-Domain-Policies header.
$ https://www.npmjs.com/package/nuxt-helmet

# possible extra dependencies packages (not installed)
##### Axios
> Http lib for all things apis end pointed etc.
$ https://axios.nuxtjs.org/

##### Basic Auth
> Provide basic authentication to your Nuxt.js application
$ https://www.npmjs.com/package/nuxt-basic-auth-module

# Additionally
> This package is set with robots.txt to ingore all

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
