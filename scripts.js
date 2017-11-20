class Frontpage {
  // Smiður
  constructor() {
    this.main = document.querySelector('main');
  }

  // Býr til element
  createElephant(className, title, classType) {
    const divbox = document.createElement(classType);
    divbox.className = className;
    if (title !== '') {
      const text = document.createTextNode(title);
      divbox.appendChild(text);
    }
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
      const app = this.createElephant('vidBox', '', 'div');
      const tit = this.createElephant('tit', categories[i].title, 'div');
      this.appendElephant(app);
      app.appendChild(tit);

      for (let j = 0; j < videos.length; j += 1) {
        for (let h = 0; h < categories[i].videos.length; h += 1) {
          if (videos[j].id === categories[i].videos[h]) {
            app.appendChild(this.createElephant('video', videos[j].title, 'div'));
          }
        }
      }
    }
  }
}

async function init() {
  const response = await fetch('videos.json');
  const frontpage = new Frontpage();
  await response.json()
    .then((jSonData) => { frontpage.destroyElephant(); frontpage.makePage(jSonData); })
    .catch((error) => { frontpage.appendElephant(frontpage.createElephant('error', error, 'div')); return []; });
}

init();
