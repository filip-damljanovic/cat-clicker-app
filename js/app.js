
/* ======= Model ======= */

var model = {
  currentCat: null,
  cats: [
    {
      clickCount : 0,
      name : 'Tabby',
      imgSrc : 'img/434164568_fea0ad4013_z.jpg',
      imgAttribution : 'https://www.flickr.com/photos/bigtallguy/434164568'
    },
    {
      clickCount : 0,
      name : 'Tiger',
      imgSrc : 'img/4154543904_6e2428c421_z.jpg',
      imgAttribution : 'https://www.flickr.com/photos/xshamx/4154543904'
    },
    {
      clickCount : 0,
      name : 'Scaredy',
      imgSrc : 'img/22252709_010df3379e_z.jpg',
      imgAttribution : 'https://www.flickr.com/photos/kpjas/22252709'
    },
    {
      clickCount : 0,
      name : 'Shadow',
      imgSrc : 'img/1413379559_412a540d29_z.jpg',
      imgAttribution : 'https://www.flickr.com/photos/malfet/1413379559'
    },
    {
      clickCount : 0,
      name : 'Sleepy',
      imgSrc : 'img/9648464288_2516b35537_z.jpg',
      imgAttribution : 'https://www.flickr.com/photos/onesharp/9648464288'
    }
  ]
};


/* ======= Controller ======= */

var controller = {
  init: function() {
    // Set first cat to be current
    this.setCurrentCat(0);

    catView.init();
  },

  getCats: function() {
    return model.cats;
  },

  getCurrentCat: function() {
    return model.currentCat;
  },

  setCurrentCat: function(i) {
    model.currentCat = model.cats[i];
  }

};


/* ======= View ======= */

var catView = {
  init: function() {
    this.catList = document.getElementById('cat-list');
    this.catName = document.getElementById('cat-name');
    this.catClickCount = document.getElementById('cat-count');
    this.catImage = document.getElementById('cat-img');

    // Add event listener for image
    this.catImage.addEventListener('click', function() {
      let currentCat = controller.getCurrentCat();
      currentCat.clickCount++;
      catView.catClickCount.textContent = currentCat.clickCount;
    })

    this.renderCatList();
  },

  renderCatList: function() {

    for(var i = 0; i < controller.getCats().length; i++) {

      // Adding cats to a list
      var cat = document.createElement('li');
      cat.textContent = controller.getCats()[i].name;
      this.catList.appendChild(cat);

      // Render first cat
      catView.renderCat();

      // Add event listeners for cat list items
      cat.addEventListener('click', (function(index) {
        return function() {
          controller.setCurrentCat(index);
          catView.renderCat();
        }
      })(i));

    }
  },

  renderCat: function() {
    // Render current cat
    this.catName.textContent = controller.getCurrentCat().name;
    this.catClickCount.textContent = controller.getCurrentCat().clickCount;
    this.catImage.setAttribute('src', controller.getCurrentCat().imgSrc);
  }

};

// make it go!
controller.init();