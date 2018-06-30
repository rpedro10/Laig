/**
 * MyPatch
 * @param scene CGFscene where the Rectangle will be displayed
 * @constructor
 */
function MyPatch(scene, args) {
	CGFobject.call(this,scene);

//	console.log(args);

		this.controlPoints = args[4];
		
		this.uDivisions=args[0];
		this.vDivisions=args[1];
		this.uDegree=args[2];
	  	this.vDregree=args[3]

	


   var vector = [	// U = 0
						[ // V = 0..3;
							 [ -2.0, -2.0, 1.0, 1 ],
							 [ -2.0, -1.0, -2.0, 1 ],
							 [ -2.0, 1.0, 5.0, 1 ],
							 [ -2.0, 2.0, -1.0, 1 ]
						],
						// U = 1
						[ // V = 0..3
							 [ 0, -2.0, 0, 1 ],
							 [ 0, -1.0, -1.0, 1 ],
							 [ 0, 1.0, 1.5, 1 ],
							 [ 0, 2.0, 0, 1 ]
						],
						// U = 2
						[ // V = 0..3
							 [ 2.0, -2.0, -1.0, 1 ],
							 [ 2.0, -1.0, 2.0, 1 ],
							 [ 2.0, 1.0, -5.0, 1 ],
							 [ 2.0, 2.0, 1.0, 1 ]
						]
					];


		//console.log(vector);
		//console.log(this.controlPoints);
	//	console.log(this.uDegree);
		// console.log(this.vDregree);


	
	var knots1 = this.getKnotsVector(this.uDegree); // to be built inside webCGF in later versions ()
	var knots2 = this.getKnotsVector(this.vDregree); // to be built inside webCGF in later versions

	//console.log(knots1);
	//console.log(knots2);

		
	var nurbsSurface = new CGFnurbsSurface(this.uDegree,this.vDregree, knots1, knots2, this.controlPoints); // TODO  (CGF 0.19.3): remove knots1 and knots2 from CGFnurbsSurface method call. Calculate inside method.
	getSurfacePoint = function(u, v) {
		return nurbsSurface.getPoint(u, v);
	};


	

	 this.obj = new CGFnurbsObject(this.scene, getSurfacePoint, this.uDivisions, this.vDivisions);
};

MyPatch.prototype = Object.create(CGFobject.prototype);
MyPatch.prototype.constructor=MyPatch;

MyPatch.prototype.display = function () {

	this.obj.display();
};

MyPatch.prototype.getKnotsVector = function (order){
	var knots = [];
	for(var i = 0; i < (order+1)*2; ++i) {
		knots.push(Math.round(i/((order+1)*2), 0));
	}
	return knots;
}