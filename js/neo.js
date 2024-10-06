const fetchData = async (url) => {
  const response = await fetch(url)
  return await response.json()
}

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

Vue.createApp({
  data() {
    const images = [
      "kola1.jpg",
      "kola2.jpg",
      "kola3.jpg",
      "lexie1.jpg",
      "lexie2.jpg",
      "lexie3.jpg",
      "lexie4.jpg",
      "lexie5.jpg",
      "milo1.jpg",
      "milo2.jpg",
      "milo3.jpg",
      "milo4.jpg",
      "milo5.jpg",
    ];
    return {
      projects: [],
      images: shuffle(images),
      index: 0,
      search: "",
      sortOption: "0",
      showMenu: false,
    };
  },
  computed: {
    projectOptions() {
      let projects = [...this.projects];
      
      projects = this.filterProjects(projects);
      projects = this.sortProjects(projects);

      if (projects.length === 0) {
        return null;
      }

      return projects;
    },
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    filterProjects(projects) {
      if (this.search === "") {
        return projects;
      }

      return projects.filter((project) => {
        const search = this.search.toLowerCase();
        const title = project.title.toLowerCase();
        return title.includes(search);
      });
    },
    sortProjects(projects) {
      switch(this.sortOption) {
        case "1":
          projects.sort((firstProject, secondProject) => {
            const firstProjectTitle = firstProject.title.toLowerCase();
            const secondProjectTitle = secondProject.title.toLowerCase();
            return firstProjectTitle.localeCompare(secondProjectTitle);
          }) 
        default:
          return projects;
      }
    },
    getImagePath(image) {
      return "/assets/images/neo/" + image;
    },
    setImageClass(userCurrentIndex) {
      switch (userCurrentIndex) {
        case this.index: return "active";
      }
    },
    nextImage() {
      if (this.index >= this.images.length - 1) {
        this.index = 0;
      } else {
        this.index++;
      }
    },
    prevImage() {
      if (this.index <= 0) {
        this.index = this.images.length - 1;
      } else {
        this.index--;
      }
    },
  },
  async mounted() {
    const projects = await fetchData("/data/projects/projects.json");
    this.projects = projects.filter((project) => project.manager === "neo");
  }
}).mount("#app");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
});

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((element) => observer.observe(element));