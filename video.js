class Vidpage {
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
    const url = window.location.href.split('=')[1];
    const videos = jSonData.videos;
  }
}

async function init() {
  const response = await fetch('videos.json');
  const vidpage = new Vidpage();
  await response.json()
    .then((jSonData) => { vidpage.destroyElephant(); vidpage.makePage(jSonData); })
    .catch((error) => { vidpage.appendElephant(vidpage.createElephant('error loading files', error, 'div')); return []; });
}

init();
