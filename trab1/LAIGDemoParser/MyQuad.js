/**
 * MyQuad
 * @param {CGFscene} scene Scene which the object belongs to
 * @param {array} args Arguments to create the object (top left and bottom left vertice)
 * @constructor
 */
function MyQuad(scene, args) {
    CGFobject.call(this,scene);
 this.args = args
 	minS =  0.0;
 	minT = 0.0;
 	maxS =1.0;
 	maxT = 1.0;
    this.initBuffers();
};

MyQuad.prototype = Object.create(CGFobject.prototype);
MyQuad.prototype.constructor=MyQuad;

MyQuad.prototype.initBuffers = function () {

    var coordenates = this.args.split(" "); //left-top--- right-bottom

 	this.vertices = [
 	coordenates[0], coordenates[3], 0,
 	coordenates[2],coordenates[3], 0,
 	coordenates[0],coordenates[1], 0,
 	coordenates[2],coordenates[1], 0
 	];

 	this.indices = [
 	0, 1, 2,
 	3, 2, 1,
 	];

 	this.normals = [
 	0,0,1,
 	0,0,1,
 	0,0,1,
 	0,0,1,


 	];

 	this.texCoords = [
        minS,maxT,
        maxS,maxT,
        minS,minT,
        maxS,minT
    ];

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
};


MyQuad.prototype.updateTex = function(S, T) {
    for (var i = 0; i < this.texCoords.length; i += 2) {
			this.texCoords[i] = this.texCoords[i] / s;
			this.texCoords[i + 1] = this.textCoords[i+1] / t;
	}

	this.updateTexCoordsGLBuffers();
};

