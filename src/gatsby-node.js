const fetch = require("node-fetch");

exports.onPreInit = () =>
  console.log("✨ Loaded gatsby-source-iubenda-documents");

const PRIVACY_URL = "https://www.iubenda.com/api/privacy-policy/";
const TERMS_URL = "https://www.iubenda.com/api/terms-and-conditions/";

exports.sourceNodes = async (
  { actions, createContentDigest, createNodeId },
  pluginOptions
) => {
  const { createNode } = actions;
  const { documentId } = pluginOptions;

  const fetchDocument = async (url) => {
    const res = await fetch(`${url}/no-markup`);
    const json = await res.json();
    return json.content.replace(/"/g, "").replace(/\\/g, "");
  };

  const data = {};

  try {
    const document = await fetchDocument(PRIVACY_URL + documentId);
    data["privacyPolicy"] = document;
    console.log("🚛  Fetched privacy policy.");
  } catch (error) {
    console.log("⚠️  No privacy policy");
  }

  try {
    const document = await fetchDocument(TERMS_URL + documentId);
    data["termsAndConditions"] = document;
    console.log("🚛  Fetched terms and conditions.");
  } catch (error) {
    console.log("⚠️  No terms and conditions");
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

  return;
};
