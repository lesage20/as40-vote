import { boot } from "quasar/wrappers";
import VueGtag from "vue-gtag";
import router from "src/router";

// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(({ app }) => {
  app.use(
    VueGtag,
    {
      config: { id: "G-LF01RF6LWJ" },
    },
    router()
  );
});
