import { boot } from "quasar/wrappers";
import { Vue3Lottie as lottie } from "vue3-lottie";

export default boot(({ app }) => {
  app.component("LottiePlayer", lottie);
});
