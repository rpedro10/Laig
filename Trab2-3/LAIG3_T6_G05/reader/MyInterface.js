/**
* MyInterface class, creating a GUI interface.
* @constructor
*/
function MyInterface() {
    //call CGFinterface constructor 
    CGFinterface.call(this);
}

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * Initializes the interface.
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function (application) {
    // call CGFinterface init
    CGFinterface.prototype.init.call(this, application);

    // init GUI. For more information on the methods, check:
    //  http://workshop.chromeexperiments.com/examples/gui

    this.gui = new dat.GUI();

    // add a group of controls (and open/expand by default)

    return true;
};

/**
 * Adds a folder containing ambiente configs.
 */
MyInterface.prototype.addAmbientGroup = function (lights) {

    var group = this.gui.addFolder("Ambient");
    group.open();


    var lightsGroup = group.addFolder("Lights");
    lightsGroup.open();

    // add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
    // e.g. this.option1=true; this.option2=false;

    for (var key in lights) {
        if (lights.hasOwnProperty(key)) {
            this.scene.lightValues[key] = lights[key][0];
            lightsGroup.add(this.scene.lightValues, key);
        }
    }

    /**
* Adds a dropDown containing Cameras;
*/
    group.add(this.scene, 'selectedCamera', {
        "Camera1": 0,
        "Camera2": 1,
    }).name('Cameras');


    /**
    * Adds a dropDown containing Scenarios;
    */
    group.add(this.scene, 'selectedScenario', {
        "Running Track": 0,
        "Castle": 1,
    }).name('Scenarios');
};

/**
 * Adds a folder containing the Game configuration parameters.
 */
MyInterface.prototype.addGameConfigGroup = function () {

    var group = this.gui.addFolder("Game Configs");
    group.open();

    group.add(this.scene, 'selectedGameMode', {
        "PvP": 0,
        "PvC": 1,
        "CvC": 2,
    }).name('Mode');

    group.add(this.scene, 'selectedGameDifficulty', {
        "Easy": 0,
        "Medium": 1,
    }).name('Difficulty');

    group.add(this.scene, 'selectedTimeout', 30, 300).name('Time Control');

    group.add(this.scene, 'startGame').name('Start Game');
};

/**
 * Adds a folder containing the Game configuration parameters.
 */
MyInterface.prototype.addGameControllerGroup = function () {

    var group = this.gui.addFolder("Game Controller");
    group.open();

    group.add(this.scene, 'resume').name('Play/Pause');
    group.add(this.scene, 'undo').name('Undo');
    group.add(this.scene, 'resign').name('Resign');

};
