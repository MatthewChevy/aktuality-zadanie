module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `
              @import "./src/assets/sass/_global.scss";
              @import "./src/assets/sass/_reset.scss";
            `,
      },
    },
  },
}
