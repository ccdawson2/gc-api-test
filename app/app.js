// app.js

new Vue({

  // We want to target the div with an id of 'divSquares'
  el: '#divSquares',

  // Here we can register any values or collections that hold data for the application
  data: {
    square: { squareId: '', ownerId: '', xCoord: '', yCoord: '', desc: '', shortDesc: '', image: '' },
    squares: []
  },

  created: function() {
    console.log('created()');
    this.fetchSquares();
  },

  methods: {

    // We dedicate a method to retrieving and setting some data
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
		
  	   console.log("addSquare() " + this.square.squareId);
	   
	   var body = {};
	   
	   body['squareId']  = parseInt(this.square.squareId);
	   body['ownerId']   = parseInt(this.square.ownerId);
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