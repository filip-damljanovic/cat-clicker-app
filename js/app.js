
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
    // Hide admin area
    this.hideAdminArea();

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
  },

  hideAdminArea: function() {
    var x = document.getElementById('admin-area');
    x.style.display = 'none';
  },

  showAdminArea: function() {
    var x = document.getElementById('admin-area');
    x.style.display = 'block';
    catView.cancelButton.focus();
  }

};


/* ======= View ======= */

var catView = {
  init: function() {
    // DOM elements initialization
    this.catList = document.getElementById('cat-list');
    this.catName = document.getElementById('cat-name');
    this.catClickCount = document.getElementById('cat-count');
    this.catImage = document.getElementById('cat-img');
    this.adminButton = document.getElementById('admin-button');
    this.saveButton = document.getElementById('save-button');
    this.cancelButton = document.getElementById('cancel-button');
    this.nameInput = document.getElementById('cname');
    this.urlInput = document.getElementById('curl');
    this.clicksInput = document.getElementById('cclicks');

    // Add event listener for image
    this.catImage.addEventListener('click', function() {
      let currentCat = controller.getCurrentCat();
      currentCat.clickCount++;
      catView.catClickCount.textContent = currentCat.clickCount;
      catView.clicksInput.value = currentCat.clickCount;
    });

    // Add event listener for admin button
    this.adminButton.addEventListener('click', function() {
      controller.showAdminArea();
      catView.seeCatInfo();
    });

    // Add event listener for cancel button
    this.cancelButton.addEventListener('click', function() {
      controller.hideAdminArea();
    });

    // Add event listener for save button
    this.saveButton.addEventListener('click', function() {
      catView.changeCatInfo();
      catView.updateCatList();
      controller.hideAdminArea();
    });

    this.renderCatList();
  },

  renderCatList: function() {

    for(var i = 0; i < controller.getCats().length; i++) {

      // Adding cats to a list
      var cat = document.createElement('li');
      var link = document.createElement('a');
      link.textContent = controller.getCats()[i].name;
      this.catList.appendChild(cat);
      cat.appendChild(link);

      // Render first cat
      catView.renderCat();

      // Add event listeners for cat list items
      cat.addEventListener('click', (function(index) {
        return function() {
          controller.hideAdminArea();
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
  },

  seeCatInfo: function() {
    // Show current cat info in input fields
    this.nameInput.value = this.catName.textContent;
    this.urlInput.value = this.catImage.getAttribute('src');
    this.clicksInput.value = this.catClickCount.textContent;
  },

  changeCatInfo: function() {
    // Change cat name
    controller.getCurrentCat().name = this.nameInput.value;
    this.catName.textContent = this.nameInput.value;

    // Change cat image url
    controller.getCurrentCat().imgSrc = this.urlInput.value;
    this.catImage.setAttribute('src', this.urlInput.value);

    // Change cat click count
    controller.getCurrentCat().clickCount = this.clicksInput.value;
    this.catClickCount.textContent = this.clicksInput.value;
  },

  updateCatList: function() {
    for(var i = 0; i < controller.getCats().length; i++) {
      var cat = document.getElementsByTagName('a')[i];
      cat.textContent = controller.getCats()[i].name;
    }
  }
};

// make it go!
controller.init();