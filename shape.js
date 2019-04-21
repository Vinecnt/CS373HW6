/* Intersection structure:
 * t:        ray parameter (float), i.e. distance of intersection point to ray's origin
 * position: position (THREE.Vector3) of intersection point
 * normal:   normal (THREE.Vector3) of intersection point
 * material: material of the intersection object
 */
class Intersection {
	constructor() {
		this.t = 0;
		this.position = new THREE.Vector3();
		this.normal = new THREE.Vector3();
		this.material = null;
	}
	set(isect) {
		this.t = isect.t;
		this.position = isect.position;
		this.normal = isect.normal;
		this.material = isect.material;
	}
}

/* Plane shape
 * P0: a point (THREE.Vector3) that the plane passes through
 * n:  plane's normal (THREE.Vector3)
 */
class Plane {	
	constructor(P0, n, material) {
		this.P0 = P0.clone();
		this.n = n.clone();
		this.n.normalize();
		this.material = material;
	}
	// Given ray and range [tmin,tmax], return intersection point.
	// Return null if no intersection.
	intersect(ray, tmin, tmax) {
		let temp = this.P0.clone();
		temp.sub(ray.o); // (P0-O)	
		let denom = ray.d.dot(this.n); // d.n
		if(denom==0) { return null;	}
		let t = temp.dot(this.n)/denom; // (P0-O).n / d.n
		if(t<tmin || t>tmax) return null; // check range
		let isect = new Intersection();   // create intersection structure
		isect.t = t;
		isect.position = ray.pointAt(t);
		isect.normal = this.n;
		isect.material = this.material;
		return isect;
	}
}

/* Sphere shape
 * C: center of sphere (type THREE.Vector3)
 * r: radius
 */
class Sphere {
	constructor(C, r, material) {
		this.C = C.clone();
		this.r = r;
		this.r2 = r*r;
		this.material = material;
	}
	intersect(ray, tmin, tmax) {
// ===YOUR CODE STARTS HERE===
		let A = 1 // A = |d|^2 = 1
		let ray_o_clone = ray.o.clone()
		let B = (ray_o_clone.sub(this.C).multiplyScalar(2).dot(ray.d)) // B = 2*(O - C) . d
		ray_o_clone = ray.o.clone()
		let C = (ray_o_clone.sub(this.C).lengthSq()) - this.r2 // |O-C|^2 - r^2
		let discriminant = B**2 - 4*A*C
		let t = null;
		if (discriminant < 0){
			return null
		}
		else if (discriminant == 0){ // one isect
			if ( ( (-1*B) / (2*A)) > 0 ){ // if isect is pos, assign it to t
				t = -1*B / 2*A
			}
			else{
				return null
			}
		}
		else if (discriminant > 0){ // two isects, pick smallest pos
			let t1 = (-1*B + discriminant) / (2*A)
			let t2 = (-1*B - discriminant) / (2*A)
			let arr = []
			if ( t1 >0 && t2 <0){ // if t1 is pos set t it t1
				t = t1
			}
			else if (t1<0 && t2 >0){ // if t2 is pos set t it t2
				t = t2
			}
			else if (t1>0 && t2>0){ // if both pos, take the min. however if the min fails, take the max
				t = Math.min(t1,t2)
				if(t<tmin || t>tmax){
					t = Math.max(t1,t2)
				}
			}
			else{ // must mean both neg
				return null
			}
		}

		if(t<tmin || t>tmax) return null

		let isect = new Intersection();   // create intersection structure
		isect.t = t;
		isect.position = ray.pointAt(t);
		isect.normal = isect.position.clone().sub(this.C).normalize();
		isect.material = this.material;
		return isect;
// ---YOUR CODE ENDS HERE---
			// return null;
	}
}

class Triangle {
	/* P0, P1, P2: three vertices (type THREE.Vector3) that define the triangle
	 * n0, n1, n2: normal (type THREE.Vector3) of each vertex */
	constructor(P0, P1, P2, material, n0, n1, n2) {
		this.P0 = P0.clone();
		this.P1 = P1.clone();
		this.P2 = P2.clone();
		this.material = material;
		if(n0) this.n0 = n0.clone();
		if(n1) this.n1 = n1.clone();
		if(n2) this.n2 = n2.clone();

		// below you may pre-compute any variables that are needed for intersect function
		// such as the triangle normal etc.
// ===YOUR CODE STARTS HERE===

// ---YOUR CODE ENDS HERE---
	} 

	intersect(ray, tmin, tmax) {
// ===YOUR CODE STARTS HERE===

// ---YOUR CODE ENDS HERE---
		return null;
	}
}

function shapeLoadOBJ(objname, material, smoothnormal) {
	loadOBJAsMesh(objname, function(mesh) { // callback function for non-blocking load
		if(smoothnormal) mesh.computeVertexNormals();
		for(let i=0;i<mesh.faces.length;i++) {
			let p0 = mesh.vertices[mesh.faces[i].a];
			let p1 = mesh.vertices[mesh.faces[i].b];
			let p2 = mesh.vertices[mesh.faces[i].c];
			if(smoothnormal) {
				let n0 = mesh.faces[i].vertexNormals[0];
				let n1 = mesh.faces[i].vertexNormals[1];
				let n2 = mesh.faces[i].vertexNormals[2];
				shapes.push(new Triangle(p0, p1, p2, material, n0, n1, n2));
			} else {
				shapes.push(new Triangle(p0, p1, p2, material));
			}
		}
	}, function() {}, function() {});
}

/* ========================================
 * You can define additional Shape classes,
 * as long as each implements intersect function.
 * ======================================== */
