// app.js

new Vue({

  // We want to target the div with an id of 'divSquares'
  el: '#divSquares',

  // Here we can register any values or collections that hold data for the application
  data: {
	errors: [],
    square: { squareId: '', userId: '', xCoord: '', yCoord: '', desc: '', shortDesc: '', image: '' },
    squares: [],
	users: [
         { text: 'Select a User ..',  value: '0' }
	],	 
	selectedUser: '0'	 
  },

  created: function() {
	
    this.fetchUsers();
	this.fetchSquares();
  },

  methods: {

    // Create users to populate User Drop Down 
    fetchUsers: function() {

       this.$http.get('http://users-api-01.appspot.com/users?size=1000').then(response => {
	      console.log('fetchUsers() ' + response.body.length + ' found');	
	      console.log(response.body);	
		  
		  var i;
   	      var user = {};
	   
          for (i = 0; i < response.body.length; i++) {
        	 user = {};
		     user['text']  = response.body[i].fName + " " +
		                     response.body[i].lName;
      	     user['value'] = response.body[i].userId;
             
			 this.users.push(user);
          }
       }, response => { 
          // error callback 
       });	
    },

    fetchSquares: function() {
	
       this.$http.get('http://squares-api-168505.appspot.com/squares/?size=10').then(response => {
	      console.log('fetchSquares() ' + response.body.length + ' found');	
  	      this.$set(this, 'squares', response.data);
       }, response => { 
          // error callback 
       });	
    },

    // Adds an square to the existing squares array
    addSquare: function() {
		
		console.log("selectedUser=" + this.selectedUser);
		
	   var body = {};

       if (this.square.squareId == "" || isNaN(this.square.squareId)) {
		  alert("Square Id must be entered (and Integer)");
		  return; 
       }
       else if (this.square.xCoord == "" || isNaN(this.square.xCoord)) {
		  alert("X Coord must be entered (and Integer)");
		  return; 
       }
       else if (this.square.yCoord == "" || isNaN(this.square.yCoord)) {
		  alert("Y Coord must be entered (and Integer)");
		  return; 
       }
       else if (this.square.desc == "") {
		  alert("Description must be entered");
		  return; 
       }
       else if (this.square.shortDesc == "") {
		  alert("Short Description must be entered");
		  return; 
       }
       else if (this.selectedUser == '0') {
		  alert("User must be entered");
		  return; 
       };
	   
	   body['squareId']  = parseInt(this.square.squareId);
	   body['userId']    = parseInt(this.selectedUser);
	   body['xCoord']    = parseInt(this.square.xCoord);
	   body['yCoord']    = parseInt(this.square.yCoord);
	   body['desc']      = this.square.desc;
	   body['shortDesc'] = this.square.shortDesc;
	  
  	   console.log("addSquare() " + this.square.squareId);
 	   console.log(body);
       this.$http.post('http://squares-api-168505.appspot.com/squares/',body).then(response => {
          this.fetchSquares();          
		  console.log('post OK');	
       }, response => { 
          // error callback 
       });	
    },
  
    deleteSquare: function(index) {

	   console.log("deleteSquare() " + this.squares[index].squareId);
	  
       this.$http.delete('http://squares-api-168505.appspot.com/squares/' + 
		     this.squares[index].squareId).then(response => {
          this.fetchSquares();          
		  console.log('post OK');	
       }, response => { 
          // error callback 
       });	      
    }
	
  } // methods
});