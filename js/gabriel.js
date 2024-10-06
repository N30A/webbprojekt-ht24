async function fetchData(url) {
  const response = await fetch(url)
  return await response.json()
}

const app = Vue.createApp({
    data() {
      const slides = [
        "slideshow1.jpg",
        "slideshow2.jpg",
        "slideshow3.jpg",
        "slideshow4.jpg",
        "slideshow5.jpg"
      ]
      return {
        showMenu: false,
        projects: null,
        slides: slides,
        index: 0
      }
    },
    methods: {
      toggleMenu() {
        this.showMenu = !this.showMenu;
      },
      getImagePath(slide) {
        return "/assets/images/Gabriel/" + slide
      },
      prevImage() {
        if (this.index <= 0) {
          this.index = this.slides.length - 1
        } else {
          this.index--
        }
      },
      nextImage() {
        if (this.index >= this.slides.length - 1) {
          this.index = 0
        } else {
          this.index++
        }
      },
    },
    async mounted() {
      const projects = await fetchData("/data/projects/projects.json")
      this.projects = projects.filter((project) => project.manager === "Gabriel")
    }
})

app.mount("#app")