function each (domElementList, callback) {
  for (var i = 0; i < domElementList.length; i += 1) {
    callback(domElementList[ i ]);
  }
}

var activeItemClass = 'm-organise--menu-item-active';
var activeMenuItem = document.querySelector('.m-organise--menu-item-active-background');
var organiseMenuItems = document.querySelectorAll('.m-organise--menu-item');
each(organiseMenuItems, function (item) {
  item.addEventListener('click', function (event) {
    var containerRect = document.querySelector('.m-organise--menu').getBoundingClientRect();
    var currentItem = event.currentTarget;
    var itemRect = currentItem.getBoundingClientRect();
    activeMenuItem.style.top = itemRect.top - containerRect.top + 'px';

    each(document.querySelectorAll('.' + activeItemClass), function (activeItem) {
      activeItem.classList.remove(activeItemClass);
    });

    currentItem.classList.add(activeItemClass);
  })
});
