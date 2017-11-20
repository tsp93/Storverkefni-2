class Frontpage {
  // Smiður
  constructor() {
    this.main = document.querySelector('main');
  }

  // Býr til element
  createElephant(className, string) {
    const divbox = document.createElement('div');
    divbox.className = className;
    const text = document.createTextNode(string);
    divbox.appendChild(text);
    return divbox;
  }

  appendElephant(divbox) {
    this.main.appendChild(divbox);
  }

  destroyElephant() {
    while (this.main.hasChildNodes()) {
      this.main.removeChild(this.main.lastChild);
    }
  }

  makePage(jSonData) {
    const videos = jSonData.videos;
    const categories = jSonData.categories;

    for (let i = 0; i < categories.length; i += 1) {
      const app = this.createElephant(categories[i].title);
      this.appendElephant(app);

    }
  }
}

async function init() {
  const response = await fetch('videos.json');
  const frontpage = new Frontpage();
  await response.json()
    .then((jSonData) => { frontpage.destroyElephant(); frontpage.makePage(jSonData); })
    .catch((error) => { frontpage.appendElephant(frontpage.createElephant(error, 'Error loading videos')); return []; });
}

init();
