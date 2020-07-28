/*
    Clicker Game
    - The most fun you'll ever have playing a generic clone!
    Created by Abner Martinez - 2018
*/

///////////////////
/* Configuration */
///////////////////

// Starting Attributes
const BASE_BALANCE = 0;
const BASE_PER_CLICK = 1;
const BASE_PER_SECOND = 0;

const BASE_MULTIPLIER = 1.00;
const BASE_MULTIPLIER_INCREMENT = 0.01;
const BASE_COST = 25;

// Color Scheme
const BASE_COLOR = "#3cd6d6";
const BASE_BORDER_COLOR = "#3cd6d6";
const BASE_BACKGROUND_COLOR = "#05363f00";

const HOVER_COLOR = "#6bffff";
const HOVER_BORDER_COLOR = "#6bffff";
const HOVER_BACKGROUND_COLOR = "#3cd6d638";

const ACTIVE_COLOR = "#e4ffff";
const ACTIVE_BORDER_COLOR = "#e4ffff";
const ACTIVE_BACKGROUND_COLOR = "#05363f00";

const SUCCESS_COLOR = "#8bff74";
const SUCCESS_BORDER_COLOR = "#8bff74";
const SUCCESS_BACKGROUND_COLOR = "#8bff742a";

const ERROR_COLOR = "#fd2465";
const ERROR_BORDER_COLOR = "#fd2465";
const ERROR_BACKGROUND_COLOR = "#fd24652a";

// Text Formatting
const BALANCE_PREFIX = "$";
const PER_CLICK_PREFIX = "APC: ";
const PER_SECOND_PREFIX = "APS: ";
const PER_CLICK_UPGRADE = "upgrade_click";
const PER_SECOND_UPGRADE = "upgrade_auto";

// Sound Files
const SND_ON_MOUSE_DOWN = "sounds/on_click.wav";
const SND_ON_MOUSE_ENTER = "sounds/on_hover.wav";
const SND_ON_MOUSE_LEAVE = "sounds/on_hover_exit.wav";

///////////////
/* Variables */
///////////////

// Starting Attributes
var balance = BASE_BALANCE;
var perClick = BASE_PER_CLICK;
var perSecond = BASE_PER_SECOND;

var perSecondCost = BASE_COST;
var perClickCost = BASE_COST;

var perSecondRate = BASE_MULTIPLIER;
var perClickRate = BASE_MULTIPLIER;
var perSecondRateIncrement = BASE_MULTIPLIER_INCREMENT * 5;
var perClickRateIncrement = BASE_MULTIPLIER_INCREMENT * 2;

var balanceText;
var perClickText;
var perSecondText;

//////////////
/* Elements */
//////////////

// Interface
var balanceDisplay = document.getElementById("balance"); // wallet Display
var perClickDisplay = document.getElementById("per_click"); // APC Display
var perSecondDisplay = document.getElementById("per_second"); // APS Display
var perClickCostDisplay = document.getElementById("click_cost"); // APC Upgrade Visual
var perSecondCostDisplay = document.getElementById("auto_cost"); // APS Upgrade Visual

// Buttons
var clicker = document.getElementById("clicker"); // Clicker Element
var perClickUpgradeButton = document.getElementById("upgrade_click");
var perSecondUpgradeButton = document.getElementById("upgrade_auto");

// Sound References
var activeSound = document.getElementById("click_sound"); // Click Sound Element
var hoverSound = document.getElementById("hover_sound"); // Hover Sound Element

window.onload = function()
{
    SetAudio();
    SetFunctions();
    SetInterface();
    setInterval(function() {PayAuto()}, 1000);
}

function SetAudio()
{
    hoverSound.src = SND_ON_MOUSE_ENTER;
    activeSound.src = SND_ON_MOUSE_DOWN;
}

function SetFunctions()
{
    clicker.onclick = function() {Increment()};
    perClickUpgradeButton.onclick = function() {UpgradePerClick()};
    perSecondUpgradeButton.onclick = function() {UpgradePerSecond()};
    perClickUpgradeButton.onmouseleave = function() {ToDefault(perClickUpgradeButton)};
    perSecondUpgradeButton.onmouseleave = function() {ToDefault(perSecondUpgradeButton)};
    perClickUpgradeButton.onmouseenter = function() {OnHover(perClickUpgradeButton)};
    perSecondUpgradeButton.onmouseenter = function() {OnHover(perSecondUpgradeButton)};
    perClickUpgradeButton.onmousedown = function() {OnActive(perClickUpgradeButton)};
    perSecondUpgradeButton.onmousedown = function() {OnActive(perSecondUpgradeButton)};
}

function SetInterface()
{    
    balance = BASE_BALANCE;
    perClick = BASE_PER_CLICK;
    perSecond = BASE_PER_SECOND;

    perSecondCost = BASE_COST;
    perClickCost = BASE_COST;

    perSecondRate = BASE_MULTIPLIER;
    perClickRate = BASE_MULTIPLIER;

    UpdateInterface();
}

function UpdateInterface()
{
    balanceText = `${BALANCE_PREFIX}${balance}`;
    perClickText = `${PER_CLICK_PREFIX}${perClick}`;
    perSecondText = `${PER_SECOND_PREFIX}${perSecond}`;

    balanceDisplay.innerHTML = balanceText;
    perClickDisplay.innerHTML = perClickText;
    perSecondDisplay.innerHTML = perSecondText;
    
    perClickCostDisplay.innerHTML = `[x${perClickRate}] $${perClickCost}`;
    perSecondCostDisplay.innerHTML = `[x${perSecondRate}] $${perSecondCost}`;
}

/* Base Functions - System */
function Increment()
{
    PlayClip(activeSound);
    balance += perClick;
    balanceText = `${BALANCE_PREFIX}${balance}`;
    UpdateInterface();
}

function PayAuto()
{
    balance += perSecond;
    UpdateInterface();
}

function UpgradePerClick()
{
    if (balance >= perClickCost)
    {
        ToSuccess(perClickUpgradeButton);
        balance -= perClickCost;
        perClick += 1;

        perClickRate = toCurrency(perClickRate + (perClickRateIncrement * perClick));
        perClickRateIncrement += 0.01;

        perClickCost = Math.round(perClick * BASE_COST * perClickRate);
        perClickText = `${PER_CLICK_PREFIX}${perClick}`;
    }
    else
    {
        ToError(perClickUpgradeButton);
    }
    UpdateInterface();
}

function UpgradePerSecond()
{
    if (balance >= perSecondCost)
    {
        ToSuccess(perSecondUpgradeButton);
        balance -= perSecondCost;
        perSecond += 1;
        perSecondRate = toCurrency(perSecondRate + (perSecondRateIncrement * perClick));
        perSecondCost = Math.round(perSecond * BASE_COST * perSecondRate);
        perSecondRateIncrement += 0.01;
    }
    else
    {
        ToError(perSecondUpgradeButton);
        console.log("You don't have enough to upgrade...");
    }
    UpdateInterface();
}

function Upgrade(type)
{
    var item; // The upgrade item bought.
    var cost; // The cost of the item.
    var multi; // The multiplier of the item.
    var multi_inc; // The multiplier increment of the item.
    var onbuytype; // The item purchased.

    if (type == "apc")
    {

    }
    if (balance >= cost)
    {
        ToSuccess(onbuytype);
        balance -= cost;
        item += 1;
        multi = toCurrency(multi + (multi_inc * item));
        cost = Math.round(item * BASE_COST * multi);
        multi_inc += 0.01;
    }
}

/* Button Functions - Visuals */
function ToSuccess(button)
{
    with (button.style)
    {
        color = SUCCESS_COLOR;
        borderColor = SUCCESS_BORDER_COLOR;
        backgroundColor = SUCCESS_BACKGROUND_COLOR;
        transform = "translateY(4px)";
    }
}

function ToError(button)
{
    with (button.style)
    {
        color = ERROR_COLOR;
        borderColor = ERROR_BORDER_COLOR;
        backgroundColor = ERROR_BACKGROUND_COLOR;
        transform = "translateY(4px)";
    }
}

function ToDefault(button)
{
    CloseLoopedClip(hoverSound);
    with (button.style)
    {
        color = BASE_COLOR;
        borderColor = BASE_BORDER_COLOR;
        backgroundColor = BASE_BACKGROUND_COLOR;
        transform = "translateY(-4px)";
        transition = "0.5s";
    }
}

function OnHover(button)
{

    OpenLoopedClip(hoverSound);
    with (button.style)
    {
        color = HOVER_COLOR;
        borderColor = HOVER_BORDER_COLOR;
        backgroundColor = HOVER_BACKGROUND_COLOR;
    }
}

function OnActive(button)
{
    PlayClip(hoverSound);
    with (button.style)
    {
        color = ACTIVE_COLOR;
        borderColor = ACTIVE_BORDER_COLOR;
        backgroundColor = ACTIVE_BACKGROUND_COLOR;
        transform = "translateY(4px)";
    }
}

/* Sound Functions */
function PlayClip(sound)
{
    sound.currentTime = 0;
    sound.play();
}

function OpenLoopedClip(sound)
{
    sound.volume = 1;
    sound.loop = true;
    sound.play();
}

function CloseLoopedClip(sound)
{
    var init_vol = sound.volume;
    for(var i = init_vol; i > 0; i-=0.1)
    {
        sound.volume = i;
    }
    sound.currentTime = 0;
    sound.pause();
}

/* Required Functions */
function toCurrency(number)
{
    return parseFloat((number).toFixed(2));
}

