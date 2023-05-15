# 2. Google Merchant Meta Tag Pasting

Date: 2023-04-24

## Status


## Context
"Howdy
Trying to set this up. Hoe do I upload the HTML into the website to complete verification? Please advise."


"Is this something I need to know i.e. if I need to log in as a merchant?

Thanks"


## Decision

I reckon we can place the <meta> tag via Nuxt config. Leave it to us on our end.

Yes, you can add a <meta> tag to your Nuxt application by updating the head object in the nuxt.config.js file. Here's an example of how to add a description meta tag:

```
export default {
  head: {
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'My website description'
      }
    ]
  }
}
```

In this example, we're setting the description meta tag with the content "My website description". You can also add other meta tags, such as the title tag, by including them in the meta array. The hid property is used to ensure that each tag has a unique identifier.

## Consequences