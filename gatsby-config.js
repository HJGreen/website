module.exports = {
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-netlify',
    `gatsby-plugin-postcss`,
    `gatsby-plugin-manifest`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Harry Green - Freelance Developer`,
        short_name: `Harry Green`,
        start_url: `/`,
        background_color: `#1a202c`,
        theme_color: `#1a202c`,
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: `standalone`,
        icon: `src/images/icon.svg`, // This path is relative to the root of the site.
        include_favicon: true, // Include favicon
      },
    },
    `gatsby-plugin-offline`,
  ],
};
