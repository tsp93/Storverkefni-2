class Vidpage {
  // Smiður
  constructor() {
    this.main = document.querySelector('main');
  }

}

async function init() {
  const response = await fetch('videos.json');
  const frontpage = new Vidpage();
  await response.json()
    .then((jSonData) => { frontpage.destroyElephant(); frontpage.makePage(jSonData); })
    .catch((error) => { frontpage.appendElephant(frontpage.createElephant('error', error, 'div')); return []; });
}

init();
