module.exports = {
  siteMetadata: {
    siteUrl: "https://pimentel.page",
    title: "pimentel.page",
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `blog`,
        path: `${__dirname}/blog`,
      }
    },
  ],
};
