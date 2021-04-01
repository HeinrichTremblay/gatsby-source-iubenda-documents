const fetch = require("node-fetch");

const PRIVACY_URL = "https://www.iubenda.com/api/privacy-policy/";
const TERMS_URL = "https://www.iubenda.com/api/terms-and-conditions/";

exports.onPreInit = () =>
  console.log("✨ Loaded gatsby-source-iubenda-documents");

exports.sourceNodes = async (
  { actions, createContentDigest, createNodeId, getNodesByType },
  pluginOptions
) => {
  const { createNode } = actions;
  const { documentIds } = pluginOptions;

  const formatResult = (content) =>
    content.replace(/"/g, "").replace(/\\/g, "");

  const fetchDocument = async (url) => {
    const response = await fetch(`${url}/no-markup`);

    if (!response.ok) {
      const error = new Error();
      error.code = response.status;
      throw error;
    }

    const json = await response.json();
    return formatResult(json.content);
  };

  const handleError = (error, name, documentId) => {
    // Error codes from https://www.iubenda.com/en/help/78-privacy-policy-direct-text-embedding-api#api

    switch (error.code) {
      case 404:
        console.log(`👀 ${name} for ${documentId} not found.`);
        break;
      case 403:
        console.log(
          `🛑 To access the ${name} for ${documentId} via API, convert it to Pro.`
        );
        break;
      case 500:
        console.log(
          "❌ Application Error. Please contact info@iubenda.com for support."
        );
        break;
      default:
        console.log("❌ An unexpected error happened!");
        break;
    }
  };

  const logFetchSuccess = (name, documentId) => {
    console.log(`🚛 ${name} for ${documentId} fetched.`);
  };

  return await Promise.all(
    documentIds.map(async (documentId) => {
      const data = {
        privacyPolicy: null,
        termsAndConditions: null,
      };

      try {
        const document = await fetchDocument(PRIVACY_URL + documentId);
        data.privacyPolicy = document;
        logFetchSuccess("Privacy Policy", documentId);
      } catch (error) {
        handleError(error, "Privacy Policy", documentId);
      }

      try {
        const document = await fetchDocument(TERMS_URL + documentId);
        data.termsAndConditions = document;
        logFetchSuccess("Terms and Conditions", documentId);
      } catch (error) {
        handleError(error, "Terms and Conditions", documentId);
      }

      createNode({
        ...data,
        id: createNodeId(documentId),
        documentId: documentId,
        parent: null,
        children: [],
        internal: {
          type: "IubendaDocument",
          contentDigest: createContentDigest(data),
        },
      });
    })
  );
};
