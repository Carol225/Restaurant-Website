window.onload = function(){
    function cart(){
        this.abtn = document.querySelectorAll('input');
        this.ogood_num = document.querySelector('.goods_num');
        this.opricetal = document.querySelector('.pricetal');
        this.opricest = document.querySelector('.pricest');
        this.totalnum = 0;
    };
	
    //Calculate the subtotal of each item.
    cart.prototype.getsubtotal = function(goodsnum,unitprice){
        return parseInt(goodsnum) * parseFloat(unitprice) ;
    };
    
	//Calculate the total price.
    cart.prototype.gettotal = function(){
        var asubtotal = document.querySelectorAll('.subtal');
        var res = 0;
        for(var i=0,len=asubtotal.length;i<len;i++){
            res += parseFloat(asubtotal[i].innerHTML);
        };   
        return res;
    };
    
    //The functionality of '+': increasing amount, subtotal and total price.
    cart.prototype.plus = function(obtn){
        var onum = obtn.parentNode.querySelector('.num');
        var n = parseInt(onum.innerHTML);
        onum.innerHTML = ++n ;
        this.totalnum++;
        var oUnit = obtn.parentNode.parentNode.parentNode.querySelector('.unit');
        var osubtotal = obtn.parentNode.parentNode.parentNode.querySelector('.subtal');
        osubtotal.innerHTML = this.getsubtotal(onum.innerHTML,oUnit.innerHTML);
        this.ogood_num.innerHTML = this.totalnum;
        this.opricetal.innerHTML = this.gettotal();
        this.opricest.innerHTML = this.compareMaxunit();
    };
    
	//The functionality of '-': decreasing amount, subtotal and total price.
    cart.prototype.minus = function(obtn){
        var onum = obtn.parentNode.querySelector('.num');
        if(parseInt(onum.innerHTML)>0){
            var n = parseInt(onum.innerHTML);
            onum.innerHTML = --n ;
            this.totalnum--;
            var oUnit = obtn.parentNode.parentNode.parentNode.querySelector('.unit');
            var osubtotal = obtn.parentNode.parentNode.parentNode.querySelector('.subtal');
            osubtotal.innerHTML = this.getsubtotal(onum.innerHTML,oUnit.innerHTML);
            this.ogood_num.innerHTML = this.totalnum;
            this.opricetal.innerHTML = this.gettotal();
            this.opricest.innerHTML = this.compareMaxunit();
        }  
    };
    
	//Calculate the total amount of items.
    cart.prototype.getNumbertal = function(){
        var anum = document.querySelectorAll('.num');
        var res_num = 0;
        for(var i =0;i<anum.length;i++){
            res_num += parseInt( anum[i].innerHTML ) ;
        }
        return res_num ;
    }
	
    //The functionality of Delete button.
    cart.prototype.del = function(obtn){
        var odel = obtn.parentNode.parentNode;
        var oparent = odel.parentNode;
        oparent.removeChild(odel);
        this.ogood_num.innerHTML = this.getNumbertal();
        this.opricetal.innerHTML = this.gettotal();
        this.opricest.innerHTML = this.compareMaxunit();
        this.xuhaosort();
    }
    
    //Click event of '+' and '-'.
    cart.prototype.bind = function(){
        var that = this ;
        for(var i=0;i<this.abtn.length;i++){
            if(i%2 !=0){
                this.abtn[i].onclick = function(){
                    that.plus(this);
                }
            }
			else{
                this.abtn[i].onclick = function(){
                    that.minus(this);
                }
            }
        };
        var delbtn = document.querySelectorAll('.del');
        for(var i=0;i<delbtn.length;i++){
            delbtn[i].onclick = function(){
                that.del(this);
            }
        }
    };
    var oCart = new cart();
    oCart.bind();
}