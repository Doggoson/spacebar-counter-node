if(navigator.cookieEnabled === false) {
  document.write("Your data will not be saved, enable site cookies.");
}

if(window.innerWidth > 600) {
  $(".MobileButton").remove();
}

$(window).on("load",function() {
    $(".loading-container").fadeOut(2500).then(() => {
      $(".loading-container").remove();
    })
});

(localStorage.getItem("Spaces") == null) ? localStorage.setItem("Spaces", 0) : localStorage.getItem("Spaces");
(localStorage.getItem("GainedSpaces") == null) ? localStorage.setItem("GainedSpaces", 1) : localStorage.getItem("GainedSpaces");
(localStorage.getItem("IdleGained") == null) ? localStorage.setItem("IdleGained", 1) : localStorage.getItem("IdleGained");
console.log("PlayerInfo{} Loaded.");

let Tapping = false;
let Cooldown = false;
let has = localStorage.getItem("HasAS");
var PlayerInfo = {
  Spaces: parseInt(localStorage.getItem("Spaces"), 10),
  GainedSpaces: parseInt(localStorage.getItem("GainedSpaces"), 10),
  IdleGained: parseInt(localStorage.getItem("IdleGained"))
};

var Shop = {
  Spaces: 250 * PlayerInfo['GainedSpaces'],
  Autospace: 25000,
  IdleGained: 500 * PlayerInfo['IdleGained']
};

let title = document.getElementById("title");
let Spaces = document.getElementById("Spaces");

function SS(v) {
  localStorage.setItem("Spaces", v);
}

setInterval(function() {
  title.innerHTML = "Spaces: " + PlayerInfo['Spaces'];
}, 1000);

let n;
function StartAuto() {
  if (Tapping && has) {
    clearInterval(n);
    Tapping = false;
  } else {
    Tapping = true;
    n = setInterval(function() {
      SS(PlayerInfo['Spaces'] += PlayerInfo['IdleGained']);
    }, 200);
  }
}

window.addEventListener("keyup", function(e) {
  if(e.keyCode == 32 && !Cooldown) {
    SS(PlayerInfo['Spaces'] + PlayerInfo['GainedSpaces']);
    Cooldown = true;
    setTimeout(() => {
     Cooldown = false; 
    },50);
  }
});

function MobileTap() {
  if(window.innerWidth > 600) return;
  if(Cooldown) return;
  SS(PlayerInfo['Spaces'] + PlayerInfo['GainedSpaces']);
  Cooldown = true;
  setTimeout(() => {
   Cooldown = false; 
  },50);
}

var SPrice = document.getElementById("Spaces+Price");

function SpacesPTBuy() {
  if (PlayerInfo['Spaces'] >= Shop['Spaces'] * PlayerInfo['GainedSpaces']) {
    SS(PlayerInfo['Spaces'] - (250 * PlayerInfo['GainedSpaces']))
    
    localStorage.setItem("GainedSpaces", PlayerInfo['GainedSpaces'] += 1);
  }
}

var el4 = document.getElementById("AutoSpace");
var AutoSpaceBuy = document.getElementById("AutoSpaceBuy");
var AutoSpacePrice = document.getElementById("AutoSpacePrice");

if (!has && parseInt(localStorage.getItem("AutoSpace"), 10) === 1) {
  localStorage.setItem('HasAU', true);
  has = localStorage.getItem('HasAU');

  el4.style.opacity = "100%";
  el4.disabled = false;

  $(AutoSpaceBuy).remove();
  $(AutoSpacePrice).remove();
}

function AutoSpaceBuy_() {
  if (PlayerInfo['Spaces'] >= Shop['Autospace'] && !has) {
    SS(PlayerInfo['Spaces'] - 10250);

    localStorage.setItem("AutoSpace", 1);
    has = true;

    el4.style.opacity = "100%";
    el4.disabled = false;

    $(AutoSpaceBuy).remove();
    $(AutoSpacePrice).remove();
  }
}

function IdleGainedBuy() {
  if(PlayerInfo['Spaces'] >= Shop['IdleGained']) {
    PlayerInfo['IdleGained'] * 2;
    SS(PlayerInfo['Spaces'] - Shop['IdleGained']);
    localStorage.setItem('IdleGained', PlayerInfo['IdleGained']);
  }
}

setInterval(function() {
PlayerInfo['Spaces'] = parseInt(localStorage.getItem("Spaces"), 10);
PlayerInfo['GainedSpaces'] = parseInt(localStorage.getItem("GainedSpaces"), 10);
PlayerInfo['IdleGained'] = parseInt(localStorage.getItem("IdleGained"), 10);

  Spaces.innerHTML = "You have " + PlayerInfo['Spaces'] + " Spaces.";

  if (PlayerInfo['Spaces'] > 1000) {
    Spaces.innerHTML = "You have " + PlayerInfo['Spaces'] / 1000 + "K Spaces";
  }

  if (PlayerInfo['Spaces'] > 1000000) {
    Spaces.innerHTML = "You have " + PlayerInfo['Spaces'] / 1000000 + "M Spaces";
  }

  if (PlayerInfo['Spaces'] > 1000000000) {
    Spaces.innerHTML = "You have " + PlayerInfo['Spaces'] / 1000000000 + "B Spaces";
  }

  if (PlayerInfo['Spaces'] > 1000000000000) {
    Spaces.innerHTML = "You have " + PlayerInfo['Spaces'] / 1000000000000 + "T Spaces";
  }

  if (PlayerInfo['Spaces'] > 1000000000000000) {
    Spaces.innerHTML = "You have " + PlayerInfo['Spaces'] / 1000000000000000 + "QD Spaces";
  }

  if (PlayerInfo['Spaces'] > 1000000000000000000) {
    Spaces.innerHTML = "You have " + PlayerInfo['Spaces'] / 1000000000000000000 + "QI Spaces";
  }

  if (PlayerInfo['Spaces'] > 1000000000000000000000) {
    Spaces.innerHTML = "You have " + PlayerInfo['Spaces'] / 1000000000000000000000 + "SX Spaces";
  }

  let SPTPrice = Shop['Spaces'];

  SPrice.innerHTML = "Price: " + SPTPrice + " Spaces";

  if (SPTPrice > 1000) {
    SPrice.innerHTML = "Price: " + SPTPrice / 1000 + "K Spaces";
  }

  if (SPTPrice > 1000000) {
    SPrice.innerHTML = "Price: " + SPTPrice / 1000000 + "M Spaces";
  }
}, 100);
setInterval(() => {debugger},25);
