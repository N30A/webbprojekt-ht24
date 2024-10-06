const fetchData = async (url) => {
  let resp = await fetch(url);
  return await resp.json();
}

Vue.createApp({
  data() {
    return {
      skills: null,
      roadmap: null,
      projects: [],
      projectInputVal: "",
      images: null,
      imageIndex: 0,
      showMenu: false,
      selectedOption: "standard",
    }
  },
  methods: {
    getPublicImage(img) {
      return `/assets/images/filip/${img}`;
    },
    getIconImage(img) {
      return `/assets/icons/${img}.png`;
    },
    animateSkills() {
      this.skills.forEach(skill => {
        let skillFill = document.querySelector(`.skills-fill[data-id="${skill.id}"`);
        skillFill.style.width = skill.percentage + '%';
      });
    },
    prevImage() {
      if (this.imageIndex > 0) {
        this.imageIndex--;
      } else {
        this.imageIndex = this.images.length - 1;
      }
    },
    nextImage() {
      if (this.imageIndex < this.images.length - 1) {
        this.imageIndex++
      } else {
        this.imageIndex = 0;
      }
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    handleScroll() {
      const element = document.querySelector(".hero-background");

      let scrollPercentageOfPage = window.scrollY / (document.documentElement.scrollHeight - document.documentElement.clientHeight) * 100;
      let newObjectPosition = 50 + scrollPercentageOfPage / 2;

      element.style.objectPosition = `center ${Math.floor(newObjectPosition)}%`;
    }
  },
  computed: {
    filteredProjects() {
      let filtered = [];
  
      if (this.projectInputVal) {
        filtered = this.projects.filter((project) => {
          let title = project.title.toLowerCase();
          let input = this.projectInputVal.toLowerCase();

          return title.includes(input);
        });
      } else {
        filtered = [...this.projects];
      }
  
      if (this.selectedOption === "alphabetical") {
        filtered.sort((a, b) => (
          a.title.toLowerCase().localeCompare(b.title.toLowerCase())
        ));
      }
  
      return filtered;
    }
  },
  async mounted() {
    this.skills = await fetchData("/data/filip/skills.json");
    this.roadmap = await fetchData("/data/filip/roadmap.json");
    this.images = await fetchData("/data/filip/images.json");

    const projects = await fetchData("/data/projects/projects.json");
    this.projects = projects.filter((project) => project.manager === "filip");

    this.animateSkills();

    window.addEventListener("scroll", this.handleScroll);
  },
  unMounted() {
    window.removeEventListener('scroll', this.handleScroll)
  }
}).mount("#main-container");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("shown");  
    } else {
      entry.target.classList.remove("shown");
    }
  })
});

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((element) => observer.observe(element));