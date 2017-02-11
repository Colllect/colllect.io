function each (domElementList, callback) {
  for (var i = 0; i < domElementList.length; i += 1) {
    callback(domElementList[ i ]);
  }
}

var activeItemClass = 'm-organise--menu-item-active';
var activeMenuItem = document.querySelector('.' + activeItemClass);
var activeMenuBackground = document.querySelector('.m-organise--menu-item-active-background');
var organiseMenuItems = document.querySelectorAll('.m-organise--menu-item');
var currentIndex = 0;

activeMenuBackground.style.bottom = activeMenuItem.getBoundingClientRect().height * (organiseMenuItems.length - 1) + 'px';

each(organiseMenuItems, function (item) {
  item.addEventListener('click', function (event) {
    var containerRect = document.querySelector('.m-organise--menu').getBoundingClientRect();
    var currentItem = event.currentTarget;
    var itemRect = currentItem.getBoundingClientRect();
    var newIndex = [].slice.call(organiseMenuItems).indexOf(currentItem);

    if (currentIndex < newIndex) {
      activeMenuBackground.style.bottom = itemRect.height * (organiseMenuItems.length - newIndex - 1) + 'px';
      setTimeout(function () {
        activeMenuBackground.style.top = itemRect.top - containerRect.top + 'px';
      }, 75);
    } else {
      activeMenuBackground.style.top = itemRect.top - containerRect.top + 'px';
      setTimeout(function () {
        activeMenuBackground.style.bottom = itemRect.height * (organiseMenuItems.length - newIndex - 1) + 'px';
      }, 75);
    }
    currentIndex = newIndex;

    each(document.querySelectorAll('.' + activeItemClass), function (activeItem) {
      activeItem.classList.remove(activeItemClass);
    });

    currentItem.classList.add(activeItemClass);
  })
});
