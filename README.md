# Gatsby Source Iubenda Documents

Source plugin for pulling in Iubenda documents for Gatsby. (Privacy policy, terms and conditions)

## 🚀 Install

With npm:

```
npm install --save gatsby-source-iubenda-documents
```

Or with Yarn:

```
yarn add gatsby-source-iubenda-documents
```

## 🎮 How to use

First, visit your Iubenda dashboard and select your project. You'll find your document id from the embeded section. Copy-paste your document id:

```
https://www.iubenda.com/privacy-policy/<your-document-id>
```

And use it to setup the plugin in Gatsby:

```
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-source-iubenda-documents`,
    options: {
     documentId: `<your-document-id>`
    },
  },
];
```

Your privacy policy and terms will be available in graphql:

```
query MyQuery {
  iubendaDocument {
    termsAndConditions
    privacyPolicy
  }
}
```

Use your privacy policy in your page:

```
<div dangerouslySetInnerHTML={{ __html: data.iubendaDocument.privacyPolicy }} />
```
