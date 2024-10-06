const patterns = {
  letters: "abcdefghijklmnopqrstuvwxyzåäöABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ",
  phone: "0123456789+-",
  emailMusts: ["@", "."],
}

Vue.createApp({
  data() {
    return {
      showMenu: false,
      contact: {
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        message: "",
      },
    }
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    handleInput(contactKey, patternKey) {
      const userInput = this.contact[contactKey];
      const validatePattern = patterns[patternKey];

      if (userInput.length > 0 && userInput.length < 2) {
        return "invalid";
      }

      if (patternKey === "emailMusts" && userInput.length > 0) {
        return this.validateEmail(userInput) ? "invalid" : "";
      }

      return !this.validate(userInput, validatePattern) ? "invalid" : "";
    },
    validate(text, pattern) {
      for (const character of text) {
        if (!pattern.includes(character)) {
          return false;
        }
      }
      return true;
    },
    validateEmail(text) {
      let missing = false;

      patterns.emailMusts.forEach((char) => {
        if (!text.includes(char)) {
          missing = true;
        }
      });

      return missing;
    },
  }
}).mount("#app")