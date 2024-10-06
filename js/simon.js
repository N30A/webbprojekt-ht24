const fetchData = async (url) => {
  let response = await fetch(url);
  return await response.json();
}

Vue.createApp({
  data() {
    return {
      showMenu: false,
      skills: null,
      projects: null,
      currentActive: 2
    }
  },
  methods: {
    changeCarousellActive(direction){
      this.currentActive = (this.currentActive + direction + 5) % 5;
    },
    getClassName(id){
      if (id === this.currentActive) return 'active';
      if ((id === (this.currentActive + 1) % 5)) return 'next';
      if ((id === (this.currentActive - 1 + 5) % 5)) return 'prev';
      if ((id === (this.currentActive + 2) % 5)) return 'secondnext';
      if ((id === (this.currentActive - 2 + 5) % 5)) return 'secondprev';
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    }
  },
  async mounted() {
    this.skills = await fetchData("/data/simon/skills.json");
    let projects = await fetchData("/data/projects/projects.json");
    this.projects = projects.filter((project) => project.manager === "simon");
  }
}).mount('#app')