// Menu data structure add without sublinks in task 3.0
// task 5.0 adds the menu sublinks
// var menuLinks = [
//     {text: 'about', href: '/about'},
//     {text: 'catalog', href: '/catalog'},
//     {text: 'orders', href: '/orders'},
//     {text: 'account', href: '/account'},
//  ];
  var menuLinks = [
    {text: 'about', href: '/about'},
    {text: 'catalog', href: '#', subLinks: [
      {text: 'all', href: '/catalog/all'},
      {text: 'top selling', href: '/catalog/top'},
      {text: 'search', href: '/catalog/search'},
    ]},
    {text: 'orders', href: '#' , subLinks: [
      {text: 'new', href: '/orders/new'},
      {text: 'pending', href: '/orders/pending'},
      {text: 'history', href: '/orders/history'},
    ]},
    {text: 'account', href: '#', subLinks: [
      {text: 'profile', href: '/account/profile'},
      {text: 'sign out', href: '/account/signout'},
    ]},
  ];

// Task 1.0 - sets up the main
// Select and cache the <main>element in a variable named mainEl.
const mainEl = document.querySelector("main");

// Task 1.1
// Set the background color of mainElto the value stored in the --main-bgCSS custom property.
mainEl.style.backgroundColor = "var(--main-bg)";

// Task 1.2
// Set the content of mainElto <h1>SEI Rocks!</h1>.
mainEl.innerHTML = "<h1>SEI ROCKS!</h1>";

// Task 1.3
// Add a class of flex-ctrto mainEl.
// HINT
// https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
mainEl.classList.add("flex-ctr");

// Task 2.0 - sets up the TOP MENU NAV
// Select and cache the <nav id="top-menu">element in a variable named topMenuEl.
const topMenuEl = document.querySelector("#top-menu");

// Task 2.1
// Set the height topMenuElelement to be 100%.
topMenuEl.style.height = '100%';

// Task 2.2
// Set the background color of topMenuElto the value stored in the --top-menu-bgCSS custom property.
topMenuEl.style.backgroundColor = "var(--top-menu-bg)";

// Task 2.3
// Add a class of flex-aroundto topMenuEl.
topMenuEl.classList.add("flex-around");

// Task 3.0 set up the menu links
// Copy the following data structure to the top of script.js:
// (it is the var menu links, but without sublinks)

// Task 3.1
// Iterate over the entire menuLinksarray and for each "link" object:
// Create an <a>element.
// On the new element, add an hrefattribute with its value set to the hrefproperty of the "link" object.
// Set the new element's content to the value of the textproperty of the "link" object.
// Append the new element to the topMenuElelement.
menuLinks.forEach(link => {
  const newEl = document.createElement("a");
  newEl.setAttribute("href", link.href);
  newEl.innerText = link.text;
  topMenuEl.append(newEl);
})

// Task 4.0 - sets up sub menu (for the menu elements that have them)
// Select and cache the <nav id="sub-menu">element in a variable named subMenuEl.
const subMenuEl = document.querySelector("#sub-menu");
// const subMenuEl = document.getElementById("sub-menu");

// Task 4.1
// Set the height subMenuElelement to be 100%.
subMenuEl.style.height = '100%';

// Task 4.2
// Set the background color of subMenuElto the value stored in the --sub-menu-bgCSS custom property.
subMenuEl.style.backgroundColor = "var(--sub-menu-bg)";

// Task 4.3
// Add the class of flex-aroundto the subMenuElelement.
subMenuEl.classList.add("flex-around");

// Task 4.4
// Set the CSS positionproperty of subMenuElto the value of absolute.
subMenuEl.style.position = "absolute";

// Task 4.5
// Set the CSS topproperty of subMenuElto the value of 0.
subMenuEl.style.top = 0;

// Task 5.0 sets up the event listener and the dynamic menu options
// updates the submenu array to have subLinks

// Task 5.1
// Select and cache the all of the <a>elements inside of topMenuElin a variable named topMenuLinks.
// Declare a global showingSubMenuvariable and initialize it to false;
const topMenuLinks = topMenuEl.querySelectorAll("a");
var showingSubMenu = false;

// Task 5.2
// Attach a delegated 'click' event listener to topMenuEl.
// The first line of code of the event listener function should call the event object's preventDefault()method.
// The second line of code function should immediately return if the element clicked was not an <a>element.
// console.logthe content of the <a>to verify the handler is working.
topMenuEl.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.nodeName !== "A") return;
  console.log(e.target.textContent);

  // Task 5.3
  // Next in the event listener, if the clicked <a>link has a class of active:
  // Remove the activeclass from the clicked <a>element.
  //  Set the showingSubMenuto false.
  // Set the CSS topproperty of subMenuElto 0.
  // returnto exit the handler.
  if (e.target.classList.contains("active")) {
    e.target.classList.remove("active");
    showingSubMenu = false;
    subMenuEl.style.top = 0;
    console.log('removing active')
    return;
  }

  // Task 5.4
  // Next, the event listener should remove a class name of activefrom each <a>element in topMenuLinks- whether the activeclass exists or not.
  // Hint: Removing a non-existent class from an element does not cause an error, so just remove it!
  topMenuLinks.forEach(link => link.classList.remove("active"));

  // Task 5.5
  // Next, the event listener should add a class name of activeto the <a>element that was clicked.
  e.target.classList.add("active");

  // Task 5.6
  // Set showingSubMenuto trueif the clicked <a>element's "link" object within menuLinkshas a subLinksproperty (all do, except for the "link" object for ABOUT), otherwise, set it to false.
  const activeLink = menuLinks.find(
    (link) => link.text === e.target.textContent
  );

  showingSubMenu = activeLink.hasOwnProperty('subLinks');
  // if (activeLink.hasOwnProperty("subLinks")) {
  //   showingSubMenu = true
  // } else {
  //   showingSubMenu = false
  // }

  // Task 5.7
  // Next in the event listener...
  // If showingSubMenuis true:
  // Call a buildSubMenufunction passing to it the subLinksarray for the clicked <a>element.
  // Set the CSS topproperty of subMenuElto 100%.
  // Otherwise (showingSubMenuis false):
  // Set the CSS topproperty of subMenuElto 0.
  if (showingSubMenu) {
    buildSubMenu(activeLink.subLinks);
    subMenuEl.style.top = "100%";
  } else {
    subMenuEl.style.top = 0;
  }

  if (e.target.textContent == "about") {
    mainEl.innerHTML = `<h1>${e.target.textContent.toUpperCase()}</h1>`;
  }
  
});

// Task 5.8
// Code the buildSubMenufunction so that it:
// Clears the contents of subMenuEl.
// Iterates over the subLinksarray passed as an argument; and for each "link" object:
// Create an <a>element.
// On the new element, add an hrefattribute with its value set to the hrefproperty of the "link" object.
// Set the new element's content to the value of the textproperty of the "link" object.
// Append the new element to the subMenuElelement.
function buildSubMenu(subLinksArray) {
  console.log('in buildSubMenu');
  subMenuEl.innerHTML = '';

  subLinksArray.forEach(link => {
    const aEl = document.createElement('a');
    aEl.setAttribute('href', link.href);
    aEl.textContent = link.text;
    subMenuEl.appendChild(aEl);
  })
};

// Task 6.0 - setting up event listener for submenu
// Attach a delegated 'click' event listener to subMenuEl.
// The first line of code of the event listener function should call the event object's preventDefault()method.
// The second line of code function should immediately return if the element clicked was not an <a>element.
// console.logthe content of the <a>to verify the handler is working.
subMenuEl.addEventListener("click", e => {
  e.preventDefault();
  if (e.target.nodeName !== "A") return;
  console.log(e.target.textContent);

  // Task 6.1
  // Next, the event listener should:
  // Set showingSubMenuto false.
  // Set the CSS topproperty of subMenuElto 0.
  showingSubMenu = false;
  subMenuEl.style.top = 0;

  // Task 6.2
  // Remove the class name of activefrom each <a>element in topMenuLinks- whether the activeclass exists or not.
  for (let link of topMenuLinks) {
    link.classList.remove('active');
  }


  // Task 6.3
  // Update the contents of mainElto the contents of the <a>element, within an <h1>, clicked within subMenuEl.
  mainEl.innerHTML = `<h1>${e.target.textContent.toUpperCase()}</h1>`;
})


// Task 6.4
// If the ABOUT link is clicked, an <h1>about</h1>should be displayed.