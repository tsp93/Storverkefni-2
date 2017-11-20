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
      const tit = this.createElephant('vidBox__tit', categories[i].title, 'h2');
      this.appendElephant(app);
      app.appendChild(tit);

      for (let j = 0; j < videos.length; j += 1) {
        for (let h = 0; h < categories[i].videos.length; h += 1) {
          if (videos[j].id === categories[i].videos[h]) {
            const boxbox = this.createElephant('vidBox__box', '', 'div');
            app.appendChild(boxbox);

            const clickBox = this.createElephant('clickBox', '', 'a');
            clickBox.setAttribute('href', `videos.html?id=${videos[h].id}`);
            boxbox.appendChild(clickBox);

            const img = this.createElephant('videoImg', '', 'img');
            img.setAttribute('src', videos[h].poster);
            clickBox.appendChild(img);
            clickBox.appendChild(this.createElephant('videoTit', videos[j].title, 'h3'));
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
