# Gatsby Source Iubenda Documents

![npm](https://img.shields.io/npm/v/gatsby-source-iubenda-documents)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

Source plugin for pulling in Iubenda documents for Gatsby. (Privacy Policy, Terms and Conditions)

## 🚀 Install

With npm:

```
npm install --save gatsby-source-iubenda-documents
```

Or with Yarn:

```
yarn add gatsby-source-iubenda-documents
```

## 🎮 Usage

First, visit your Iubenda dashboard and select your project. You'll find your document id from the [embeded section](https://www.iubenda.com/en/help/78-privacy-policy-direct-text-embedding-api). You can use multiple ids (ex: multiple languages).

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
     documentIds: [
       `<your-document-id>`,
       `<your-document-id-2>`
     ]
    },
  },
];
```

Your privacy policy and terms will be available in graphql:

```
// With one document
query MyQuery {
  iubendaDocument {
    termsAndConditions
    privacyPolicy
  }
}

// Get a specific document
query MyQuery {
  iubendaDocument(documentId: {eq: "<your-document-id>"}) {
    documentId
    privacyPolicy
    termsAndConditions
  }
}


// get all documents
query MyQuery {
  allIubendaDocument {
    nodes {
      documentId
      privacyPolicy
      termsAndConditions
    }
  }
}
```

Use your privacy policy in your page:

```
<div dangerouslySetInnerHTML={{ __html: data.iubendaDocument.privacyPolicy }} />
```
