/**
 * MyGraphLeaf class, representing a leaf in the scene graph.
 * @constructor
**/

function MyGraphLeaf(graph, xmlelem, args, id) {
	
	this.graph = graph;
	this.obj = null;
	this.type = xmlelem;

	if(id != "noid")
		this.id= id;

	switch(xmlelem)
	{
		case "rectangle":
		this.obj = new MyQuad(this.graph.scene, args);
		break;

		case "cylinder":
		this.obj = new MyCylinderWithTopAndBottom(this.graph.scene, args);
		break;

		case "sphere":
		this.obj = new MySphere(this.graph.scene, args);
		break;

		case "triangle":
		this.obj = new MyTriangle(this.graph.scene, args);
		break;
		case "patch":
		 console.log(args);
		 this.obj= new MyPatch(this.graph.scene, args);
	}
}


MyGraphLeaf.prototype.display = function(){

	if(this.obj != null)
		this.obj.display();
}
