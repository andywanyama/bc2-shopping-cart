$(document).ready(function(){
	//get all items and bind to dragstart event
	$('.item').bind('dragstart', function (event) { 
        event.dataTransfer.setData('text/plain', this.id);//set data to be the id of the element the user is dragging e.g imac
        event.dataTransfer.effectAllowed = "move";
        $('h2').fadeIn('fast');//fade in this as prompt to the customer 
    }) 
    .hover( //display product info
        function () { $('div', this).fadeIn(); },  
        function () { $('div', this).fadeOut(); } 
    );
    //adding handlers to the cart
    $('#cart') 
    .bind('dragover', function (event) { 
        event.preventDefault(); 
    }) 
    .bind('dragenter', function (event) { 
        event.preventDefault(); 
    }) 
    .bind('drop', function (event) { 
    	//get the product we have dropped
    	var id = event.dataTransfer.getData('text/plain'),//get text data we transfered with the event e.g imac
    	item = $('#' + id),//e.g imac - use id to find elememnt that was dropped 
		cartList = $("#cart ul"),//empty at first 
		total = $("#total span"), //0.0
    	price = $('p:eq(1) span', item).text(), //select the span within the second paragraph of the item
    	prevCartItem = null,//will use it later to see if the item dragged into the cart is already there
    	//loop over each list item in the cartList to check to see if the data property id is the same as the variable id
    	notInCart = (function () { 
	        var lis = $('li', cartList), 
	            len = lis.length; 
	 
	        for (var i = 0; i < len; i++ ) { 
	            var temp = $(lis[i]); 
	            if (temp.data("id") === id) { 
	                prevCartItem = temp; 
	                return false; 
	            } 
	        } 
	        return true; 
	    } ()), 
	    quantLeftEl, quantBoughtEl, quantLeft;

	    $("h2").fadeOut('fast');
	    //if item isn't in the cart, add it to the cart
	    if (notInCart) { 
		    prevCartItem = $('<li />', { //create a list item, pass object literal
		        text : $('p:first', item).text(), //set text to product name from first paragraph of product item e.g T Shirt
		        data : { id : id } //set store product id with the item
		        //
		    }).prepend($('<span />', { 
		        'class' : 'quantity', 
		        text : '0' 
		    })).prepend($('<span />', { 
		        'class' : 'price', 
		        text : price 
		    })).appendTo(cartList); 
		}

		quantLeftEl = $('p:last span', item); //get quantity from product item
		quantLeft   = parseInt(quantLeftEl.text(), 10) - 1; //what's really left - decrement the quantity
		quantLeftEl.text(quantLeft); 

		quantBoughtEl = $('.quantity', prevCartItem); //increment quantity
		quantBoughtEl.text(parseInt(quantBoughtEl.text(), 10) + 1);
		//remove from product list if we run out of stock
		if (quantLeft === 0) {
		    item.fadeOut('fast').remove(); 
		} 

		total.text((parseFloat(total.text(), 10) + parseFloat(price.split('$')[1])).toFixed(2)); 
 		//prevent event to bubble
		event.stopPropagation(); 
		return false;
    });
});

