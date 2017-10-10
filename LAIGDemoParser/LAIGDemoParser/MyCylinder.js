/**
 * MyCylinder
 * @constructor
 */
function MyCylinder(scene, args) {
    CGFobject.call(this,scene);
    
    args = args.split(" ").map(Number);

    this.height = args[0];
    this.bot = args[1];
    this.top = args[2];
    this.stacks = args[3];
    this.slices = args[4];

    this.initBuffers();
 };

 MyCylinder.prototype = Object.create(CGFobject.prototype);
 MyCylinder.prototype.constructor = MyCylinder;

 MyCylinder.prototype.initBuffers = function ()
{
    this.vertices = [];
    this.normals = [];
    this.indices = [];

    var step = this.height/this.stacks;
    var deltaRadius = (this.top - this.bot);
    var delta = 2 * Math.PI/this.slices;

    for(var i = 0 ; i <= this.stacks ; i++)
    {
        var radPercent = i/this.stacks;
        var radius = radPercent * deltaRadius + this.bot;

        for(var j = 0; j < this.slices; j++)
        {
            var angle = j * delta;
            this.vertices.push(radius * Math.cos(angle), radius * Math.sin(angle), i * step);
            this.normals.push(Math.cos(angle), Math.sin(angle), 0);
        }
    }

    var currentSlice = 1;
    for(var i = 0; i < this.slices*this.stacks; i++)
    {
        if(currentSlice == this.slices)
        {
            this.indices.push(i, i - this.slices + 1, i + this.slices);
            this.indices.push(i+this.slices, i - this.slices + 1, i + 1);
            currentSlice = 1;
        }
        else
        {
            this.indices.push(i, i+1, i + this.slices);
            if(i != this.slices * this.stacks - 1)
                this.indices.push(i+this.slices, i + 1, i + 1 + this.slices);
            currentSlice++;
        }
    }

    this.vertices.push(0,0,0);
    this.vertices.push(0,0,this.height); 
    var baseCenter = (this.vertices.length/3) - 2;
    var topCenter = (this.vertices.length/3) - 1;
    for(var i = 0; i < this.slices; i++)
    {
        this.normals.push(0, 0, -1);
        this.normals.push(0, 0, 1);
    }
    currentSlice = 1;
    for(var j = 0; j < this.slices; j++)
    {
        if(currentSlice == this.slices)
        {
            this.indices.push(baseCenter, j + 1 - this.slices, j);
            this.indices.push(j + this.stacks * this.slices, j + this.stacks * this.slices-this.slices + 1, topCenter);
            currentSlice = 1;
        }
        this.indices.push(baseCenter, j + 1, j);
        this.indices.push(j + this.stacks * this.slices, j + 1 + this.stacks * this.slices, topCenter);
        currentSlice++;
    }

    this.primitiveType=this.scene.gl.TRIANGLES;
    this.initGLBuffers();
}