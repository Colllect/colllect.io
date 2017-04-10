var isSafari = /^((?!chrome).)*safari/i.test(navigator.userAgent);
if (isSafari) {
  document.documentElement.classList.add('is-safari');
}

function each (domElementList, callback) {
  for (var i = 0; i < domElementList.length; i += 1) {
    callback(domElementList[ i ]);
  }
}

///////////
// ORGANISE
var activeItemClass = 'm-organise--menu-item-active';
var activeMenuItem = document.querySelector('.' + activeItemClass);
var organiseShape = document.querySelector('.m-organise--shape');
var activeMenuBackground = document.querySelector('.m-organise--menu-item-active-background');
var organiseMenuItems = document.querySelectorAll('.m-organise--menu-item');

activeMenuBackground.style.bottom = activeMenuItem.getBoundingClientRect().height * (organiseMenuItems.length - 1) + 'px';

each(organiseMenuItems, function (item) {
  item.addEventListener('click', function (event) {
    var containerRect = document.querySelector('.m-organise--menu').getBoundingClientRect();
    var currentItem = event.currentTarget;
    var itemRect = currentItem.getBoundingClientRect();
    activeMenuBackground.style.top = itemRect.top - containerRect.top + 'px';

    each(document.querySelectorAll('.' + activeItemClass), function (activeItem) {
      activeItem.classList.remove(activeItemClass);
    });

    currentItem.classList.add(activeItemClass);
    organiseShape.setAttribute('data-state-name', currentItem.getAttribute('data-state-name'));
  })
});

//////////////
// TAKE A PEAK
var heroFormFields = document.querySelectorAll('.m-hero--form-input input');
var peakFormFields = document.querySelectorAll('.m-peak--form-input input');
var focusedFieldHero = 'm-hero--form-input__filled';
var focusedFieldPeak = 'm-peak--form-input__filled';

function manageInputStateChange (focusedClassName) {
  if (this.value.trim() !== "") {
    if (!this.classList.contains(focusedClassName)) {
      this.classList.add(focusedClassName);
    }
  } else {
    this.classList.remove(focusedClassName);
  }
}

each(heroFormFields, function (field) {
  field.addEventListener('blur', function () {
    manageInputStateChange.call(this, focusedFieldHero)
  });
});

each(peakFormFields, function (field) {
  field.addEventListener('blur', function () {
    manageInputStateChange.call(this, focusedFieldPeak)
  });
});

/////////////////////
// SLIDE IN ON SCROLL
function slideOnScroll () {
  var elements = document.querySelectorAll('.slide-on-scroll');
  each(elements, function (element) {
    var elementRect = element.getBoundingClientRect();

    if (elementRect.top - window.innerHeight + 200 < 0) {
      element.classList.remove('rewind-slide');
    } else if (elementRect.top - window.innerHeight - 20 > 0) {
      element.classList.add('rewind-slide');
    }
  })
}

window.addEventListener('scroll', slideOnScroll);
window.addEventListener('resize', slideOnScroll);
slideOnScroll();

////////
// FORMS
var formSubitedOk = false;

function onSubmit (e) {
  var form = this,
    formClass = form.classList[ 0 ];

  e.preventDefault();
  if (formSubitedOk) {
    return;
  }

  form.querySelector('input').disabled = true;
  form.querySelector('button').disabled = true;

  var req = new XMLHttpRequest();
  req.open('POST', 'subscribe.php', true);
  req.onreadystatechange = function () {
    if (req.readyState === 4) {
      if (req.status === 200) {
        formSubitedOk = true;
        form.classList.add(formClass + '__submitted');
        form.querySelector('.' + formClass + '-input-icon-error').style.display = 'none';
        form.querySelector('.' + formClass + '-input-icon-mail').style.display = 'block';
        setTimeout(function () {
          form.querySelector('button').innerHTML = 'Thanks&nbsp;&nbsp;( :'
        }, 500);
      } else {
        form.querySelector('.' + formClass + '-input-icon-error').style.display = 'block';
        form.querySelector('.' + formClass + '-input-icon-mail').style.display = 'none';
        form.querySelector('input').disabled = false;
        form.querySelector('button').disabled = false;
      }
    }
  };
  var formData = new FormData(form);
  formData.append('email', form.querySelector('input').value);
  req.send(formData);
}
document.querySelector('.m-hero--form').addEventListener('submit', onSubmit, false);
document.querySelector('.m-peak--form').addEventListener('submit', onSubmit, false);

/////////////////
// SVG IE SUPPORT
function isIE () {
  var ua = window.navigator.userAgent;
  return ua.indexOf('MSIE ') > 0 || ua.indexOf('Trident/') > 0;
}

function resizeSvg () {
  each(document.querySelectorAll('svg'), function (svg) {
    if (svg.getAttribute('height')) {
      return;
    }
    var viewBox = svg.getAttribute('viewBox').split(' ');
    var viewBoxWidth = viewBox[ 2 ];
    var viewBoxHeight = viewBox[ 3 ];
    var computedHeight = parseInt((viewBoxHeight * svg.getBoundingClientRect().width) / viewBoxWidth, 10);
    if (computedHeight > 0) {
      svg.style.height = computedHeight + 'px';
    }
  });
}
if (isIE) {
  window.addEventListener('resize', resizeSvg);
  resizeSvg();
}
