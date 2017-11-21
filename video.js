class Vidpage {
  // Smiður
  constructor() {
    this.main = document.querySelector('main');
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
    .then((jSonData) => { vidpage.makePage(jSonData); })
    .catch(error => error);
}

init();
