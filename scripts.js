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

  makeTime(thenTime) {
    const deit = new Date();
    const nowTime = deit.getTime();
    const timeCreate = nowTime - thenTime;

    const timeSince = timeCreate / 1000;

    const years = Math.floor(timeSince / (60 * 60 * 24 * 365));
    if (years > 0) {
      let ret = this.createTime(years, 'árum');
      if (years === 1) {
        ret = this.createTime(years, 'ári');
      }
      return ret;
    }

    const months = Math.floor(timeSince / (60 * 60 * 24 * 30));
    if (months > 0) {
      let ret = this.createTime(months, 'mánuðum');
      if (months === 1) {
        ret = this.createTime(months, 'mánuði');
      }
      return ret;
    }

    const weeks = Math.floor(timeSince / (60 * 60 * 24 * 7));
    if (weeks > 0) {
      let ret = this.createTime(weeks, 'vikum');
      if (weeks === 1) {
        ret = this.createTime(weeks, 'viku');
      }
      return ret;
    }

    const days = Math.floor(timeSince / (60 * 60 * 24));
    if (days > 0) {
      let ret = this.createTime(days, 'dögum');
      if (days === 1) {
        ret = this.createTime(days, 'degi');
      }
      return ret;
    }

    const hours = Math.floor(timeSince / (60 * 60));
    let ret = this.createTime(hours, 'klukkustundum');
    if (hours === 1) {
      ret = this.createTime(hours, 'klukkustund');
    } else if (hours === 0) {
      ret = this.createTime('', 'minna en klukkutíma');
    }
    return ret;
  }

  createTime(timeSince, timeUnit) {
    return `Fyrir ${timeSince} ${timeUnit} síðan`;
  }

  makePage(jSonData) {
    const videos = jSonData.videos;
    const categories = jSonData.categories;
    this.appendElephant(this.createElephant('maintitle', 'Myndbandaleigan', 'h1'));

    for (let i = 0; i < categories.length; i += 1) {
      const app = this.createElephant('catbox', '', 'div');
      const tit = this.createElephant('catbox__tit', categories[i].title, 'h2');
      const vids = this.createElephant('catbox__vids', '', 'div');
      const sep = this.createElephant('catbox__sep', '', 'div');
      this.appendElephant(app);
      app.appendChild(tit);
      app.appendChild(vids);
      app.appendChild(sep);

      for (let j = 0; j < videos.length; j += 1) {
        for (let h = 0; h < categories[i].videos.length; h += 1) {
          if (videos[j].id === categories[i].videos[h]) {
            const vidbox = this.createElephant('vidbox', '', 'div');
            vids.appendChild(vidbox);

            const clickbox = this.createElephant('clickbox', '', 'a');
            clickbox.setAttribute('href', `video.html?id=${videos[h].id}`);
            vidbox.appendChild(clickbox);

            const img = this.createElephant('videoimg', '', 'img');
            img.setAttribute('src', videos[h].poster);
            clickbox.appendChild(img);

            const vidInf = this.createElephant('videoinf', '', 'div');
            clickbox.appendChild(vidInf);

            const vidInfTit = this.createElephant('videoinf__tit', videos[h].title, 'h3');
            const vidInfText = this.createElephant('videoinf__text', this.makeTime(videos[h].created), 'p');
            vidInf.appendChild(vidInfTit);
            vidInf.appendChild(vidInfText);
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
    .catch((error) => { frontpage.appendElephant(frontpage.createElephant('error loading files', error, 'div')); return []; });
}

init();
